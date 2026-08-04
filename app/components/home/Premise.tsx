"use client";
import { useLanguage } from "../../lib/language";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, Hairline } from "./primitives";

export default function Premise() {
  const { t } = useLanguage();
  const p = t.premise;

  const stats = [
    { value: p.statAltitude, label: p.statAltitudeLabel },
    { value: p.statDistricts, label: p.statDistrictsLabel },
    { value: p.statHarvest, label: p.statHarvestLabel },
  ];

  return (
    <Section id="origin">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
          {/* Left rail: eyebrow */}
          <div className="lg:col-span-4">
            <Eyebrow>{p.eyebrow}</Eyebrow>
          </div>

          {/* Right: the argument */}
          <div className="lg:col-span-8 max-w-[46rem]">
            <SectionTitle className="mb-10 sm:mb-14">{p.title}</SectionTitle>
            <Body lead delay={140} className="mb-8">
              {p.body1}
            </Body>
            <Body delay={220}>{p.body2}</Body>
          </div>
        </div>

        {/* Facts — quiet, not a marketing band */}
        <div className="mt-24 sm:mt-32">
          <Hairline />
          <dl className="grid sm:grid-cols-3 gap-y-12 gap-x-12 pt-12 sm:pt-16">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <dt className="type-eyebrow text-[#f2ede6]/55 mb-4">
                  {s.label}
                </dt>
                <dd className="font-serif-display text-[1.75rem] sm:text-[2.125rem] text-[#c9a468] leading-none">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
