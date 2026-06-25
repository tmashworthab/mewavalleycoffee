"use client";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import Reveal from "./components/Reveal";
import Link from "next/link";
import { useLanguage } from "./lib/language";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Nav />
      <main>
        <HomeHero />

        {/* Gulmi 2026 section */}
        <section className="py-20 px-6 border-t border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-6">{t.home.gulmiHeading}</p>
              <p className="text-[#f5f0ea]/60 leading-relaxed max-w-2xl mb-4">
                {t.home.gulmiBody}
              </p>
              <p className="text-[#f5f0ea]/40 text-sm leading-relaxed max-w-2xl">
                {t.home.gulmiNote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Page index */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-12">{t.home.exploreHeading}</p>
            </Reveal>
            <div className="divide-y divide-[#d4a96a]/10">
              {t.home.pages.map((p, i) => (
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
