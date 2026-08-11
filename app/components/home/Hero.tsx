"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useContent } from "../../lib/locale-context";
import { formatClasses } from "../../lib/format";
import RichText, { isRich } from "../RichText";
import ridge from "../../media/nepal-ridge.jpg";
import { CONTAINER, Grid, COL } from "../Grid";

export default function Hero() {
  const { c, t } = useContent();
  const h = c.hero;
  const [mounted, setMounted] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Gentle parallax: the photograph drifts slower than the page.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setOffset(window.scrollY * 0.28);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rise = (delay: number) =>
    ({ transitionDelay: `${delay}ms` }) as React.CSSProperties;

  const riseClass = `transition-all duration-[1300ms] ease-out-expo ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
  }`;

  const intro = t("hero.intro");

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden grain">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <Image
            src={ridge}
            alt={h.alt}
            fill
            // This is the LCP element; `priority` is deprecated in Next 16.
            preload
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            placeholder="blur"
            className={`object-cover object-center transition-[transform,opacity] duration-[2200ms] ease-out-expo ${
              mounted ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Legibility scrims. Text now runs the full width of the frame, so the
          weight sits in a bottom fade rather than a one-sided wash. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,0.5) 0%, rgba(20,18,16,0.25) 30%, rgba(20,18,16,0.72) 62%, rgba(20,18,16,0.95) 100%)",
        }}
      />
      <div className="absolute inset-0 scrim-vignette pointer-events-none" />

      <div className={`relative z-10 ${CONTAINER} pb-28 sm:pb-36 lg:pb-44 pt-40`}>
        {/* Top-aligned: the intro is the taller column, and bottom-aligning the
            two left the headline sitting far below it. */}
        <Grid className="items-start" gapY="gap-y-10">
          {/* Left — the mark */}
          <div className={COL.half}>
            <p
              className={`type-eyebrow text-[#c9a468] mb-5 ${riseClass} ${formatClasses("hero.eyebrow")}`}
              style={rise(500)}
              data-ck="hero.eyebrow"
              data-ck-role="label"
            >
              {h.eyebrow}
            </p>

            <h1 className="font-serif-display type-hero text-[#f2ede6] text-balance">
              <span
                className={`block ${riseClass} ${formatClasses("hero.headline")}`}
                style={rise(650)}
                data-ck="hero.headline"
                data-ck-role="title"
              >
                {h.headline}
              </span>
              <span
                className={`block text-[#f2ede6]/70 ${riseClass} ${formatClasses("hero.sub")}`}
                style={rise(850)}
                data-ck="hero.sub"
                data-ck-role="title"
              >
                {h.sub}
              </span>
            </h1>
          </div>

          {/* Right — who we are */}
          <div className={`${COL.halfEnd} ${riseClass}`} style={rise(1000)}>
            <div
              className={`font-serif-body type-body text-[#f2ede6]/80 ${formatClasses("hero.intro")}`}
              data-ck="hero.intro"
              data-ck-role="body"
              data-ck-multiline="true"
              {...(isRich(intro) ? { "data-ck-raw": intro } : {})}
            >
              <RichText text={intro} />
            </div>
          </div>
        </Grid>

        <div
          className={`mt-12 sm:mt-14 flex items-center gap-4 ${riseClass}`}
          style={rise(1200)}
        >
          <span
            className={`type-eyebrow text-[#f2ede6]/55 ${formatClasses("hero.scroll")}`}
            data-ck="hero.scroll"
            data-ck-role="label"
          >
            {h.scroll}
          </span>
          <svg
            width="12"
            height="26"
            viewBox="0 0 12 26"
            fill="none"
            aria-hidden="true"
            className="animate-scroll-hint"
          >
            <path
              d="M6 0v24M1 19l5 5 5-5"
              stroke="#c9a468"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
