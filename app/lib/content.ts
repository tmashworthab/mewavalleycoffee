import data from "../../content/en.json";

/**
 * Every piece of copy on the site lives in content/en.json.
 *
 * That file is the single source of truth: the visual editor writes to it, and
 * publishing commits it back to the repo, so each change to the site's wording
 * is an ordinary git commit that can be reviewed or rolled back.
 */
export const content = data;

export type Content = typeof data;

/** Dot-path lookup used by the editor, e.g. get("journey.body1"). */
export function get(path: string, source: unknown = data): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      source
    );
  return typeof value === "string" ? value : "";
}

/** Immutably set a dot-path, returning a new object. Used when publishing. */
export function set<T>(source: T, path: string, value: string): T {
  const keys = path.split(".");
  const clone = structuredClone(source) as Record<string, unknown>;
  let node: Record<string, unknown> = clone;

  for (const key of keys.slice(0, -1)) {
    const next = node[key];
    if (typeof next !== "object" || next === null) return source;
    node = next as Record<string, unknown>;
  }

  const leaf = keys[keys.length - 1];
  if (typeof node[leaf] !== "string") return source;
  node[leaf] = value;
  return clone as T;
}

/** Flat list of every editable path, for validating incoming edits. */
export function paths(source: unknown = data, prefix = ""): string[] {
  if (typeof source !== "object" || source === null) return [];
  return Object.entries(source as Record<string, unknown>).flatMap(
    ([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "string") return [path];
      if (typeof value === "object" && value !== null) return paths(value, path);
      return [];
    }
  );
}
