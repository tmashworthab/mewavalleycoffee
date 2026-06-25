"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../lib/language";

export default function HomeHero() {
  const { t } = useLanguage();
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-40">
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
        style={{ background: "radial-gradient(ellipse at center 60%, transparent 48%, rgba(28,24,20,0.6) 88%, rgba(28,24,20,0.85) 100%)" }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1c1814)" }}
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

        {/* Logo mark */}
        <div className={a("flex justify-center mb-6")} {...d(220)}>
          <Image src="/logo.svg" alt="Mewa Valley Coffee" width={110} height={110} unoptimized />
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
          <p className="text-lg md:text-xl text-[#f5f0ea]/70 max-w-2xl mx-auto leading-relaxed mb-4 font-light">
            {t.hero.tagline}
          </p>
          <p className="text-sm md:text-base text-[#f5f0ea]/50 max-w-xl mx-auto leading-relaxed font-light">
            {t.hero.body}
          </p>
        </div>
      </div>

    </section>
  );
}
