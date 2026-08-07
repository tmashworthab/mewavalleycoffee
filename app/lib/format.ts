import raw from "../../content/format.json";

/**
 * Presentation overrides, keyed by the same dot-paths as the copy itself.
 *
 * Deliberately a small, closed set of choices rather than free values: the
 * site reads the way it does because everything sits on one type scale, and
 * an arbitrary font-size box is the quickest way to lose that. Every option
 * here still produces something that looks like the same site.
 *
 * Formatting is shared across languages — alignment and size are design
 * decisions, not translation decisions, so the three versions cannot drift
 * apart visually.
 */

export const ALIGNMENTS = ["left", "center", "right"] as const;
export type Alignment = (typeof ALIGNMENTS)[number];

export const SIZES = ["sm", "md", "lg"] as const;
export type Size = (typeof SIZES)[number];

/** What kind of text a field is, which decides how a size maps to the scale. */
export type Role = "display" | "title" | "body" | "label";

export interface FieldFormat {
  align?: Alignment;
  size?: Size;
}

export type FormatMap = Record<string, FieldFormat>;

export const format: FormatMap = raw as FormatMap;

export function isAlignment(v: unknown): v is Alignment {
  return typeof v === "string" && (ALIGNMENTS as readonly string[]).includes(v);
}

export function isSize(v: unknown): v is Size {
  return typeof v === "string" && (SIZES as readonly string[]).includes(v);
}

const ALIGN_CLASS: Record<Alignment, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

/** Sizes stay on the existing scale; "md" is whatever the design already used. */
const SIZE_CLASS: Record<Role, Record<Size, string>> = {
  display: { sm: "type-title", md: "type-display", lg: "type-display" },
  title: { sm: "type-subtitle", md: "type-title", lg: "type-display" },
  body: { sm: "type-body", md: "type-body", lg: "type-lead" },
  label: { sm: "type-eyebrow", md: "type-eyebrow", lg: "type-caption" },
};

/**
 * Classes for a field, given its role and the default size the design uses.
 * Returns "" when nothing has been overridden, so unstyled fields keep exactly
 * the markup they had before formatting existed.
 */
export function formatClasses(
  path: string,
  role: Role,
  defaultSize: Size = "md"
): string {
  const f = format[path];
  const classes: string[] = [];

  if (f?.align) classes.push(ALIGN_CLASS[f.align]);

  const size = f?.size ?? defaultSize;
  if (size !== defaultSize) classes.push(SIZE_CLASS[role][size]);

  return classes.join(" ");
}

/** The size class a field should carry when nothing is overridden. */
export function baseSizeClass(role: Role, defaultSize: Size = "md"): string {
  return SIZE_CLASS[role][defaultSize];
}
