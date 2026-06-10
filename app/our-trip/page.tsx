import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Our Trip - Mewa Valley Coffee",
  description: "Our July 2026 producer sourcing trip to Nepal's coffee-growing hills.",
};

const itinerary = [
  {
    phase: "Pre-trip",
    timing: "April - June 2026",
    items: [
      "Identify target districts and initial producer contacts",
      "Connect with Nepali coffee associations and cooperatives",
      "Share trip plans with interested roasters",
      "Prepare documentation templates for lot sheets",
    ],
  },
  {
    phase: "In-country",
    timing: "July 2026",
    items: [
      "Visit producers and cooperatives in the mid-hill regions",
      "Document farm details, altitude, variety, and processing setup",
      "Photograph growing conditions and processing infrastructure",
      "Collect and label green samples for cupping",
      "Discuss pricing, volumes, and harvest timelines with producers",
    ],
  },
  {
    phase: "Post-trip",
    timing: "August - September 2026",
    items: [
      "Cup all samples and score for specialty quality",
      "Publish lot sheets on this website",
      "Send samples to registered roasters on request",
      "Confirm first import orders based on roaster interest",
    ],
  },
];

const docItems = [
  { label: "Producer or cooperative name and location" },
  { label: "District and altitude of the growing land" },
  { label: "Coffee variety or varieties grown" },
  { label: "Processing method and infrastructure" },
  { label: "Estimated harvest dates and volumes" },
  { label: "Green sample for independent cupping" },
  { label: "Pricing discussion and terms" },
  { label: "Photos and GPS coordinates where possible" },
];

export default function OurTrip() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="July 2026"
          title="Our Trip"
          subtitle="In July 2026 we will travel to Nepal's coffee-growing districts to document producers, collect samples, and establish the sourcing relationships that will underpin Mewa Valley Coffee."
        />

        {/* What we will document */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/15">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-12">What we will document</p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-0 border border-[#d4a96a]/15">
              {docItems.map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <div
                    className={`flex items-start gap-4 px-6 py-5 border-[#d4a96a]/10
                      ${i % 2 === 0 ? "md:border-r" : ""}
                      ${i < 6 ? "border-b" : ""}
                    `}
                  >
                    <div className="w-1.5 h-1.5 bg-[#d4a96a] flex-shrink-0 mt-1.5" />
                    <p className="text-sm text-[#f5f0ea]/60 leading-relaxed">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Phased plan */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-12">Plan</p>
            </Reveal>
            <div className="space-y-12">
              {itinerary.map((phase, i) => (
                <Reveal key={phase.phase} delay={i * 100}>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xl font-black tracking-wider uppercase text-[#f5f0ea] mb-1">{phase.phase}</p>
                      <p className="text-xs tracking-[0.3em] uppercase text-[#d4a96a]/60">{phase.timing}</p>
                    </div>
                    <ul className="md:col-span-2 space-y-3">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-[#f5f0ea]/60 leading-relaxed">
                          <div className="w-1.5 h-1.5 bg-[#d4a96a]/50 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <section className="py-16 px-6 border-t border-[#d4a96a]/15">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">Follow the trip</p>
                <p className="text-xl font-bold text-[#f5f0ea]">
                  Register your interest and we will share updates and samples when we return.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300"
              >
                Register Interest
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
