"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_SHORT,
  LOCALE_NAMES,
  DEFAULT_LOCALE,
  isLocale,
  localeHref,
  type Locale,
} from "../lib/content";
import { useLocale } from "../lib/locale-context";

/**
 * Switching language is a navigation, not a state change — each language has
 * its own URL, so the choice survives refreshes, bookmarks and shared links.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
    return "/" + rest.join("/");
  }
  return pathname;
}

export default function LanguageSwitcher({
  className = "",
  variant = "inline",
}: {
  className?: string;
  variant?: "inline" | "stacked";
}) {
  const pathname = usePathname();
  const current = useLocale();
  const basePath = stripLocale(pathname || "/");

  return (
    <nav
      aria-label="Language"
      className={
        variant === "stacked"
          ? `flex flex-col gap-3 ${className}`
          : `flex items-center gap-3 ${className}`
      }
    >
      {LOCALES.map((locale: Locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={localeHref(basePath, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            title={LOCALE_NAMES[locale]}
            className={`type-eyebrow transition-colors duration-500 ${
              active
                ? "text-[#c9a468]"
                : "text-[#f2ede6]/50 hover:text-[#f2ede6]"
            }`}
          >
            {variant === "stacked" ? LOCALE_NAMES[locale] : LOCALE_SHORT[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
