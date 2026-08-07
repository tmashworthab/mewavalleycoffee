import type { Metadata } from "next";
import SiteShell from "./components/SiteShell";
import HomeContent from "./components/HomeContent";
import { pageMetadata } from "./lib/page-meta";

export const metadata: Metadata = pageMetadata("home", "en");

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mewa Valley Coffee",
  url: "https://www.mewavalley.com",
  logo: "https://www.mewavalley.com/logo.png",
  description:
    "Green coffee sourced directly from smallholder producers in the hill districts of eastern Nepal, for UK and European roasters.",
  email: "info@mewavalley.com",
  telephone: "+44-7341-848470",
  areaServed: ["GB", "EU"],
  knowsAbout: ["Nepali green coffee", "Specialty coffee sourcing", "Ilam", "Bhojpur", "Solukhumbu"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteShell locale="en">
        <HomeContent />
      </SiteShell>
    </>
  );
}
