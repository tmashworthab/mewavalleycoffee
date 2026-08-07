"use client";
import { useContent } from "../../lib/locale-context";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, PhotoBreak, InsetPhoto } from "./primitives";
import road from "../../media/nepal-road.jpg";
import valley from "../../media/nepal-valley.jpg";

export default function Journey() {
  const { c } = useContent();
  return (
    <>
      <PhotoBreak src={valley} altCk="journey.altValley" height="mid" />

      <Section tone="raised">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-16 gap-x-16 items-start">
            <div className="lg:col-span-6 lg:sticky lg:top-32">
              <Eyebrow ck="journey.eyebrow" className="mb-8" />
              <SectionTitle ck="journey.title" className="mb-10" />
              <Body ck="journey.body1" lead delay={140} className="mb-8" />
              <Body ck="journey.body2" delay={220} />
            </div>

            <div className="lg:col-span-6 lg:pl-8">
              <InsetPhoto
                src={road}
                altCk="journey.altRoad"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <Reveal delay={160}>
                <p
                  className="type-caption text-[#f2ede6]/55 pt-5 max-w-sm"
                  data-ck="journey.captionRoad"
                >
                  {c.journey.captionRoad}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Pull quote — the emotional beat of the section */}
          <Reveal delay={80}>
            <blockquote className="mt-28 sm:mt-40 max-w-[44rem] mx-auto text-center">
              <p
                className="font-serif-display type-subtitle text-[#f2ede6]/90 italic text-balance hang-quote"
                data-ck="journey.pullquote"
                data-ck-wrap="quotes"
              >
                &ldquo;{c.journey.pullquote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
