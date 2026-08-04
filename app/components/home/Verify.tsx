"use client";
import { content } from "../../lib/content";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body } from "./primitives";

export default function Verify() {
  const v = content.verify;

  const points = [
    { titleCk: "verify.pointOneTitle", bodyCk: "verify.pointOneBody", title: v.pointOneTitle, body: v.pointOneBody },
    { titleCk: "verify.pointTwoTitle", bodyCk: "verify.pointTwoBody", title: v.pointTwoTitle, body: v.pointTwoBody },
    { titleCk: "verify.pointThreeTitle", bodyCk: "verify.pointThreeBody", title: v.pointThreeTitle, body: v.pointThreeBody },
  ];

  return (
    <Section tone="raised" id="verification">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-16">
          <div className="lg:col-span-4">
            <Eyebrow ck="verify.eyebrow" />
          </div>

          <div className="lg:col-span-8 max-w-[46rem]">
            <SectionTitle ck="verify.title" className="mb-10 sm:mb-14" />
            <Body ck="verify.body1" lead delay={140} className="mb-8" />
            <Body ck="verify.body2" delay={220} />
          </div>
        </div>

        <ol className="mt-24 sm:mt-32 grid md:grid-cols-3 gap-y-14 gap-x-12 list-none p-0">
          {points.map((p, i) => (
            <Reveal as="li" key={p.titleCk} delay={i * 120}>
              <span className="type-eyebrow text-[#c9a468]/60 block mb-6" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-serif-display text-[1.375rem] text-[#f2ede6] mb-3 leading-snug"
                data-ck={p.titleCk}
              >
                {p.title}
              </h3>
              <p className="font-serif-body type-body text-[#f2ede6]/55" data-ck={p.bodyCk}>
                {p.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
