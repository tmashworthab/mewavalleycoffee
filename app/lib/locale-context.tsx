"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_TAGS,
  get,
  dictionary,
  type Locale,
} from "./content";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  // <html> lives in the root layout, which cannot know the locale without
  // giving up static prerendering, so the tag is corrected on the client.
  // Search engines get the language from hreflang and canonical regardless;
  // this is what screen readers and browser translation actually read.
  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[locale];
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/**
 * Copy for the current locale.
 *
 * `t(path)` looks a string up by dot-path — the same path the editor stamps
 * onto the element as data-ck, so the two always agree.
 */
export function useContent() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    c: dictionary(locale),
    t: (path: string) => get(path, locale),
  };
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
