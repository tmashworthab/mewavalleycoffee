"use client";
import Image from "next/image";
import { useContent } from "../../lib/locale-context";
import Reveal from "../Reveal";
import { Section, Eyebrow, SectionTitle, Body } from "./primitives";
import { Grid, COL } from "../Grid";

export default function Origins() {
  const { c } = useContent();
  return (
    <Section id="origins">
      <Grid gapY="gap-y-16">
        <div className={COL.text}>
          <Eyebrow ck="map.eyebrow" className="mb-8" />
          <SectionTitle ck="map.title" className="mb-8" />
          <Body ck="map.body" delay={160} />
        </div>

        <Reveal variant="mask" delay={120} className={COL.full}>
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
      </Grid>
    </Section>
  );
}
