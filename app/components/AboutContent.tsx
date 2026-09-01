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
import backdrop from "../media/about-backdrop.jpg";
import buying from "../media/about-buying.jpg";
import jeep from "../media/about-jeep.jpg";
import village from "../media/about-village.jpg";
import walking from "../media/about-walking.jpg";

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

  /**
   * The photographs that run down the right of the page, in the order they are
   * met while scrolling. One list rather than markup scattered through the
   * page, so the order is a single readable thing and adding one is a line.
   */
  const photos = [
    { src: buying, alt: "about.photoBuyingAlt" },
    { src: jeep, alt: "about.photoJeepAlt" },
    { src: village, alt: "about.photoVillageAlt" },
    { src: walking, alt: "about.photoWalkingAlt" },
  ];

  /** A slice of that column, sitting beside one block of prose. */
  const rail = (from: number, to?: number) => (
    <div className={`${COL.railEnd} space-y-14 sm:space-y-20`}>
      {photos.slice(from, to).map((p, i) => (
        <Reveal key={p.alt} variant="mask" delay={i * 90}>
          <Image
            src={p.src}
            alt={t(p.alt)}
            sizes="(max-width: 1024px) 100vw, 24rem"
            className="w-full h-auto"
          />
        </Reveal>
      ))}
    </div>
  );

  return (
    <>
      {/* Page backdrop. Fixed rather than scrolling, so a single frame covers a
          long page without tiling or stretching, and scrimmed hard because body
          copy has to stay readable over it at AA. aria-hidden: it is decoration,
          and the page's own photographs carry the descriptions. */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Image
          src={backdrop}
          alt=""
          fill
          // Eager: it is the page's ground, visible from the first paint and at
          // every scroll position, so it must never be deferred.
          preload
          // 75 is the declared ordinary tier (85 is reserved for the hero); an
          // undeclared value would just be coerced anyway, and detail is
          // academic under an 80% scrim.
          quality={75}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        {/* 0.80 is the floor, not a taste call: measured against the brightest
            part of the photograph, body copy needs 0.75 and the gold eyebrows
            0.80 to stay at AA contrast. */}
        <div className="absolute inset-0 bg-[#141210]/80" />
        <div className="absolute inset-0 scrim-vignette" />
      </div>

      {/* Above the backdrop. A positive z-index on the content rather than a
          negative one on the image: body carries an opaque background, so
          anything behind it at -z would never be seen. */}
      <div className="relative z-10">
      <PageHero eyebrowCk="about.eyebrow" titleCk="about.title" />

      <section className="pb-24 sm:pb-32">
        <div className={CONTAINER}>
          <Grid>
            {/* The rail is taller than the prose, so the text pins beside it
                rather than leaving the left half empty as the photographs go
                past. Only from the two-up breakpoint; below it they stack. */}
            <div className={`${COL.text} lg:sticky lg:top-32 lg:self-start`}>
              {para("about.aboutBody1", `${lead} mb-8`)}
              {para("about.aboutBody2", body, 110)}
            </div>
            {rail(0, 2)}
          </Grid>
        </div>
      </section>

      <PhotoBreak src={valley} altCk="about.hillAlt" height="mid" />

      <section className="py-28 sm:py-36">
        <div className={CONTAINER}>
          <Grid gapY="gap-y-16">
            <div className={`${COL.text} lg:sticky lg:top-32 lg:self-start`}>
              {para("about.sourcingBody1", `${lead} mb-8`)}
              {para("about.sourcingBody2", `${body} mb-8`, 110)}
              {para("about.sourcingBody3", body, 190)}
            </div>
            {rail(2)}

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
      </div>
    </>
  );
}
