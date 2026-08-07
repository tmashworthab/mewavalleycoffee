import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_TAGS, localeHref, isIndexable } from "./lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mewavalley.com";

const PAGES: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/contact", priority: 0.6, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    // Every language of a page points at all the others, so search engines
    // treat them as one page in several languages.
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      if (!isIndexable(locale)) continue;
      languages[LOCALE_TAGS[locale]] =
        `${SITE_URL}${localeHref(page.path, locale) === "/" ? "" : localeHref(page.path, locale)}`;
    }

    for (const locale of LOCALES) {
      if (!isIndexable(locale)) continue;
      const href = localeHref(page.path, locale);
      entries.push({
        url: `${SITE_URL}${href === "/" ? "" : href}`,
        lastModified,
        changeFrequency: page.freq,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
