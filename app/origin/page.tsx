import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Origin - Mewa Valley Coffee",
  description: "The geography, climate, and growing conditions behind Nepali specialty coffee.",
};

const facts = [
  {
    label: "Country",
    value: "Nepal",
    note: "Landlocked country in South Asia, bordered by India and China (Tibet).",
  },
  {
    label: "Our focus",
    value: "Gulmi District",
    note: "Our current supplier conversations are focused on Arabica coffee from Resunga Municipality, Gulmi District, Lumbini Province.",
  },
  {
    label: "Altitude",
    value: "1,100+ masl",
    note: "Altitude varies by district and farm. Our current Gulmi supplier lead reports coffee grown at 1,100+ masl (metres above sea level). High altitude slows cherry development, concentrating sugars and producing denser beans.",
  },
  {
    label: "Variety",
    value: "Arabica",
    note: "Local Gulmi Arabica variety, verification pending. Nepal has no Robusta production at altitude.",
  },
  {
    label: "Harvest",
    value: "Jan – Mar (Gulmi)",
    note: "Harvest varies by district, altitude and producer. Our current Gulmi supplier information indicates a January–March 2026 harvest.",
  },
  {
    label: "Processing",
    value: "Washed & Natural",
    note: "Both methods are available from our current Gulmi supplier. Washed lots tend to produce cleaner, brighter cups. Naturals show more fruit character.",
  },
  {
    label: "Climate",
    value: "Subtropical Highland",
    note: "Cool dry winters, warm monsoon summers. The monsoon brings reliable rainfall critical to cherry development.",
  },
  {
    label: "Status",
    value: "Emerging Origin",
    note: "Nepal has been producing coffee commercially since the 1980s but remains largely unknown outside specialty circles. Export documentation is available from established cooperatives.",
  },
];

export default function OriginPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="The Terroir"
          title="Origin"
          subtitle="Nepal is an emerging specialty coffee origin with genuine potential. Here are the facts."
        />

        {/* Fact table */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto divide-y divide-[#d4a96a]/10">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 60}>
                <div className="grid md:grid-cols-3 gap-4 py-8 items-start">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4a96a] font-medium pt-1">{f.label}</p>
                  <div className="md:col-span-2">
                    <p className="text-[#f5f0ea] font-bold mb-1">{f.value}</p>
                    <p className="text-[#f5f0ea]/50 text-sm leading-relaxed">{f.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Context note */}
        <Reveal>
          <section className="py-16 px-6 border-t border-[#d4a96a]/15">
            <div className="max-w-4xl mx-auto">
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-6">A note on the origin</p>
              <p className="text-[#f5f0ea]/60 leading-relaxed max-w-2xl mb-4">
                Gulmi District is one of Nepal's recognised coffee-growing areas. Our current supplier conversations are focused on Arabica coffee from Resunga Municipality, grown at 1,100+ masl and processed as washed and natural lots.
              </p>
              <p className="text-[#f5f0ea]/60 leading-relaxed max-w-2xl mb-4">
                Nepal's coffee industry is small and fragmented. Many growers are smallholders with less than a hectare under production. This makes traceability challenging but also means that direct relationships with producers or cooperatives are genuinely possible.
              </p>
              <p className="text-[#f5f0ea]/60 leading-relaxed max-w-2xl mb-10">
                During our July 2026 sourcing visit, we aim to document farm and cooperative details, processing methods, storage conditions, sample quality and export readiness.
              </p>
              <Link
                href="/our-trip"
                className="inline-flex items-center gap-3 text-[#d4a96a] text-xs tracking-[0.3em] uppercase font-bold hover:gap-5 transition-all duration-300"
              >
                Read about our July 2026 sourcing trip
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
