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

  function move(from: number, to: number) {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  // While a row is held, work out which row the pointer is over.
  useEffect(() => {
    if (dragging === null) return;

    const onMove = (e: PointerEvent) => {
      const y = e.clientY;
      let target = dragging;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        if (y >= r.top && y <= r.bottom) target = i;
      });
      setOverIndex(target);
    };

    const onUp = () => {
      if (overIndex !== null && overIndex !== dragging) move(dragging, overIndex);
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
              className={`flex items-center gap-1 rounded-md pl-0 pr-1 transition-colors ${
                held
                  ? "bg-[#c9a468]/25"
                  : isTarget
                    ? "bg-[#f2ede6]/10"
                    : "bg-[#f2ede6]/[0.04]"
              }`}
            >
              <button
                onPointerDown={(e) => {
                  e.preventDefault();
                  setDragging(i);
                  setOverIndex(i);
                }}
                aria-label={`Reorder ${SECTION_LABELS[id]}`}
                className="cursor-grab touch-none min-w-11 min-h-11 flex items-center justify-center text-[#f2ede6]/40 hover:text-[#f2ede6]"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                  <path
                    d="M2 3h8M2 7h8M2 11h8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <span className="flex-1 text-[13px] text-[#f2ede6]/80 truncate">
                {SECTION_LABELS[id]}
              </span>

              <button
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
