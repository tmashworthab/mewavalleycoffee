"use client";
import { useContent } from "../../lib/locale-context";
import { formatClasses } from "../../lib/format";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, InsetPhoto } from "./primitives";
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
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-16 gap-x-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <InsetPhoto
              src={cherry}
              altCk="coffee.altCherry"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>

          <div className="lg:col-span-7 lg:pl-10 order-1 lg:order-2 max-w-[44rem]">
            <Eyebrow ck="coffee.eyebrow" className="mb-8" />
            <SectionTitle ck="coffee.title" className="mb-10" />
            <Body ck="coffee.body1" lead delay={140} className="mb-8" />
            <Body ck="coffee.body2" delay={220} className="mb-14" />

            {/* Spec table — plain, factual, no badges */}
            <dl className="border-t border-[#c9a468]/15">
              {specs.map((s, i) => (
                <Reveal key={s.labelCk} delay={i * 90}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-[#c9a468]/15">
                    <dt className={`type-eyebrow text-[#f2ede6]/55 sm:w-40 shrink-0 ${formatClasses(s.labelCk, "label")}`} data-ck={s.labelCk} data-ck-role="label">
                      {s.label}
                    </dt>
                    <dd className={`font-serif-body text-[#f2ede6]/80 text-[1.0625rem] ${formatClasses(s.valueCk, "body")}`} data-ck={s.valueCk} data-ck-role="body">
                      {s.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
