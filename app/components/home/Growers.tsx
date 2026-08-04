"use client";
import { Section, Eyebrow, SectionTitle, Body, PhotoBreak } from "./primitives";
import farmhouse from "../../media/nepal-farmhouse.jpg";

export default function Growers() {
  return (
    <>
      <PhotoBreak
        src={farmhouse}
        altCk="growers.altFarmhouse"
        height="tall"
        position="object-[center_38%]"
      />

      <Section>
        <div className="max-w-[88rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow ck="growers.eyebrow" />
            </div>
            <div className="lg:col-span-8 max-w-[46rem]">
              <SectionTitle ck="growers.title" className="mb-10 sm:mb-14" />
              <Body ck="growers.body1" lead delay={140} className="mb-8" />
              <Body ck="growers.body2" delay={220} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
