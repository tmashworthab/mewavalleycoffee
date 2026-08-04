"use client";
import { useLanguage } from "../../lib/language";
import { Section, Eyebrow, SectionTitle, Body, PhotoBreak } from "./primitives";
import farmhouse from "../../media/nepal-farmhouse.jpg";

export default function Growers() {
  const { t } = useLanguage();
  const g = t.growers;

  return (
    <>
      <PhotoBreak
        src={farmhouse}
        alt={g.altFarmhouse}
        height="tall"
        position="object-[center_38%]"
      />

      <Section>
        <div className="max-w-[88rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>{g.eyebrow}</Eyebrow>
            </div>
            <div className="lg:col-span-8 max-w-[46rem]">
              <SectionTitle className="mb-10 sm:mb-14">{g.title}</SectionTitle>
              <Body lead delay={140} className="mb-8">
                {g.body1}
              </Body>
              <Body delay={220}>{g.body2}</Body>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
