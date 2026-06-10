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

const tasting = [
  { icon: "🍫", label: "Chocolate", desc: "Deep cocoa undertones, rich and lingering.", intensity: 90 },
  { icon: "🌿", label: "Vanilla",   desc: "Subtle sweet vanilla woven through the cup.", intensity: 75 },
  { icon: "🌰", label: "Nutty",     desc: "A delicious nutty finish that grounds every sip.", intensity: 85 },
  { icon: "✨", label: "Smooth",    desc: "Exceptionally clean - almost no bitterness.", intensity: 95 },
];

const roasts = [
  {
    name: "Espresso Roast",
    batch: "No. 39",
    desc: "Our flagship dark roast. Full-bodied and intense, perfect for espresso machines and moka pots.",
    grind: "Fine",
    process: "Washed",
    price: "£18",
  },
  {
    name: "Filter Roast",
    batch: "No. 37",
    desc: "A medium roast that lets the floral and fruit notes shine. Ideal for pour-over and French press.",
    grind: "Medium-Coarse",
    process: "Natural",
    price: "£17",
  },
  {
    name: "Whole Bean",
    batch: "No. 38",
    desc: "Unground for maximum freshness. Grind to your preferred method right before brewing.",
    grind: "Your choice",
    process: "Honey",
    price: "£30",
  },
];

export default function Coffee() {
  const { ref, inView } = useInView();
  const [activeRoast, setActiveRoast] = useState(0);
  const [barAnimated, setBarAnimated] = useState(false);

  useEffect(() => {
    if (inView && !barAnimated) setTimeout(() => setBarAnimated(true), 400);
  }, [inView, barAnimated]);

  return (
    <section id="coffee" className="bg-[#1a1a1a] border-t-2 border-[#1a1a1a]">

      {/* Header bar */}
      <div className="border-b-2 border-[#f0ebe3]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs tracking-[0.4em] uppercase font-black text-[#f0ebe3]">The Coffee</p>
          <p className="text-xs tracking-[0.4em] uppercase font-bold text-[#f0ebe3]/40">Small Batch · Nepal</p>
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 py-16">

        {/* Big quote */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-4xl md:text-5xl font-black uppercase text-[#f0ebe3] leading-tight max-w-3xl">
            EXCEPTIONALLY<br />
            SMOOTH <span className="text-[#c8271a]">&</span><br />
            AROMATIC
          </p>
        </div>

        {/* Tasting notes grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-[#f0ebe3]/10 mb-16 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {tasting.map((note, i) => (
            <div
              key={note.label}
              className={`p-8 ${i < 3 ? "border-r-2 border-[#f0ebe3]/10" : ""}`}
            >
              <div className="text-4xl mb-4">{note.icon}</div>
              <h4 className="text-sm font-black tracking-[0.2em] uppercase text-[#f0ebe3] mb-2">{note.label}</h4>
              <p className="text-xs text-[#f0ebe3]/40 leading-relaxed mb-6">{note.desc}</p>
              {/* Bar */}
              <div className="h-1 bg-[#f0ebe3]/10 w-full">
                <div
                  className="h-1 bg-[#c8271a] transition-all duration-1000"
                  style={{ width: barAnimated ? `${note.intensity}%` : "0%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] text-[#f0ebe3]/20 tracking-widest uppercase">Intensity</span>
                <span className="text-[9px] text-[#c8271a] font-bold">{note.intensity}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Roast selector */}
        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[10px] tracking-[0.5em] uppercase font-black text-[#c8271a] mb-6">Select Your Roast</p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-0 border-2 border-[#f0ebe3]/10 mb-0 w-fit">
            {roasts.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setActiveRoast(i)}
                className={`px-6 py-3 text-xs tracking-[0.2em] uppercase font-black transition-all duration-200 ${
                  activeRoast === i
                    ? "bg-[#c8271a] text-[#f0ebe3]"
                    : "text-[#f0ebe3]/40 hover:text-[#f0ebe3] hover:bg-[#f0ebe3]/5"
                } ${i > 0 ? "border-l-2 border-[#f0ebe3]/10" : ""}`}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {roasts.map((r, i) => (
            <div
              key={r.name}
              style={{ display: activeRoast === i ? "block" : "none" }}
              className="border-2 border-[#f0ebe3]/10 border-t-0 p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase font-black text-[#c8271a] mb-3">
                    Small Batch · {r.batch}
                  </p>
                  <h3 className="text-3xl font-black uppercase text-[#f0ebe3] mb-4">{r.name}</h3>
                  <p className="text-sm text-[#f0ebe3]/50 leading-relaxed mb-8">{r.desc}</p>
                  <a
                    href="#order"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-[#c8271a] text-[#f0ebe3] text-xs tracking-[0.3em] uppercase font-black hover:bg-[#a81f15] transition-colors"
                  >
                    Order {r.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: "Grind", val: r.grind },
                    { label: "Process", val: r.process },
                    { label: "Origin", val: "Nepal" },
                    { label: "Price", val: r.price },
                    { label: "Weight", val: "250g" },
                    { label: "Altitude", val: "2-5K ft" },
                  ].map((d) => (
                    <div key={d.label} className="border-t-2 border-[#f0ebe3]/10 pt-4">
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#f0ebe3]/30 mb-1">{d.label}</p>
                      <p className="text-sm font-black text-[#f0ebe3]">{d.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
