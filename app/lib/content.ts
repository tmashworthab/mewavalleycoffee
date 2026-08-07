import en from "../../content/en.json";
import ne from "../../content/ne.json";
import lt from "../../content/lt.json";

/**
 * Every piece of copy on the site lives in content/<locale>.json.
 *
 * Those files are the single source of truth: the visual editor writes to them,
 * and publishing commits them back to the repo, so each change to the site's
 * wording is an ordinary git commit that can be reviewed or rolled back.
 *
 * English is the source language — its key set defines the shape all other
 * locales must match.
 */

export const LOCALES = ["en", "ne", "lt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Locales served under a path prefix. English sits at the root. */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ne: "नेपाली",
  lt: "Lietuvių",
};

/** Short label for the switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ne: "NE",
  lt: "LT",
};

/** BCP 47 tags for the html lang attribute and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-GB",
  ne: "ne-NP",
  lt: "lt-LT",
};

const dictionaries = { en, ne, lt } as const;

export type Content = typeof en;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dictionary(locale: Locale): Content {
  return dictionaries[locale] as Content;
}

/** Dot-path lookup, e.g. get("premise.body1", "lt"). */
export function get(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      dictionaries[locale]
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
export function paths(source: unknown = en, prefix = ""): string[] {
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

/** Prefix a path with the locale segment. `/about` → `/lt/about`. */
export function localeHref(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE ? clean || "/" : `/${locale}${clean}`;
}

/**
 * Which locales search engines are allowed to index. Translations start
 * unverified, so only English is indexable until a speaker has checked the
 * rest and INDEXED_LOCALES is widened.
 */
export function indexableLocales(): Locale[] {
  const raw = process.env.NEXT_PUBLIC_INDEXED_LOCALES ?? "en";
  const parsed = raw
    .split(",")
    .map((s) => s.trim())
    .filter(isLocale);
  return parsed.length ? parsed : ["en"];
}

export function isIndexable(locale: Locale): boolean {
  return indexableLocales().includes(locale);
}
