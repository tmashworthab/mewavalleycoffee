"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Story() {
  const { ref, inView } = useInView();

  return (
    <section id="story" className="bg-[#f0ebe3] border-t-2 border-[#1a1a1a]">

      {/* Section header bar */}
      <div className="border-b-2 border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs tracking-[0.4em] uppercase font-black text-[#1a1a1a]">Our Story</p>
          <p className="text-xs tracking-[0.4em] uppercase font-bold text-[#6b6560]">Est. Nepal</p>
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 border-b-2 border-[#1a1a1a]">

          {/* Left: big headline */}
          <div className={`py-16 md:border-r-2 border-[#1a1a1a] md:pr-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-[#1a1a1a] mb-8">
              WHERE<br />
              CLOUDS<br />
              MEET<br />
              <span className="text-[#c8271a]">COFFEE</span>
            </h2>
            <div className="w-12 h-1 bg-[#c8271a] mb-8" />
            <p className="text-sm leading-relaxed text-[#6b6560] max-w-sm font-medium">
              Nestled in the ancient valleys of Nepal, our beans are sourced from small-scale
              farmers who have cultivated these lands for generations. The unique microclimate -
              cool mountain air, rich soil, and monsoon rainfall - creates growing conditions
              unlike anywhere else on Earth.
            </p>
          </div>

          {/* Right: stats + text */}
          <div className={`py-16 md:pl-12 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Big stat */}
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase font-black text-[#c8271a] mb-2">Altitude</p>
              <p className="text-7xl font-black text-[#1a1a1a] leading-none">2K<span className="text-[#c8271a]">-</span>5K</p>
              <p className="text-sm font-bold text-[#6b6560] tracking-widest uppercase mt-1">Feet Above Sea Level</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { num: "100%", label: "Arabica Beans" },
                { num: "Direct", label: "Trade Sourcing" },
                { num: "Small", label: "Batch Roasted" },
                { num: "Hand", label: "Picked Cherries" },
              ].map((s) => (
                <div key={s.label} className="border-l-4 border-[#c8271a] pl-4">
                  <p className="text-2xl font-black text-[#1a1a1a] leading-none">{s.num}</p>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#6b6560] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-[#6b6560] font-medium">
              We work directly with local farming communities, ensuring fair wages
              and sustainable practices. Every bag you purchase supports a family
              in the hills of Nepal.
            </p>
          </div>
        </div>

        {/* Pull quote */}
        <div className={`py-16 text-center transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-3xl md:text-4xl font-black uppercase text-[#1a1a1a] leading-tight max-w-3xl mx-auto">
            "STRONG FLAVORS, RICH AROMA -<br />
            <span className="text-[#c8271a]">COFFEE THAT FUELS YOUR PASSION"</span>
          </p>
        </div>
      </div>
    </section>
  );
}
