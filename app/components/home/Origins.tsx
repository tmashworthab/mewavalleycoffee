"use client";
import Image from "next/image";
import { useLanguage } from "../../lib/language";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body } from "./primitives";

export default function Origins() {
  const { t } = useLanguage();
  const m = t.map;

  return (
    <Section id="origins">
      <div className="max-w-[76rem] mx-auto">
        <div className="max-w-[42rem] mb-16 sm:mb-20">
          <Eyebrow className="mb-8">{m.eyebrow}</Eyebrow>
          <SectionTitle className="mb-8">{m.title}</SectionTitle>
          <Body delay={160}>{m.body}</Body>
        </div>

        <Reveal variant="mask" delay={120}>
          <div className="relative w-full">
            <Image
              src="/nepal-sourcing-map.png"
              alt={m.alt}
              width={1200}
              height={900}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-auto"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
