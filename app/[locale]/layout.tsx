import { notFound } from "next/navigation";
import { PREFIXED_LOCALES } from "../lib/content";

/**
 * Only the prefixed locales exist as routes; English lives at the root.
 * dynamicParams=false makes anything else a 404 rather than a rendered page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(PREFIXED_LOCALES as readonly string[]).includes(locale)) {
    notFound();
  }
  return <>{children}</>;
}
