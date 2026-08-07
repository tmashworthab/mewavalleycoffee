"use client";

import { useEffect, useRef } from "react";
import { ALIGNMENTS, SIZES, type Alignment, type Size } from "../../lib/format";

export interface FieldFormatState {
  align?: Alignment;
  size?: Size;
}

const ALIGN_ICON: Record<Alignment, string> = {
  left: "M2 3h12M2 7h8M2 11h12M2 15h8",
  center: "M2 3h12M4 7h8M2 11h12M4 15h8",
  right: "M2 3h12M6 7h8M2 11h12M6 15h8",
};

const SIZE_LABEL: Record<Size, string> = { sm: "S", md: "M", lg: "L" };

/**
 * Formatting controls for whichever field currently has focus.
 *
 * Anchored above the field rather than parked in the bottom bar, so the
 * controls sit beside the text they affect. Position is written straight to
 * the node on scroll and resize — going through state would re-render the
 * toolbar on every scroll frame.
 */
export default function FormatBar({
  target,
  state,
  onAlign,
  onSize,
  onList,
}: {
  target: HTMLElement | null;
  state: FieldFormatState;
  onAlign: (a: Alignment) => void;
  onSize: (s: Size) => void;
  onList: (kind: "bullet" | "number") => void;
}) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!target || !el) return;

    const place = () => {
      const r = target.getBoundingClientRect();
      const h = el.offsetHeight || 44;
      // Flip below the field when there is no room above it.
      const below = r.top < h + 70;
      el.style.top = `${below ? r.bottom + 10 : r.top - h - 10}px`;
      el.style.left = `${Math.min(Math.max(r.left, 12), Math.max(12, window.innerWidth - el.offsetWidth - 12))}px`;
    };

    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [target]);

  if (!target) return null;

  const isBody = target.dataset.ckMultiline === "true";

  const btn =
    "px-2 py-1.5 rounded text-[11px] leading-none transition-colors duration-200";
  const off = "text-[#f2ede6]/45 hover:text-[#f2ede6] hover:bg-[#f2ede6]/10";
  const on = "text-[#141210] bg-[#c9a468]";

  return (
    <div
      ref={bar}
      // Keeps focus in the text while a control is clicked.
      onMouseDown={(e) => e.preventDefault()}
      className="fixed z-[210] flex items-center gap-1 rounded-lg border border-[#c9a468]/30 bg-[#141210]/97 backdrop-blur-xl px-2 py-1.5 shadow-2xl"
      role="toolbar"
      aria-label="Text formatting"
    >
      {ALIGNMENTS.map((a) => (
        <button
          key={a}
          onClick={() => onAlign(a)}
          aria-label={`Align ${a}`}
          aria-pressed={state.align === a}
          className={`${btn} ${state.align === a ? on : off}`}
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <path
              d={ALIGN_ICON[a]}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ))}

      <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />

      {SIZES.map((s) => (
        <button
          key={s}
          onClick={() => onSize(s)}
          aria-label={`Size ${SIZE_LABEL[s]}`}
          aria-pressed={state.size === s}
          className={`${btn} font-medium ${state.size === s ? on : off}`}
        >
          {SIZE_LABEL[s]}
        </button>
      ))}

      {isBody && (
        <>
          <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />
          <button
            onClick={() => onList("bullet")}
            aria-label="Bullet list"
            className={`${btn} ${off}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="3" cy="4" r="1.3" fill="currentColor" />
              <circle cx="3" cy="8" r="1.3" fill="currentColor" />
              <circle cx="3" cy="12" r="1.3" fill="currentColor" />
              <path
                d="M7 4h7M7 8h7M7 12h7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={() => onList("number")}
            aria-label="Numbered list"
            className={`${btn} ${off}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <text x="0" y="6" fontSize="5.5" fill="currentColor">
                1
              </text>
              <text x="0" y="11" fontSize="5.5" fill="currentColor">
                2
              </text>
              <text x="0" y="15.5" fontSize="5.5" fill="currentColor">
                3
              </text>
              <path
                d="M7 4h7M7 9h7M7 14h7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
