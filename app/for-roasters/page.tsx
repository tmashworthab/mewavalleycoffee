import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "For Roasters - Mewa Valley Coffee",
  description: "Green coffee sourcing information for UK and EU roasters interested in Nepali specialty coffee.",
};

const points = [
  {
    heading: "What we are offering",
    body: "Traceable green coffee from Nepal's highland growing regions. Our first lots will be documented at producer level - covering farm or cooperative details, altitude, variety, processing method, and harvest date.",
  },
  {
    heading: "Who this is for",
    body: "Specialty roasters in the UK and EU who want to offer something genuinely different. Nepal is an emerging origin with real potential, and supply is currently very limited outside of local markets.",
  },
  {
    heading: "Where we are now",
    body: "We are in the pre-sourcing phase. Our July 2026 trip to Nepal will establish producer relationships and document the first sample lots. We are building a list of roasters to contact when samples are ready.",
  },
  {
    heading: "What roasters can expect",
    body: "Lot sheets with producer name, location, altitude, variety, process, and harvest information. Green samples available for cupping before any commitment. Honest communication about volumes, timelines, and pricing.",
  },
  {
    heading: "Volumes",
    body: "Initial lots will be small - likely 60-300kg per lot. This is not a commodity supply; it is designed for roasters who want a specific, documentable Nepal single origin.",
  },
  {
    heading: "Pricing",
    body: "Pricing will be confirmed after the sourcing trip. It will reflect the cost of small-batch importation and the quality of the coffee. We will share indicative numbers with interested roasters ahead of the trip.",
  },
];

export default function ForRoasters() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Buyers"
          title="For Roasters"
          subtitle="Everything a specialty roaster needs to know about sourcing Nepali green coffee through Mewa Valley."
        />

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto divide-y divide-[#d4a96a]/10">
            {points.map((p, i) => (
              <Reveal key={p.heading} delay={i * 80}>
                <div className="grid md:grid-cols-3 gap-6 py-10">
                  <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">
                    {p.heading}
                  </h2>
                  <p className="md:col-span-2 text-[#f5f0ea]/60 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <Reveal>
          <section className="py-16 px-6 border-t border-[#d4a96a]/15">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">Interested?</p>
                <p className="text-xl font-bold text-[#f5f0ea]">Register your interest before our July 2026 trip.</p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
