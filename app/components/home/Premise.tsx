"use client";
import { useContent } from "../../lib/locale-context";
import { formatClasses } from "../../lib/format";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, Hairline } from "./primitives";
import { Grid, COL } from "../Grid";

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
        <Grid>
          <div className={COL.rail}>
            <Eyebrow ck="premise.eyebrow" />
          </div>

          <div className={COL.afterRail}>
            <SectionTitle ck="premise.title" className="mb-10 sm:mb-14" />
            <Body ck="premise.body1" lead delay={140} className="mb-8" />
            <Body ck="premise.body2" delay={220} />
          </div>
        </Grid>

        {/* Facts — quiet, not a marketing band */}
        <div className="mt-24 sm:mt-32">
          <Hairline />
          <Grid as="dl" className="pt-12 sm:pt-16" gapY="gap-y-12">
            {stats.map((s, i) => (
              <Reveal key={s.labelCk} delay={i * 110} className="col-span-4 lg:col-span-4">
                <dt className={`type-eyebrow text-[#f2ede6]/55 mb-4 ${formatClasses(s.labelCk)}`} data-ck={s.labelCk} data-ck-role="label">
                  {s.label}
                </dt>
                <dd
                  className={`font-serif-display text-[1.75rem] sm:text-[2.125rem] text-[#c9a468] leading-none ${formatClasses(s.valueCk)}`}
                  data-ck={s.valueCk}
                  data-ck-role="title"
                >
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </Grid>
        </div>
    </Section>
  );
}
