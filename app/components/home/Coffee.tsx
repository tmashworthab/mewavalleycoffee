"use client";
import { useLanguage } from "../../lib/language";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body, InsetPhoto } from "./primitives";
import cherry from "../../media/coffee-cherry.jpg";

export default function Coffee() {
  const { t } = useLanguage();
  const c = t.coffee;

  const specs = [
    { label: c.specVarietal, value: c.specVarietalValue },
    { label: c.specProcess, value: c.specProcessValue },
    { label: c.specMoisture, value: c.specMoistureValue },
    { label: c.specScore, value: c.specScoreValue },
  ];

  return (
    <Section tone="raised">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-16 gap-x-16 items-center">
          {/* Photograph leads on desktop — the cherry is the product */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <InsetPhoto
              src={cherry}
              alt={c.altCherry}
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>

          <div className="lg:col-span-7 lg:pl-10 order-1 lg:order-2 max-w-[44rem]">
            <Eyebrow className="mb-8">{c.eyebrow}</Eyebrow>
            <SectionTitle className="mb-10">{c.title}</SectionTitle>
            <Body lead delay={140} className="mb-8">
              {c.body1}
            </Body>
            <Body delay={220} className="mb-14">
              {c.body2}
            </Body>

            {/* Spec table — plain, factual, no badges */}
            <dl className="border-t border-[#c9a468]/15">
              {specs.map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-[#c9a468]/15">
                    <dt className="type-eyebrow text-[#f2ede6]/55 sm:w-40 shrink-0">
                      {s.label}
                    </dt>
                    <dd className="font-serif-body text-[#f2ede6]/80 text-[1.0625rem]">
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
