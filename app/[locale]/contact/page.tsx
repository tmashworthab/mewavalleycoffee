import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import ContactContent from "../../components/ContactContent";
import { pageMetadata } from "../../lib/page-meta";
import type { Locale } from "../../lib/content";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("contact", locale);
}

export default async function LocaleContact({ params }: Params) {
  const { locale } = await params;
  return (
    <SiteShell locale={locale}>
      <ContactContent />
    </SiteShell>
  );
}
