"use client";
import { useLanguage } from "../../lib/language";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body } from "./primitives";

export default function Verify() {
  const { t } = useLanguage();
  const v = t.verify;

  const points = [
    { title: v.pointOneTitle, body: v.pointOneBody },
    { title: v.pointTwoTitle, body: v.pointTwoBody },
    { title: v.pointThreeTitle, body: v.pointThreeBody },
  ];

  return (
    <Section tone="raised" id="verification">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
          <div className="lg:col-span-4">
            <Eyebrow>{v.eyebrow}</Eyebrow>
          </div>

          <div className="lg:col-span-8 max-w-[46rem]">
            <SectionTitle className="mb-10 sm:mb-14">{v.title}</SectionTitle>
            <Body lead delay={140} className="mb-8">
              {v.body1}
            </Body>
            <Body delay={220}>{v.body2}</Body>
          </div>
        </div>

        {/* Three commitments — numbered, restrained */}
        <ol className="mt-24 sm:mt-32 grid md:grid-cols-3 gap-y-14 gap-x-12 list-none p-0">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 120}>
              <span
                className="type-eyebrow text-[#c9a468]/60 block mb-6"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif-display text-[1.375rem] text-[#f2ede6] mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="font-serif-body type-body text-[#f2ede6]/55">
                {p.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
