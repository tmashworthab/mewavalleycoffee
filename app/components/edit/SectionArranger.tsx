"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SECTION_LABELS, moveSection, type SectionId } from "../../lib/sections";

/**
 * Move sections about on the page itself.
 *
 * The reorder list in the editor bar was the only place dragging worked, which
 * meant the obvious gesture — grabbing a section where you can see it — did
 * nothing but put a caret in the text. This puts a handle on each section in
 * place, so the thing you drag is the thing that moves.
 *
 * Handles are positioned by writing to the node rather than through state:
 * they have to follow the page on every scroll frame, and re-rendering that
 * often would be visibly rough.
 */
export default function SectionArranger({
  order,
  onChange,
  onDone,
}: {
  order: SectionId[];
  onChange: (next: SectionId[]) => void;
  onDone: () => void;
}) {
  const handles = useRef<Map<SectionId, HTMLDivElement>>(new Map());
  const [dragging, setDragging] = useState<SectionId | null>(null);
  const [over, setOver] = useState<SectionId | null>(null);

  // Refs as well as state: a drag can start and finish inside one burst of
  // events, before React has re-rendered and refreshed the closures below.
  const dragRef = useRef<SectionId | null>(null);
  const overRef = useRef<SectionId | null>(null);
  const pending = useRef<{ id: SectionId; y: number } | null>(null);
  const pointerY = useRef(0);

  /* ---------- Keep each handle pinned to its section ---------- */

  const place = useCallback(() => {
    for (const [id, node] of handles.current) {
        const section = document.querySelector<HTMLElement>(
          `[data-section="${id}"]`
        );
        if (!section) continue;
        const r = section.getBoundingClientRect();
        // Only sections actually on screen get a handle. Clamping the rest to
        // the viewport edge would stack them all in one unreadable pile.
        const onScreen = r.height > 0 && r.bottom > 120 && r.top < window.innerHeight - 96;
        node.style.visibility = onScreen ? "visible" : "hidden";
        if (!onScreen) continue;

        // Clamped so the handle of a section taller than the window stays
        // reachable while you are scrolled through the middle of it.
        const top = Math.min(Math.max(r.top + 12, 72), window.innerHeight - 150);
        node.style.top = `${top}px`;
      node.style.left = `${Math.max(r.left + 12, 12)}px`;
    }
  }, []);

  // Driven by events rather than a standing animation loop: the loop burns a
  // frame forever, and browsers stop running it altogether in a background
  // tab, which leaves every handle stranded at the top-left corner.
  useEffect(() => {
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);

    // Sections change height as images load and text is reflowed.
    const ro = new ResizeObserver(place);
    document
      .querySelectorAll<HTMLElement>("[data-section]")
      .forEach((el) => ro.observe(el));

    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
      ro.disconnect();
    };
  }, [order, place]);

  /* ---------- Pan the page when a drag nears an edge ---------- */

  // A section is usually taller than the window, so a drag that could not
  // scroll would never reach anywhere to drop.
  useEffect(() => {
    if (!dragging) return;
    const EDGE = 130;

    const tick = () => {
      const y = pointerY.current;
      const h = window.innerHeight;
      let dy = 0;
      if (y < EDGE) dy = -(EDGE - y) / 6;
      else if (y > h - EDGE) dy = (y - (h - EDGE)) / 6;
      if (dy) {
        // "instant" matters: the page sets scroll-behavior: smooth, which would
        // animate every 16ms nudge and leave the pan crawling behind the hand.
        window.scrollBy({ top: dy, behavior: "instant" });
        place();
      }
    };

    const id = window.setInterval(tick, 16);
    return () => window.clearInterval(id);
  }, [dragging, place]);

  /* ---------- Show what is being moved, and where it will land ---------- */

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
      const id = el.dataset.section;
      if (dragging && id === dragging) el.dataset.dragging = "true";
      else delete el.dataset.dragging;

      if (dragging && id === over && id !== dragging) {
        el.dataset.dropTarget = "true";
      } else {
        delete el.dataset.dropTarget;
      }
    });
  }, [dragging, over]);

  /* ---------- Outline every section while arranging ---------- */

  useEffect(() => {
    document.documentElement.dataset.arranging = "true";
    return () => {
      delete document.documentElement.dataset.arranging;
    };
  }, []);

  /* ---------- Dragging ---------- */

  const DRAG_THRESHOLD = 4;

  // Listeners stay attached for the whole arranging session. Gating them on a
  // ref could not work — a ref never triggers the re-render that would attach
  // them — and the handlers cost nothing while no drag is in progress.
  useEffect(() => {
    const sectionAt = (y: number): SectionId | null => {
      let found: SectionId | null = null;
      document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (y >= r.top && y <= r.bottom) found = el.dataset.section as SectionId;
      });
      return found;
    };

    const onMove = (e: PointerEvent) => {
      pointerY.current = e.clientY;
      const held = pending.current;
      if (held) {
        if (Math.abs(e.clientY - held.y) < DRAG_THRESHOLD) return;
        pending.current = null;
        dragRef.current = held.id;
        setDragging(held.id);
      }
      if (!dragRef.current) return;

      e.preventDefault();
      const target = sectionAt(e.clientY);
      overRef.current = target;
      setOver(target);
    };

    const onUp = () => {
      const from = dragRef.current;
      const to = overRef.current;
      pending.current = null;
      dragRef.current = null;
      overRef.current = null;
      setDragging(null);
      setOver(null);

      if (!from || !to || from === to) return;
      onChange(moveSection(order, from, to));
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  });

  function step(id: SectionId, delta: number) {
    const neighbour = order[order.indexOf(id) + delta];
    if (!neighbour) return;
    onChange(moveSection(order, id, neighbour));
  }

  return (
    <>
      {/* A quiet banner, so it is obvious the page is in a different mode. */}
      <div className="fixed top-0 inset-x-0 z-[205] pointer-events-none flex justify-center">
        <div className="pointer-events-auto mt-3 flex items-center gap-3 rounded-full border border-[#c9a468]/40 bg-[#141210]/97 backdrop-blur-xl px-4 py-2 shadow-2xl">
          <span className="text-[12px] text-[#f2ede6]/70">
            Drag a section by its <span className="text-[#c9a468]">handle</span>{" "}
            to move it
          </span>
          <button
            onClick={onDone}
            className="rounded-full bg-[#c9a468] px-3 py-1 text-[12px] font-medium text-[#141210] hover:bg-[#dcbb84] transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      {order.map((id) => {
        const held = dragging === id;
        const isTarget = dragging !== null && over === id && !held;
        return (
          <div
            key={id}
            ref={(el) => {
              if (el) handles.current.set(id, el);
              else handles.current.delete(id);
            }}
            style={{ position: "fixed" }}
            className={`z-[206] flex items-center gap-1 rounded-lg border shadow-2xl backdrop-blur-xl touch-none select-none transition-colors ${
              held
                ? "border-[#c9a468] bg-[#c9a468] cursor-grabbing"
                : isTarget
                  ? "border-[#c9a468] bg-[#141210]/97 cursor-grab"
                  : "border-[#c9a468]/40 bg-[#141210]/97 cursor-grab"
            }`}
          >
            <div
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button")) return;
                e.preventDefault();
                pending.current = { id, y: e.clientY };
              }}
              className="flex items-center gap-2 pl-2 pr-1 py-2"
            >
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                aria-hidden="true"
                className={held ? "text-[#141210]" : "text-[#c9a468]"}
              >
                <path
                  d="M2 3h8M2 7h8M2 11h8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className={`text-[12px] tracking-wide ${
                  held ? "text-[#141210]" : "text-[#f2ede6]/85"
                }`}
              >
                {SECTION_LABELS[id]}
              </span>
            </div>

            <button
              onClick={() => step(id, -1)}
              disabled={order.indexOf(id) === 0}
              aria-label={`Move ${SECTION_LABELS[id]} up`}
              className={`min-w-9 min-h-11 flex items-center justify-center disabled:opacity-20 ${
                held ? "text-[#141210]" : "text-[#f2ede6]/50 hover:text-[#f2ede6]"
              }`}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                <path d="M2 7l3.5-3.5L9 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => step(id, 1)}
              disabled={order.indexOf(id) === order.length - 1}
              aria-label={`Move ${SECTION_LABELS[id]} down`}
              className={`min-w-9 min-h-11 mr-1 flex items-center justify-center disabled:opacity-20 ${
                held ? "text-[#141210]" : "text-[#f2ede6]/50 hover:text-[#f2ede6]"
              }`}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                <path d="M2 4l3.5 3.5L9 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        );
      })}
    </>
  );
}
