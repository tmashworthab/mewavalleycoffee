"use client";
import Image from "next/image";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/language";

export default function AboutContent() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />

      {/* About */}
      <section className="py-20 px-6 border-b border-[#d4a96a]/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{a.aboutHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-4">{a.aboutBody1}</p>
            <p className="text-[#f5f0ea]/60 leading-relaxed">{a.aboutBody2}</p>
          </Reveal>
        </div>
      </section>

      {/* Our Sourcing */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">{a.sourcingHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-2">
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-8">{a.sourcingBody1}</p>

            <div className="relative w-full mb-8 border border-[#d4a96a]/15 overflow-hidden">
              <Image
                src="/nepal-sourcing-map.png"
                alt={a.mapAlt}
                width={1200}
                height={900}
                className="w-full h-auto"
              />
            </div>

            <p className="text-[#f5f0ea]/60 leading-relaxed mb-4">{a.sourcingBody2}</p>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-4">{a.sourcingBody3}</p>
            <p className="text-[#f5f0ea]/60 leading-relaxed">{a.sourcingBody4}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
