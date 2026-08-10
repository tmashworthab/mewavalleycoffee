"use client";
import { useContent } from "../../lib/locale-context";
import { formatClasses } from "../../lib/format";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, InsetPhoto } from "./primitives";
import { Grid, COL } from "../Grid";
import cherry from "../../media/coffee-cherry.jpg";

export default function Coffee() {
  const { c: all } = useContent();
  const c = all.coffee;

  const specs = [
    { labelCk: "coffee.specVarietal", valueCk: "coffee.specVarietalValue", label: c.specVarietal, value: c.specVarietalValue },
    { labelCk: "coffee.specProcess", valueCk: "coffee.specProcessValue", label: c.specProcess, value: c.specProcessValue },
    { labelCk: "coffee.specMoisture", valueCk: "coffee.specMoistureValue", label: c.specMoisture, value: c.specMoistureValue },
    { labelCk: "coffee.specScore", valueCk: "coffee.specScoreValue", label: c.specScore, value: c.specScoreValue },
  ];

  return (
    <Section tone="raised">
      <Grid className="items-center" gapY="gap-y-16">
          <div className={`${COL.half} order-2 lg:order-1`}>
            <InsetPhoto
              src={cherry}
              altCk="coffee.altCherry"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>

          <div className={`${COL.halfEnd} order-1 lg:order-2`}>
            <Eyebrow ck="coffee.eyebrow" className="mb-8" />
            <SectionTitle ck="coffee.title" className="mb-10" />
            <Body ck="coffee.body1" lead delay={140} className="mb-8" />
            <Body ck="coffee.body2" delay={220} className="mb-14" />

            {/* Spec table — plain, factual, no badges */}
            <dl className="border-t border-[#c9a468]/15">
              {specs.map((s, i) => (
                <Reveal key={s.labelCk} delay={i * 90}>
                  {/* A nested six-column grid at the same gutter, so the
                      label and value land on the page's real columns rather
                      than a fixed width that misses them by a few pixels. */}
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-1 items-baseline py-5 border-b border-[#c9a468]/15">
                    <dt className={`type-eyebrow text-[#f2ede6]/55 sm:col-span-2 ${formatClasses(s.labelCk)}`} data-ck={s.labelCk} data-ck-role="label">
                      {s.label}
                    </dt>
                    <dd className={`font-serif-body text-[#f2ede6]/80 text-[1.0625rem] sm:col-span-4 ${formatClasses(s.valueCk)}`} data-ck={s.valueCk} data-ck-role="body">
                      {s.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
      </Grid>
    </Section>
  );
}
