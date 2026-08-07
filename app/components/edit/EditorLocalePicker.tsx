"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LOCALES,
  LOCALE_SHORT,
  LOCALE_NAMES,
  localeHref,
  type Locale,
} from "../../lib/content";
import { stripLocale } from "../LanguageSwitcher";

/**
 * Which language the editor is working on, switchable without leaving the bar.
 *
 * Switching is a navigation, since each language is its own URL. Unpublished
 * work is safe either way: drafts are stored per language, so anything left
 * unsaved here is still waiting when you come back.
 */
export default function EditorLocalePicker({
  current,
  unpublishedByLocale,
}: {
  current: Locale;
  unpublishedByLocale: Partial<Record<Locale, number>>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const basePath = stripLocale(pathname || "/");

  return (
    <div className="flex items-center gap-1 shrink-0" role="group" aria-label="Language being edited">
      {LOCALES.map((l) => {
        const active = l === current;
        const pending = unpublishedByLocale[l] ?? 0;
        return (
          <button
            key={l}
            onClick={() => !active && router.push(localeHref(basePath, l))}
            aria-current={active ? "true" : undefined}
            title={
              pending
                ? `${LOCALE_NAMES[l]} — ${pending} unpublished change${pending === 1 ? "" : "s"}`
                : LOCALE_NAMES[l]
            }
            className={`relative px-2 py-1.5 rounded text-[11px] tracking-[0.14em] font-medium transition-colors duration-200 ${
              active
                ? "bg-[#c9a468] text-[#141210]"
                : "text-[#f2ede6]/50 hover:text-[#f2ede6] hover:bg-[#f2ede6]/10"
            }`}
          >
            {LOCALE_SHORT[l]}
            {/* A dot marks a language with work waiting to be published. */}
            {pending > 0 && !active && (
              <span
                className="absolute top-0.5 right-0.5 block w-1.5 h-1.5 rounded-full bg-[#c9a468]"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
