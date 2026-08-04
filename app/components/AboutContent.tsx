"use client";
import Image from "next/image";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/language";
import { PhotoBreak, Hairline } from "./home/primitives";
import farmhouse from "../media/nepal-farmhouse.jpg";
import valley from "../media/nepal-valley.jpg";

export default function AboutContent() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />

      {/* Opening statement — set in the reading serif, wide measure, no photo
          competing with it. The photography arrives immediately after. */}
      <section className="px-6 sm:px-10 lg:px-16 pb-24 sm:pb-32">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-[46rem]">
            <Reveal>
              <p className="font-serif-body type-lead text-[#f2ede6]/85 mb-8">
                {a.aboutBody1}
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p className="font-serif-body type-body text-[#f2ede6]/65">
                {a.aboutBody2}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoBreak src={valley} alt={a.hillAlt} height="mid" />

      {/* Sourcing detail */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-[46rem] mb-20 sm:mb-28">
            <Reveal>
              <p className="font-serif-body type-lead text-[#f2ede6]/85 mb-8">
                {a.sourcingBody1}
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p className="font-serif-body type-body text-[#f2ede6]/65 mb-8">
                {a.sourcingBody2}
              </p>
            </Reveal>
            <Reveal delay={190}>
              <p className="font-serif-body type-body text-[#f2ede6]/65">
                {a.sourcingBody3}
              </p>
            </Reveal>
          </div>

          <Reveal variant="mask" delay={80}>
            <div className="relative w-full max-w-[64rem]">
              <Image
                src="/nepal-sourcing-map.png"
                alt={a.mapAlt}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="w-full h-auto"
              />
            </div>
          </Reveal>

          <div className="mt-20 sm:mt-28 max-w-[46rem]">
            <Hairline />
            <Reveal delay={80}>
              <p className="font-serif-display type-subtitle text-[#f2ede6]/90 pt-12 text-balance">
                {a.sourcingBody4}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoBreak src={farmhouse} alt={a.hillAlt} height="mid" position="object-[center_40%]" />
    </>
  );
}
