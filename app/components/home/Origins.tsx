"use client";
import Image from "next/image";
import { useContent } from "../../lib/locale-context";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body } from "./primitives";

export default function Origins() {
  const { c } = useContent();
  return (
    <Section id="origins">
      <div className="max-w-[76rem] mx-auto">
        <div className="max-w-[42rem] mb-16 sm:mb-20">
          <Eyebrow ck="map.eyebrow" className="mb-8" />
          <SectionTitle ck="map.title" className="mb-8" />
          <Body ck="map.body" delay={160} />
        </div>

        <Reveal variant="mask" delay={120}>
          <div className="relative w-full">
            <Image
              src="/nepal-sourcing-map.png"
              alt={c.map.alt}
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
