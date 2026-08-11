import raw from "../../content/layout.json";

/**
 * Which sections a page shows, and in what order.
 *
 * Order is data rather than code so it can be rearranged from the editor and
 * published like any other change. The set of available sections is fixed —
 * each one is a designed piece of the page, not a freeform block — so an edit
 * can reorder or omit them but never invent one.
 */

export const SECTION_IDS = [
  "hero",
  "premise",
  "coffee",
  "origins",
  "invitation",
  "filmstrip",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Hero",
  premise: "Why Nepal",
  coffee: "What we offer",
  origins: "Map",
  invitation: "Roasters",
  filmstrip: "Photographs",
};

export type LayoutMap = { home: SectionId[] };

export function isSectionId(v: unknown): v is SectionId {
  return typeof v === "string" && (SECTION_IDS as readonly string[]).includes(v);
}

/** The stored order, filtered to what actually exists and de-duplicated. */
export function homeSections(): SectionId[] {
  const stored = (raw as { home?: unknown }).home;
  if (!Array.isArray(stored)) return [...SECTION_IDS];

  const seen = new Set<SectionId>();
  const order: SectionId[] = [];
  for (const id of stored) {
    if (isSectionId(id) && !seen.has(id)) {
      seen.add(id);
      order.push(id);
    }
  }
  return order;
}

/**
 * Move one section to where another currently sits.
 *
 * Pure, and shared by every control that reorders — dragging, and the up and
 * down arrows — so they cannot drift apart in how they interpret a move.
 */
export function moveSection(
  order: SectionId[],
  from: SectionId,
  to: SectionId
): SectionId[] {
  const fromIndex = order.indexOf(from);
  const toIndex = order.indexOf(to);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return order;

  const next = [...order];
  next.splice(fromIndex, 1);
  next.splice(toIndex, 0, from);
  return next;
}

/** Validate an incoming order before it is published. */
export function normaliseOrder(value: unknown): SectionId[] | null {
  if (!Array.isArray(value)) return null;
  const seen = new Set<SectionId>();
  const order: SectionId[] = [];
  for (const id of value) {
    if (!isSectionId(id) || seen.has(id)) return null;
    seen.add(id);
    order.push(id);
  }
  return order;
}
