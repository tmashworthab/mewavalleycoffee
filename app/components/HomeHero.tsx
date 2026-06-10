"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tr = "transition-all duration-700 ease-spring";
  const vis = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  // Returns className string with optional extra classes
  const a = (extra = "") => `${tr} ${vis} ${extra}`.trim();
  // Returns style prop for transition delay
  const d = (ms: number) => ({ style: { transitionDelay: `${ms}ms` } as React.CSSProperties });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 70%, #4d2a12 0%, transparent 55%),
            radial-gradient(ellipse at 70% 30%, #3a2010 0%, transparent 50%),
            linear-gradient(135deg, #1c1814 0%, #2a1e14 40%, #1e1a15 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(28,24,20,0.75) 100%)" }}
      />
      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4a96a 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-32 md:pt-24">

        {/* Badge */}
        <div className={a("hidden sm:inline-flex items-center gap-3 mb-14")} {...d(100)}>
          <span className="h-px w-12 bg-[#d4a96a]/50" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] font-medium">
            Single Origin · Nepal
          </span>
          <span className="h-px w-12 bg-[#d4a96a]/50" />
        </div>

        {/* Mountain mark */}
        <div className={a("flex justify-center mb-6")} {...d(220)}>
          <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
            <polyline points="2,38 22,8 32,22 42,8 62,38" stroke="#d4a96a" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            <circle cx="32" cy="18" r="4" fill="none" stroke="#d4a96a" strokeWidth="1" />
            <path d="M30 18 Q32 14 34 18" stroke="#d4a96a" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        {/* Title */}
        <div className={a()} {...d(340)}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase leading-none mb-4">
            <span className="text-[#d4a96a]">MEWA</span>
            <br />
            <span className="text-[#f5f0ea]">VALLEY</span>
          </h1>
          <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-[#d4a96a]/80 mb-8 font-medium">Coffee</p>
        </div>

        {/* Divider */}
        <div className={a("flex items-center justify-center gap-4 mb-8")} {...d(480)}>
          <span className="h-px w-16 bg-[#d4a96a]/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2" fill="#d4a96a" opacity="0.7" />
            <circle cx="8" cy="8" r="6" stroke="#d4a96a" strokeWidth="0.5" opacity="0.4" />
          </svg>
          <span className="h-px w-16 bg-[#d4a96a]/30" />
        </div>

        {/* Body text */}
        <div className={a()} {...d(580)}>
          <p className="text-lg md:text-xl text-[#f5f0ea]/70 max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-4 font-light">
            Mewa Valley Coffee connects UK and European roasters with traceable Nepali coffee lots sourced through direct producer relationships.
          </p>
          <p className="hidden sm:block text-sm md:text-base text-[#f5f0ea]/50 max-w-xl mx-auto leading-relaxed mb-12 font-light">
            Building direct sourcing relationships with Nepali producers and cooperatives.
            First lots arriving after July 2026.
          </p>
        </div>

        {/* CTAs */}
        <div className={a("flex flex-col sm:flex-row items-center justify-center gap-4")} {...d(720)}>
          <Link
            href="/for-roasters"
            className="group px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300 flex items-center gap-3"
          >
            For Roasters
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 border border-[#f5f0ea]/20 text-[#f5f0ea]/60 text-xs tracking-[0.3em] uppercase hover:border-[#d4a96a]/50 hover:text-[#d4a96a] transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={a("absolute bottom-10 left-1/2 -translate-x-1/2")} {...d(920)}>
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#d4a96a]/30">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#d4a96a]/30">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
