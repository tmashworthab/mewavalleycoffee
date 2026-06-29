"use client";
import Link from "next/link";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/language";

export default function ForRoastersContent() {
  const { t } = useLanguage();
  const f = t.forRoasters;

  return (
    <>
      <PageHero eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} />

      {/* Where we are now */}
      <section className="py-20 px-6 border-b border-[#d4a96a]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{f.whereHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-4">{f.whereBody1}</p>
            <p className="text-[#f5f0ea]/60 leading-relaxed">{f.whereBody2}</p>
          </Reveal>
        </div>
      </section>

      {/* What roasters can expect */}
      <section className="py-20 px-6 border-b border-[#d4a96a]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{f.expectHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-6">{f.expectIntro}</p>
            <ul className="space-y-3">
              {f.expectItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#f5f0ea]/60 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-[#d4a96a]/50 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Volumes */}
      <section className="py-20 px-6 border-b border-[#d4a96a]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{f.volumesHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed">{f.volumesBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-b border-[#d4a96a]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{f.pricingHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed">{f.pricingBody}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <Reveal>
        <section className="py-16 px-6 border-t border-[#d4a96a]/15">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">{f.ctaEyebrow}</p>
              <p className="text-xl font-bold text-[#f5f0ea]">{f.ctaHeading}</p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300"
            >
              {f.ctaButton}
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
