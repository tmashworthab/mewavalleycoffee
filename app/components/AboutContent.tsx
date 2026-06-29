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

      {/* Intro over big background photo */}
      <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/nepal-hill.jpg"
            alt={a.hillAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover animate-slow-zoom"
          />
        </div>
        {/* Overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,24,20,0.6) 0%, rgba(28,24,20,0.4) 35%, rgba(28,24,20,0.6) 70%, rgba(28,24,20,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,7,5,0.55) 100%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <p className="text-[#f5f0ea] text-lg md:text-xl leading-relaxed font-light mb-6 drop-shadow-lg">
              {a.aboutBody1}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[#f5f0ea] text-lg md:text-xl leading-relaxed font-light mb-6 drop-shadow-lg">
              {a.aboutBody2}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <span className="block h-px w-16 bg-[#d4a96a]/60 mx-auto mb-6" />
            <p className="text-[#f5f0ea] text-lg md:text-xl leading-relaxed font-light drop-shadow-lg">
              {a.sourcingBody1}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Remaining sourcing detail + map */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-10 text-lg">{a.sourcingBody2}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-10 text-lg">{a.sourcingBody3}</p>
          </Reveal>

          <Reveal delay={160}>
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

          <Reveal delay={240}>
            <p className="text-[#f5f0ea]/60 leading-relaxed mb-10 text-lg">{a.sourcingBody4}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="relative w-full border border-[#d4a96a]/15 overflow-hidden">
              <Image
                src="/nepal-hill-3.jpg"
                alt={a.hillAlt}
                width={1600}
                height={1200}
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
