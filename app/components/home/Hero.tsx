"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { content } from "../../lib/content";
import ridge from "../../media/nepal-ridge.jpg";

export default function Hero() {
  const h = content.hero;
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

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden grain">
      <div className="absolute inset-0 -z-10">
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

      {/* Legibility scrims. This frame is bright through the middle, so the
          text side needs its own horizontal wash on top of the bottom fade. */}
      <div className="absolute inset-0 scrim-bottom pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(20,18,16,0.88) 0%, rgba(20,18,16,0.7) 28%, rgba(20,18,16,0.28) 58%, rgba(20,18,16,0.05) 100%)",
        }}
      />
      <div className="absolute inset-0 scrim-vignette pointer-events-none" />

      <div className="relative w-full max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-24 lg:pb-32 pt-40">
        <p
          className={`type-eyebrow text-[#c9a468] mb-6 sm:mb-8 ${riseClass}`}
          style={rise(500)}
          data-ck="hero.eyebrow"
        >
          {h.eyebrow}
        </p>

        <h1 className="font-serif-display type-display text-[#f2ede6] max-w-[16ch] text-balance">
          <span className={`block ${riseClass}`} style={rise(650)} data-ck="hero.headline">
            {h.headline}
          </span>
          <span
            className={`block text-[#f2ede6]/70 ${riseClass}`}
            style={rise(850)}
            data-ck="hero.sub"
          >
            {h.sub}
          </span>
        </h1>

        <div className={`mt-12 sm:mt-16 flex items-center gap-4 ${riseClass}`} style={rise(1100)}>
          <span className="type-eyebrow text-[#f2ede6]/55" data-ck="hero.scroll">
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
