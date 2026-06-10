"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        const y = window.scrollY * 0.4;
        parallaxRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image layer */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        {/* Deep coffee-toned gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, #3d1a08 0%, transparent 55%),
              radial-gradient(ellipse at 70% 30%, #2a1206 0%, transparent 50%),
              linear-gradient(135deg, #0d0906 0%, #1a0d06 40%, #0f0806 100%)
            `,
          }}
        />
        {/* Scattered bean shapes */}
        {[
          { top: "15%", left: "8%", size: 80, rotate: 30, opacity: 0.12 },
          { top: "70%", left: "5%", size: 60, rotate: -20, opacity: 0.08 },
          { top: "25%", right: "10%", size: 100, rotate: 50, opacity: 0.1 },
          { top: "60%", right: "8%", size: 70, rotate: -40, opacity: 0.09 },
          { top: "45%", left: "15%", size: 50, rotate: 15, opacity: 0.07 },
          { top: "80%", right: "20%", size: 90, rotate: 70, opacity: 0.08 },
          { top: "10%", left: "40%", size: 55, rotate: -10, opacity: 0.06 },
        ].map((b, i) => (
          <svg
            key={i}
            className={i % 2 === 0 ? "float-anim" : "float-anim-delay"}
            style={{
              position: "absolute",
              top: b.top,
              left: "left" in b ? b.left : undefined,
              right: "right" in b ? b.right : undefined,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              transform: `rotate(${b.rotate}deg)`,
            }}
            viewBox="0 0 100 60"
            fill="none"
          >
            <ellipse cx="50" cy="30" rx="45" ry="25" fill="#8b4513" />
            <path
              d="M50 8 Q70 30 50 52 Q30 30 50 8Z"
              fill="#6b3410"
              opacity="0.6"
            />
          </svg>
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(13,9,6,0.8) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="h-px w-12 bg-[#c49b64]/50" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64] font-medium">
            Single Origin · Nepal
          </span>
          <span className="h-px w-12 bg-[#c49b64]/50" />
        </div>

        {/* Mountain logo mark */}
        <div className="flex justify-center mb-6">
          <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
            <polyline
              points="2,38 22,8 32,22 42,8 62,38"
              stroke="#c49b64"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="32" cy="18" r="4" fill="none" stroke="#c49b64" strokeWidth="1" />
            <path d="M30 18 Q32 14 34 18" stroke="#c49b64" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        {/* Main title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase leading-none mb-4">
          <span className="shimmer-text">MEWA</span>
          <br />
          <span className="text-[#f0e6d8]">VALLEY</span>
        </h1>

        <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-[#c49b64]/80 mb-6 font-medium">
          Coffee
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-16 bg-[#c49b64]/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2" fill="#c49b64" opacity="0.7" />
            <circle cx="8" cy="8" r="6" stroke="#c49b64" strokeWidth="0.5" opacity="0.4" />
          </svg>
          <span className="h-px w-16 bg-[#c49b64]/30" />
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-[#f0e6d8]/60 max-w-xl mx-auto leading-relaxed mb-4 font-light">
          Mewa Valley Coffee connects UK and European roasters with traceable Nepali coffee lots sourced through direct producer relationships.
        </p>
        <p className="text-sm md:text-base text-[#f0e6d8]/50 max-w-xl mx-auto leading-relaxed mb-12 font-light">
          Mewa Valley Coffee is building direct sourcing relationships with Nepali producers
          and cooperatives. In July 2026, we will be visiting producers to document our first
          green coffee lots for UK and EU roasters.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#coffee"
            className="group px-10 py-4 bg-[#c49b64] text-[#0d0906] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#d4b07a] transition-all duration-300 flex items-center gap-3"
          >
            Explore Our Coffee
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#story"
            className="px-10 py-4 border border-[#f0e6d8]/20 text-[#f0e6d8]/60 text-xs tracking-[0.3em] uppercase hover:border-[#c49b64]/50 hover:text-[#c49b64] transition-all duration-300"
          >
            Our Story
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#f0e6d8]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c49b64] to-transparent" />
        </div>
      </div>
    </section>
  );
}
