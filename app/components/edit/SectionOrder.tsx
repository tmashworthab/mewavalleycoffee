"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_LABELS, type SectionId } from "../../lib/sections";

/**
 * Reorder the page's sections.
 *
 * Dragging is driven by pointer events rather than HTML5 drag-and-drop, which
 * does not fire on touch — so this works the same with a mouse or a thumb.
 * Every row also carries up and down buttons, which are keyboard reachable and
 * are simply easier on a small screen.
 */
export default function SectionOrder({
  order,
  onChange,
  onClose,
}: {
  order: SectionId[];
  onChange: (next: SectionId[]) => void;
  onClose: () => void;
}) {
  const [dragging, setDragging] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  // A press only becomes a drag once the pointer has actually travelled, so
  // tapping a row does not swallow the press meant for its arrow buttons.
  // State rather than a ref, because arming the press is what causes the
  // window listeners below to be attached.
  const [pending, setPending] = useState<{ index: number; y: number } | null>(
    null
  );
  const dragRef = useRef<number | null>(null);
  const overRef = useRef<number | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  const DRAG_THRESHOLD = 4;

  // While a row is held, work out which row the pointer is over.
  useEffect(() => {
    if (dragging === null && pending === null) return;

    const onMove = (e: PointerEvent) => {
      let from = dragging;

      if (pending !== null) {
        if (Math.abs(e.clientY - pending.y) < DRAG_THRESHOLD) return;
        // Promote the press to a drag, and carry on to the hit test below in
        // the same event — a fast drag may only produce one pointermove, and
        // waiting for a second would drop it.
        from = pending.index;
        dragRef.current = from;
        setPending(null);
        setDragging(from);
      }
      if (from === null) return;

      const y = e.clientY;
      let target = from;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        if (y >= r.top && y <= r.bottom) target = i;
      });
      overRef.current = target;
      setOverIndex(target);
    };

    // Read through refs: a drag can begin and end inside a single burst of
    // events, before React has re-rendered and refreshed these closures.
    const onUp = () => {
      const from = dragRef.current;
      const to = overRef.current;
      setPending(null);
      dragRef.current = null;
      overRef.current = null;
      if (from !== null && to !== null && to !== from) move(from, to);
      setDragging(null);
      setOverIndex(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  });

  return (
    <div className="border-t border-[#c9a468]/15 px-3 sm:px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="type-eyebrow text-[#c9a468]">Sections</span>
        <button
          onClick={onClose}
          className="text-[12px] text-[#f2ede6]/50 hover:text-[#f2ede6] px-2 py-1"
        >
          Done
        </button>
      </div>

      <ul className="list-none m-0 p-0 space-y-1">
        {order.map((id, i) => {
          const held = dragging === i;
          const isTarget = dragging !== null && overIndex === i && !held;
          return (
            <li
              key={id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              // The whole row is the drag surface, not just the handle — a
              // 44px grip was too small a target to find, and grabbing the
              // label is what everyone tries first.
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button[data-arrow]")) {
                  return;
                }
                e.preventDefault();
                setPending({ index: i, y: e.clientY });
              }}
              className={`flex items-center gap-1 rounded-md pl-0 pr-1 touch-none select-none transition-colors ${
                held ? "cursor-grabbing" : "cursor-grab"
              } ${
                held
                  ? "bg-[#c9a468]/25"
                  : isTarget
                    ? "bg-[#f2ede6]/10"
                    : "bg-[#f2ede6]/[0.04]"
              }`}
            >
              <span
                aria-hidden="true"
                className="min-w-11 min-h-11 flex items-center justify-center text-[#f2ede6]/40"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                  <path
                    d="M2 3h8M2 7h8M2 11h8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <span className="flex-1 text-[13px] text-[#f2ede6]/80 truncate">
                {SECTION_LABELS[id]}
              </span>

              <button
                data-arrow
                onClick={() => move(i, i - 1)}
                disabled={i === 0}
                aria-label={`Move ${SECTION_LABELS[id]} up`}
                className="min-w-11 min-h-11 flex items-center justify-center text-[#f2ede6]/45 hover:text-[#f2ede6] disabled:opacity-20"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                  <path d="M2 7l3.5-3.5L9 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                data-arrow
                onClick={() => move(i, i + 1)}
                disabled={i === order.length - 1}
                aria-label={`Move ${SECTION_LABELS[id]} down`}
                className="min-w-11 min-h-11 flex items-center justify-center text-[#f2ede6]/45 hover:text-[#f2ede6] disabled:opacity-20"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                  <path d="M2 4l3.5 3.5L9 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
