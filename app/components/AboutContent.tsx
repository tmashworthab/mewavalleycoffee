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
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-6 text-lg">{a.aboutBody1}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[#f5f0ea]/60 leading-relaxed text-lg">{a.aboutBody2}</p>
          </Reveal>
        </div>
      </section>

      {/* Sourcing intro */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[#f5f0ea]/60 leading-relaxed text-lg">{a.sourcingBody1}</p>
          </Reveal>
        </div>
      </section>

      {/* Big background photo */}
      <Reveal>
        <section className="relative min-h-[60vh] md:min-h-[85vh] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/nepal-hill.jpg"
              alt={a.hillAlt}
              fill
              sizes="100vw"
              priority={false}
              className="object-cover animate-slow-zoom"
            />
          </div>
          {/* Overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,24,20,0.55) 0%, rgba(28,24,20,0.35) 35%, rgba(28,24,20,0.55) 70%, rgba(28,24,20,0.92) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(10,7,5,0.5) 100%)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <Reveal delay={120}>
              <span className="block h-px w-16 bg-[#d4a96a]/60 mx-auto mb-8" />
              <p className="text-[#f5f0ea] text-xl md:text-2xl leading-relaxed font-light drop-shadow-lg">
                {a.sourcingBody2}
              </p>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* Remaining sourcing detail + map */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-10 text-lg">{a.sourcingBody3}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative w-full mb-10 border border-[#d4a96a]/15 overflow-hidden">
              <Image
                src="/nepal-sourcing-map.png"
                alt={a.mapAlt}
                width={1200}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-[#f5f0ea]/60 leading-relaxed text-lg">{a.sourcingBody4}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
