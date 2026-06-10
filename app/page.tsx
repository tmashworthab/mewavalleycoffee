import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 70%, #4d2a12 0%, transparent 55%),
                radial-gradient(ellipse at 70% 30%, #3a2010 0%, transparent 50%),
                linear-gradient(135deg, #1c1814 0%, #2a1e14 40%, #1e1a15 100%)
              `,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(28,24,20,0.7) 100%)" }}
          />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-[#d4a96a]/50" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] font-medium">
                Single Origin · Nepal
              </span>
              <span className="h-px w-12 bg-[#d4a96a]/50" />
            </div>

            <div className="flex justify-center mb-6">
              <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
                <polyline points="2,38 22,8 32,22 42,8 62,38" stroke="#d4a96a" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <circle cx="32" cy="18" r="4" fill="none" stroke="#d4a96a" strokeWidth="1" />
                <path d="M30 18 Q32 14 34 18" stroke="#d4a96a" strokeWidth="0.8" fill="none" />
              </svg>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase leading-none mb-4">
              <span className="text-[#d4a96a]">MEWA</span>
              <br />
              <span className="text-[#f5f0ea]">VALLEY</span>
            </h1>
            <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-[#d4a96a]/80 mb-8 font-medium">Coffee</p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-16 bg-[#d4a96a]/30" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2" fill="#d4a96a" opacity="0.7" />
                <circle cx="8" cy="8" r="6" stroke="#d4a96a" strokeWidth="0.5" opacity="0.4" />
              </svg>
              <span className="h-px w-16 bg-[#d4a96a]/30" />
            </div>

            <p className="text-lg md:text-xl text-[#f5f0ea]/70 max-w-2xl mx-auto leading-relaxed mb-4 font-light">
              Mewa Valley Coffee connects UK and European roasters with traceable Nepali coffee lots sourced through direct producer relationships.
            </p>
            <p className="text-sm md:text-base text-[#f5f0ea]/50 max-w-xl mx-auto leading-relaxed mb-12 font-light">
              Mewa Valley Coffee is building direct sourcing relationships with Nepali producers
              and cooperatives. In July 2026, we will be visiting producers to document our first
              green coffee lots for UK and EU roasters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/for-roasters"
                className="group px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300 flex items-center gap-3"
              >
                For Roasters
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 border border-[#f5f0ea]/20 text-[#f5f0ea]/60 text-xs tracking-[0.3em] uppercase hover:border-[#d4a96a]/50 hover:text-[#d4a96a] transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Page index */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-12">Explore</p>
            <div className="divide-y divide-[#d4a96a]/10">
              {pages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group flex items-center justify-between py-6 hover:pl-2 transition-all duration-300"
                >
                  <div>
                    <p className="text-lg font-bold tracking-widest uppercase text-[#f5f0ea] group-hover:text-[#d4a96a] transition-colors mb-1">
                      {p.label}
                    </p>
                    <p className="text-sm text-[#f5f0ea]/40">{p.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#d4a96a]/40 group-hover:text-[#d4a96a] group-hover:translate-x-1 transition-all flex-shrink-0 ml-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
