"use client";
import { useEffect, useState } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const tr = "transition-all duration-700 ease-spring";
  const vis = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const a = `${tr} ${vis}`;

  return (
    <section className="relative pt-40 pb-16 px-6 border-b border-[#d4a96a]/15">
      <div className="max-w-4xl mx-auto">
        <p className={`${a} text-[10px] tracking-[0.5em] uppercase text-[#d4a96a]`} style={{ transitionDelay: "100ms" }}>
          {eyebrow}
        </p>
        <h1
          className={`${a} text-4xl md:text-6xl font-black tracking-widest uppercase text-[#f5f0ea] leading-none mb-6 mt-4`}
          style={{ transitionDelay: "220ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`${a} text-[#f5f0ea]/50 text-lg max-w-2xl leading-relaxed font-light`}
            style={{ transitionDelay: "380ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
