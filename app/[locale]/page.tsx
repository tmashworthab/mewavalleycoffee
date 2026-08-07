import type { Metadata } from "next";
import SiteShell from "../components/SiteShell";
import HomeContent from "../components/HomeContent";
import { pageMetadata } from "../lib/page-meta";
import type { Locale } from "../lib/content";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("home", locale);
}

export default async function LocaleHome({ params }: Params) {
  const { locale } = await params;
  return (
    <SiteShell locale={locale}>
      <HomeContent />
    </SiteShell>
  );
}
