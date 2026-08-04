"use client";
import { useLanguage } from "../../lib/language";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, PhotoBreak, InsetPhoto } from "./primitives";
import road from "../../media/nepal-road.jpg";
import valley from "../../media/nepal-valley.jpg";

export default function Journey() {
  const { t } = useLanguage();
  const j = t.journey;

  return (
    <>
      {/* The road in — full bleed, sets the scale of the place */}
      <PhotoBreak src={valley} alt={j.altValley} height="mid" />

      <Section tone="raised">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-16 gap-x-16 items-start">
            {/* Text column */}
            <div className="lg:col-span-6 lg:sticky lg:top-32">
              <Eyebrow className="mb-8">{j.eyebrow}</Eyebrow>
              <SectionTitle className="mb-10">{j.title}</SectionTitle>
              <Body lead delay={140} className="mb-8">
                {j.body1}
              </Body>
              <Body delay={220}>{j.body2}</Body>
            </div>

            {/* Photograph column */}
            <div className="lg:col-span-6 lg:pl-8">
              <InsetPhoto
                src={road}
                alt={j.altRoad}
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <Reveal delay={160}>
                <p className="type-caption text-[#f2ede6]/55 pt-5 max-w-sm">
                  {j.captionRoad}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Pull quote — the emotional beat of the section */}
          <Reveal delay={80}>
            <blockquote className="mt-28 sm:mt-40 max-w-[44rem] mx-auto text-center">
              <p className="font-serif-display type-subtitle text-[#f2ede6]/90 italic text-balance hang-quote">
                &ldquo;{j.pullquote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
