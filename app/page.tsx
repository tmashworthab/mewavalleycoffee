import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import Reveal from "./components/Reveal";
import Link from "next/link";

const pages = [
  { href: "/for-roasters", label: "For Roasters", desc: "What we offer, who we are, and why Nepal." },
  { href: "/origin",       label: "Origin",       desc: "The geography and growing conditions of Nepal's coffee hills." },
  { href: "/sample-lots",  label: "Sample Lots",  desc: "Lot information for roasters - arriving after July 2026." },
  { href: "/our-trip",     label: "Our Trip",     desc: "Our July 2026 producer sourcing trip." },
  { href: "/contact",      label: "Contact",      desc: "Roaster enquiry form." },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HomeHero />

        {/* Gulmi 2026 section */}
        <section className="py-20 px-6 border-t border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-6">Gulmi 2026 Samples in Progress</p>
              <p className="text-[#f5f0ea]/60 leading-relaxed max-w-2xl mb-4">
                We are currently in discussion with an established coffee cooperative in Gulmi District, Lumbini Province, Nepal. Supplier-reported information indicates Arabica coffee grown at 1,100+ masl (metres above sea level), washed and natural processing, moisture below 11%, and cup scores in the 81–85 range.
              </p>
              <p className="text-[#f5f0ea]/40 text-sm leading-relaxed max-w-2xl mb-8">
                All supplier information is subject to sample verification, lot confirmation and independent UK cupping before any commercial offer is made.
              </p>
              <Link
                href="/sample-lots"
                className="inline-flex items-center gap-3 text-[#d4a96a] text-xs tracking-[0.3em] uppercase font-bold hover:gap-5 transition-all duration-300"
              >
                View pending sample lots
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Page index */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-12">Explore</p>
            </Reveal>
            <div className="divide-y divide-[#d4a96a]/10">
              {pages.map((p, i) => (
                <Reveal key={p.href} delay={i * 70}>
                  <Link
                    href={p.href}
                    className="group flex items-center justify-between py-6 hover:pl-2 transition-all duration-300"
                  >
                    <div>
                      <p className="text-lg font-bold tracking-widest uppercase text-[#f5f0ea] group-hover:text-[#d4a96a] transition-colors duration-300 mb-1">
                        {p.label}
                      </p>
                      <p className="text-sm text-[#f5f0ea]/40">{p.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-[#d4a96a]/40 group-hover:text-[#d4a96a] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
