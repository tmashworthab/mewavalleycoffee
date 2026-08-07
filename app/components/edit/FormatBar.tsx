"use client";

import { useEffect, useRef, useState } from "react";
import {
  ALIGNMENTS,
  FONTS,
  FONT_LABELS,
  MIN_STEP,
  MAX_STEP,
  nearestStep,
  COLOURS,
  COLOUR_LABELS,
  COLOUR_SWATCH,
  type Alignment,
  type Colour,
  type FontChoice,
  type SizeStep,
} from "../../lib/format";

export interface FieldFormatState {
  align?: Alignment;
  size?: SizeStep;
  font?: FontChoice;
  colour?: Colour;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const ALIGN_ICON: Record<Alignment, string> = {
  left: "M2 3h12M2 7h8M2 11h12M2 15h8",
  center: "M2 3h12M4 7h8M2 11h12M4 15h8",
  right: "M2 3h12M6 7h8M2 11h12M6 15h8",
};

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
  onSizeStep,
  onFont,
  onColour,
  onToggle,
  onList,
}: {
  target: HTMLElement | null;
  state: FieldFormatState;
  onAlign: (a: Alignment) => void;
  onSizeStep: (delta: number, fallback: SizeStep) => void;
  onFont: (f: FontChoice | null) => void;
  onColour: (c: Colour | null) => void;
  onToggle: (k: "bold" | "italic" | "underline") => void;
  onList: (kind: "bullet" | "number") => void;
}) {
  const bar = useRef<HTMLDivElement>(null);
  // Tracked by field key rather than a boolean, so the menu closes by
  // derivation when focus moves instead of needing an effect to reset it.
  const [openForKey, setOpenForKey] = useState<string | null>(null);
  const [colourOpenFor, setColourOpenFor] = useState<string | null>(null);

  useEffect(() => {
    const el = bar.current;
    if (!target || !el) return;

    const place = () => {
      const r = target.getBoundingClientRect();
      const h = el.offsetHeight || 44;
      // Flip below the field when there is no room above it.
      const below = r.top < h + 70;
      el.style.top = `${below ? r.bottom + 10 : r.top - h - 10}px`;
      el.style.left = `${Math.min(
        Math.max(r.left, 12),
        Math.max(12, window.innerWidth - el.offsetWidth - 12)
      )}px`;
    };

    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [target, openForKey, colourOpenFor]);

  if (!target) return null;

  const fontOpen = openForKey !== null && openForKey === target.dataset.ck;
  const colourOpen =
    colourOpenFor !== null && colourOpenFor === target.dataset.ck;

  const isBody = target.dataset.ckMultiline === "true";

  // With no explicit override, show the step the design is already using, so
  // the number always means something and stepping up or down is predictable.
  const shownStep: SizeStep =
    state.size ?? nearestStep(parseFloat(getComputedStyle(target).fontSize));

  // The parent applies the delta against its own current state, so clicking
  // faster than React re-renders cannot read a stale step.
  const step = (delta: number) => onSizeStep(delta, shownStep);

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
            <path d={ALIGN_ICON[a]} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      ))}

      <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />

      {/* Size — a numbered step, not a free pixel value */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => step(-1)}
          aria-label="Smaller"
          disabled={shownStep <= MIN_STEP}
          className={`${btn} ${off} disabled:opacity-25`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <span
          className={`min-w-[2.25rem] text-center text-[12px] tabular-nums px-1 py-1 rounded ${
            state.size ? "text-[#c9a468] font-medium" : "text-[#f2ede6]/45"
          }`}
          title={state.size ? `Size ${state.size}` : `Default (size ${shownStep})`}
          aria-live="polite"
        >
          {shownStep}
        </span>
        <button
          onClick={() => step(1)}
          aria-label="Larger"
          disabled={shownStep >= MAX_STEP}
          className={`${btn} ${off} disabled:opacity-25`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />

      {/* Typeface */}
      <div className="relative">
        <button
          onClick={() => setOpenForKey(fontOpen ? null : (target.dataset.ck ?? null))}
          aria-label="Typeface"
          aria-expanded={fontOpen}
          className={`${btn} ${state.font ? on : off} flex items-center gap-1.5`}
        >
          <span className="text-[13px] leading-none">Aa</span>
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {fontOpen && (
          <div className="absolute left-0 top-full mt-2 w-44 rounded-lg border border-[#c9a468]/30 bg-[#141210] shadow-2xl py-1.5 z-10">
            <button
              onClick={() => {
                onFont(null);
                setOpenForKey(null);
              }}
              className={`w-full text-left px-3 py-2 text-[12px] ${
                state.font ? "text-[#f2ede6]/45 hover:bg-[#f2ede6]/8" : "text-[#c9a468]"
              }`}
            >
              Default
            </button>
            {FONTS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  onFont(f);
                  setOpenForKey(null);
                }}
                className={`ff-${f} w-full text-left px-3 py-2 text-[14px] ${
                  state.font === f
                    ? "text-[#c9a468]"
                    : "text-[#f2ede6]/70 hover:bg-[#f2ede6]/8"
                }`}
              >
                {FONT_LABELS[f]}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />

      {/* Emphasis */}
      <button
        onClick={() => onToggle("bold")}
        aria-label="Bold"
        aria-pressed={!!state.bold}
        className={`${btn} font-semibold ${state.bold ? on : off}`}
      >
        B
      </button>
      <button
        onClick={() => onToggle("italic")}
        aria-label="Italic"
        aria-pressed={!!state.italic}
        className={`${btn} italic font-serif ${state.italic ? on : off}`}
      >
        I
      </button>
      <button
        onClick={() => onToggle("underline")}
        aria-label="Underline"
        aria-pressed={!!state.underline}
        className={`${btn} underline underline-offset-2 ${state.underline ? on : off}`}
      >
        U
      </button>

      <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />

      {/* Colour */}
      <div className="relative">
        <button
          onClick={() =>
            setColourOpenFor(colourOpen ? null : (target.dataset.ck ?? null))
          }
          aria-label="Colour"
          aria-expanded={colourOpen}
          className={`${btn} ${off} flex items-center gap-1.5`}
        >
          <span
            className="block w-3.5 h-3.5 rounded-full border border-[#f2ede6]/25"
            style={{
              background: state.colour
                ? COLOUR_SWATCH[state.colour]
                : "linear-gradient(135deg,#f2ede6 50%,#c9a468 50%)",
            }}
          />
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {colourOpen && (
          <div className="absolute left-0 top-full mt-2 w-40 rounded-lg border border-[#c9a468]/30 bg-[#141210] shadow-2xl py-1.5 z-10">
            <button
              onClick={() => {
                onColour(null);
                setColourOpenFor(null);
              }}
              className={`w-full text-left px-3 py-2 text-[12px] ${
                state.colour ? "text-[#f2ede6]/45 hover:bg-[#f2ede6]/8" : "text-[#c9a468]"
              }`}
            >
              Default
            </button>
            {COLOURS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  onColour(c);
                  setColourOpenFor(null);
                }}
                className={`w-full text-left px-3 py-2 text-[12px] flex items-center gap-2.5 ${
                  state.colour === c ? "text-[#c9a468]" : "text-[#f2ede6]/70 hover:bg-[#f2ede6]/8"
                }`}
              >
                <span
                  className="block w-3.5 h-3.5 rounded-full border border-[#f2ede6]/20 shrink-0"
                  style={{ background: COLOUR_SWATCH[c] }}
                />
                {COLOUR_LABELS[c]}
              </button>
            ))}
          </div>
        )}
      </div>

      {isBody && (
        <>
          <span className="w-px h-5 bg-[#c9a468]/20 mx-1" />
          <button onClick={() => onList("bullet")} aria-label="Bullet list" className={`${btn} ${off}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="3" cy="4" r="1.3" fill="currentColor" />
              <circle cx="3" cy="8" r="1.3" fill="currentColor" />
              <circle cx="3" cy="12" r="1.3" fill="currentColor" />
              <path d="M7 4h7M7 8h7M7 12h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <button onClick={() => onList("number")} aria-label="Numbered list" className={`${btn} ${off}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <text x="0" y="6" fontSize="5.5" fill="currentColor">1</text>
              <text x="0" y="11" fontSize="5.5" fill="currentColor">2</text>
              <text x="0" y="15.5" fontSize="5.5" fill="currentColor">3</text>
              <path d="M7 4h7M7 9h7M7 14h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
