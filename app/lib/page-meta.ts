import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  dictionary,
  isIndexable,
  localeHref,
  type Locale,
} from "./content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mewavalley.com";

type PageKey = "home" | "about" | "contact";

const PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
};

/**
 * Per-page, per-language metadata.
 *
 * Every page advertises all three languages via hreflang so search engines
 * treat them as one page in three languages rather than duplicates. Locales
 * whose translation has not been checked by a speaker are marked noindex
 * until INDEXED_LOCALES is widened.
 */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const c = dictionary(locale);
  const path = PATHS[page];

  const title =
    page === "home"
      ? `${c.hero.headline} ${c.hero.sub}`.trim()
      : page === "about"
        ? c.about.title
        : c.contact.title;

  const description =
    page === "home"
      ? c.premise.body1
      : page === "about"
        ? c.about.aboutBody1
        : c.contact.subtitle;

  const canonical = localeHref(path, locale);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_TAGS[l]] = localeHref(path, l);
  }
  languages["x-default"] = localeHref(path, DEFAULT_LOCALE);

  const indexable = isIndexable(locale);

  return {
    title: page === "home" ? undefined : title,
    description: description.slice(0, 300),
    alternates: { canonical, languages },
    openGraph: {
      title: page === "home" ? `Mewa Valley Coffee — ${title}` : title,
      description: description.slice(0, 300),
      url: `${SITE_URL}${canonical === "/" ? "" : canonical}`,
      locale: LOCALE_TAGS[locale].replace("-", "_"),
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}
