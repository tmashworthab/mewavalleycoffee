"use client";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/language";

export default function OriginContent() {
  const { t } = useLanguage();
  const o = t.origin;

  return (
    <>
      <PageHero eyebrow={o.eyebrow} title={o.title} subtitle={o.subtitle} />

      {/* Fact table */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto divide-y divide-[#d4a96a]/10">
          {o.facts.map((f, i) => (
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
    </>
  );
}
