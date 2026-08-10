"use client";
import Image from "next/image";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useContent } from "../lib/locale-context";
import { formatClasses } from "../lib/format";
import { PhotoBreak, Hairline } from "./home/primitives";
import { CONTAINER, Grid, COL } from "./Grid";
import farmhouse from "../media/nepal-farmhouse.jpg";
import valley from "../media/nepal-valley.jpg";

export default function AboutContent() {
  const { c, t } = useContent();
  const a = c.about;

  const para = (ck: string, cls: string, delay = 0) => (
    <Reveal delay={delay}>
      <p
        className={`${cls} ${formatClasses(ck)}`}
        data-ck={ck}
        data-ck-role="body"
        data-ck-multiline="true"
      >
        {t(ck)}
      </p>
    </Reveal>
  );

  const lead = "font-serif-body type-lead text-[#f2ede6]/85";
  const body = "font-serif-body type-body text-[#f2ede6]/65";

  return (
    <>
      <PageHero eyebrowCk="about.eyebrow" titleCk="about.title" />

      <section className="pb-24 sm:pb-32">
        <div className={CONTAINER}>
          <Grid>
            <div className={COL.text}>
              {para("about.aboutBody1", `${lead} mb-8`)}
              {para("about.aboutBody2", body, 110)}
            </div>
          </Grid>
        </div>
      </section>

      <PhotoBreak src={valley} altCk="about.hillAlt" height="mid" />

      <section className="py-28 sm:py-36">
        <div className={CONTAINER}>
          <Grid gapY="gap-y-16">
            <div className={COL.text}>
              {para("about.sourcingBody1", `${lead} mb-8`)}
              {para("about.sourcingBody2", `${body} mb-8`, 110)}
              {para("about.sourcingBody3", body, 190)}
            </div>

          <Reveal variant="mask" delay={80} className={COL.full}>
            <div className="relative w-full">
              <Image
                src="/nepal-sourcing-map.png"
                alt={a.mapAlt}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="w-full h-auto"
              />
            </div>
          </Reveal>

          <div className={`${COL.text} mt-4`}>
            <Hairline />
            <Reveal delay={80}>
              <p
                className={`font-serif-display type-subtitle text-[#f2ede6]/90 pt-12 text-balance ${formatClasses("about.sourcingBody4")}`}
                data-ck="about.sourcingBody4"
                data-ck-role="title"
              >
                {a.sourcingBody4}
              </p>
            </Reveal>
          </div>
          </Grid>
        </div>
      </section>

      <PhotoBreak src={farmhouse} altCk="about.hillAlt" height="mid" position="object-[center_40%]" />
    </>
  );
}
