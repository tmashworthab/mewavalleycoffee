"use client";
import { useContent } from "../../lib/locale-context";
import { formatClasses } from "../../lib/format";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, Hairline } from "./primitives";

export default function Premise() {
  const { c } = useContent();
  const p = c.premise;

  const stats = [
    { valueCk: "premise.statAltitude", labelCk: "premise.statAltitudeLabel", value: p.statAltitude, label: p.statAltitudeLabel },
    { valueCk: "premise.statDistricts", labelCk: "premise.statDistrictsLabel", value: p.statDistricts, label: p.statDistrictsLabel },
    { valueCk: "premise.statHarvest", labelCk: "premise.statHarvestLabel", value: p.statHarvest, label: p.statHarvestLabel },
  ];

  return (
    <Section id="origin">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
          <div className="lg:col-span-4">
            <Eyebrow ck="premise.eyebrow" />
          </div>

          <div className="lg:col-span-8 max-w-[46rem]">
            <SectionTitle ck="premise.title" className="mb-10 sm:mb-14" />
            <Body ck="premise.body1" lead delay={140} className="mb-8" />
            <Body ck="premise.body2" delay={220} />
          </div>
        </div>

        {/* Facts — quiet, not a marketing band */}
        <div className="mt-24 sm:mt-32">
          <Hairline />
          <dl className="grid sm:grid-cols-3 gap-y-12 gap-x-12 pt-12 sm:pt-16">
            {stats.map((s, i) => (
              <Reveal key={s.labelCk} delay={i * 110}>
                <dt className={`type-eyebrow text-[#f2ede6]/55 mb-4 ${formatClasses(s.labelCk, "label")}`} data-ck={s.labelCk} data-ck-role="label">
                  {s.label}
                </dt>
                <dd
                  className={`font-serif-display text-[1.75rem] sm:text-[2.125rem] text-[#c9a468] leading-none ${formatClasses(s.valueCk, "title")}`}
                  data-ck={s.valueCk}
                  data-ck-role="title"
                >
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
