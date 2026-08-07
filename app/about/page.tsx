import type { Metadata } from "next";
import SiteShell from "../components/SiteShell";
import AboutContent from "../components/AboutContent";
import { pageMetadata } from "../lib/page-meta";

export const metadata: Metadata = pageMetadata("about", "en");

export default function AboutPage() {
  return (
    <SiteShell locale="en">
      <AboutContent />
    </SiteShell>
  );
}
