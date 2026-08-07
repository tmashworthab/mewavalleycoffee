import type { Metadata } from "next";
import SiteShell from "../components/SiteShell";
import ContactContent from "../components/ContactContent";
import { pageMetadata } from "../lib/page-meta";

export const metadata: Metadata = pageMetadata("contact", "en");

export default function ContactPage() {
  return (
    <SiteShell locale="en">
      <ContactContent />
    </SiteShell>
  );
}
