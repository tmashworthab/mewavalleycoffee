"use client";
import Image from "next/image";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { content, get } from "../lib/content";
import { PhotoBreak, Hairline } from "./home/primitives";
import farmhouse from "../media/nepal-farmhouse.jpg";
import valley from "../media/nepal-valley.jpg";

export default function AboutContent() {
  const a = content.about;

  const para = (ck: string, cls: string, delay = 0) => (
    <Reveal delay={delay}>
      <p className={cls} data-ck={ck}>
        {get(ck)}
      </p>
    </Reveal>
  );

  const lead = "font-serif-body type-lead text-[#f2ede6]/85";
  const body = "font-serif-body type-body text-[#f2ede6]/65";

  return (
    <>
      <PageHero eyebrowCk="about.eyebrow" titleCk="about.title" />

      <section className="px-6 sm:px-10 lg:px-16 pb-24 sm:pb-32">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-[46rem]">
            {para("about.aboutBody1", `${lead} mb-8`)}
            {para("about.aboutBody2", body, 110)}
          </div>
        </div>
      </section>

      <PhotoBreak src={valley} altCk="about.hillAlt" height="mid" />

      <section className="px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
        <div className="max-w-[88rem] mx-auto">
          <div className="max-w-[46rem] mb-20 sm:mb-28">
            {para("about.sourcingBody1", `${lead} mb-8`)}
            {para("about.sourcingBody2", `${body} mb-8`, 110)}
            {para("about.sourcingBody3", body, 190)}
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
              <p
                className="font-serif-display type-subtitle text-[#f2ede6]/90 pt-12 text-balance"
                data-ck="about.sourcingBody4"
              >
                {a.sourcingBody4}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoBreak src={farmhouse} altCk="about.hillAlt" height="mid" position="object-[center_40%]" />
    </>
  );
}
