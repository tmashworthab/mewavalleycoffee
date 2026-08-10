"use client";

import Nav from "./Nav";
import Footer from "./Footer";
import { LocaleProvider } from "../lib/locale-context";
import EditorMount from "./edit/EditorMount";
import type { Locale } from "../lib/content";

/**
 * Wraps every page in the active language plus the shared chrome, so a page
 * file only has to say which locale and which content it is.
 */
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // data-locale is rendered server-side, so script-specific typography (see
  // globals.css) applies on first paint rather than flashing after hydration.
  return (
    <LocaleProvider locale={locale}>
      <div data-locale={locale} className="contents">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        {/* Inside the provider so the editor knows which language it is editing. */}
        <EditorMount />
      </div>
    </LocaleProvider>
  );
}
