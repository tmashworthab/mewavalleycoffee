import raw from "../../content/format.json";

/**
 * Presentation overrides, keyed by the same dot-paths as the copy itself.
 *
 * Size is a numbered step on a fixed ramp rather than a free pixel value. That
 * gives fine control — twelve steps from caption to full display — while still
 * guaranteeing that whatever is chosen sits on a proportioned scale, which a
 * free font-size box cannot.
 *
 * Formatting is shared across languages: alignment, size and typeface are
 * design decisions, not translation decisions, so the three versions cannot
 * drift apart visually.
 */

export const ALIGNMENTS = ["left", "center", "right"] as const;
export type Alignment = (typeof ALIGNMENTS)[number];

/** Twelve steps, smallest to largest. */
export const SIZE_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type SizeStep = (typeof SIZE_STEPS)[number];

export const MIN_STEP = 1;
export const MAX_STEP = 12;

/**
 * Desktop size for each step, in rem. Steps 7 and up also scale down on narrow
 * screens (see the .fs-N rules in globals.css) so large type stays usable.
 */
export const STEP_REM: Record<SizeStep, number> = {
  1: 0.6875,
  2: 0.75,
  3: 0.875,
  4: 1,
  5: 1.125,
  6: 1.375,
  7: 1.75,
  8: 2.25,
  9: 2.75,
  10: 3.5,
  11: 4.5,
  12: 6,
};

/** Typefaces an editor can choose. Each is loaded in the root layout. */
export const FONTS = [
  "serif",
  "sans",
  "display",
  "classic",
  "modern",
  "nature",
] as const;
export type FontChoice = (typeof FONTS)[number];

export const FONT_LABELS: Record<FontChoice, string> = {
  serif: "Newsreader",
  sans: "Geist",
  display: "Instrument Serif",
  classic: "Cormorant",
  modern: "Space Grotesk",
  nature: "ZT Nature",
};

/**
 * Text colours. Every option is legible on the site's dark ground — an open
 * colour picker would let a field be set to something invisible against it.
 */
export const COLOURS = ["cream", "muted", "gold", "goldLight", "white"] as const;
export type Colour = (typeof COLOURS)[number];

export const COLOUR_LABELS: Record<Colour, string> = {
  cream: "Cream",
  muted: "Muted",
  gold: "Gold",
  goldLight: "Light gold",
  white: "White",
};

export const COLOUR_SWATCH: Record<Colour, string> = {
  cream: "#f2ede6",
  muted: "#cfc7bd",
  gold: "#c9a468",
  goldLight: "#e2cda2",
  white: "#ffffff",
};

export type Role = "display" | "title" | "body" | "label";

export interface FieldFormat {
  align?: Alignment;
  size?: SizeStep;
  font?: FontChoice;
  colour?: Colour;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type FormatMap = Record<string, FieldFormat>;

export const format: FormatMap = raw as FormatMap;

export function isAlignment(v: unknown): v is Alignment {
  return typeof v === "string" && (ALIGNMENTS as readonly string[]).includes(v);
}

export function isSizeStep(v: unknown): v is SizeStep {
  return (
    typeof v === "number" &&
    Number.isInteger(v) &&
    v >= MIN_STEP &&
    v <= MAX_STEP
  );
}

export function isFont(v: unknown): v is FontChoice {
  return typeof v === "string" && (FONTS as readonly string[]).includes(v);
}

export function isColour(v: unknown): v is Colour {
  return typeof v === "string" && (COLOURS as readonly string[]).includes(v);
}

const ALIGN_CLASS: Record<Alignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Classes for a field. Returns "" when nothing is overridden, so untouched
 * fields keep exactly the markup they had before formatting existed.
 */
export function formatClasses(path: string): string {
  const f = format[path];
  if (!f) return "";

  const classes: string[] = [];
  if (f.align) classes.push(ALIGN_CLASS[f.align]);
  if (isSizeStep(f.size)) classes.push(`fs-${f.size}`);
  if (f.font) classes.push(`ff-${f.font}`);
  if (f.colour) classes.push(`tc-${f.colour}`);
  if (f.bold) classes.push("tx-bold");
  if (f.italic) classes.push("tx-italic");
  if (f.underline) classes.push("tx-underline");
  return classes.join(" ");
}

/** Nearest step to a pixel size, used to seed the control from the design. */
export function nearestStep(px: number, rootPx = 16): SizeStep {
  const rem = px / rootPx;
  let best: SizeStep = 4;
  let delta = Infinity;
  for (const step of SIZE_STEPS) {
    const d = Math.abs(STEP_REM[step] - rem);
    if (d < delta) {
      delta = d;
      best = step;
    }
  }
  return best;
}
