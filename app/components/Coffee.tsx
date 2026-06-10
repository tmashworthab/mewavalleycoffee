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
  {
    icon: "🍫",
    label: "Chocolate",
    desc: "Deep, dark cocoa undertones - rich and lingering on the finish.",
    intensity: 90,
  },
  {
    icon: "🌿",
    label: "Vanilla",
    desc: "Subtle, sweet vanilla notes woven through the cup.",
    intensity: 75,
  },
  {
    icon: "🌰",
    label: "Nutty",
    desc: "A delicious nutty finish that grounds every sip.",
    intensity: 85,
  },
  {
    icon: "✨",
    label: "Smooth",
    desc: "Exceptionally clean mouthfeel - almost no bitterness.",
    intensity: 95,
  },
];

const roasts = [
  {
    name: "Espresso Roast",
    batch: "First lots arriving after July 2026 sourcing trip",
    desc: "Our flagship dark roast. Full-bodied and intense, perfect for espresso machines and moka pots. Brings out the deepest chocolate notes.",
    grind: "Fine",
    process: "Washed",
    active: true,
  },
  {
    name: "Filter Roast",
    batch: "Sample lots pending confirmation",
    desc: "A medium roast that lets the floral and fruit notes shine. Ideal for pour-over, drip, and French press brewing methods.",
    grind: "Medium-Coarse",
    process: "Natural",
    active: false,
  },
  {
    name: "Whole Bean",
    batch: "Sample lots pending confirmation",
    desc: "Unground for maximum freshness. Our single-origin beans at peak quality - grind to your preferred method right before brewing.",
    grind: "Your choice",
    process: "Honey",
    active: false,
  },
];

export default function Coffee() {
  const { ref, inView } = useInView();
  const [activeRoast, setActiveRoast] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      setTimeout(() => setAnimated(true), 600);
    }
  }, [inView, animated]);

  return (
    <section id="coffee" className="relative py-32 px-6 overflow-hidden">
      {/* Dark section bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d0906 0%, #130b07 50%, #0d0906 100%)",
        }}
      />

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c49b64]/30 to-transparent" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64] mb-4">
            Small Batch
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-[#f0e6d8] mb-6">
            The Coffee
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-[#f0e6d8]/50 max-w-xl mx-auto italic text-lg">
            &ldquo;Exceptionally smooth and aromatic - distinctive flavours of chocolate and vanilla,
            with a delicious nutty finish.&rdquo;
          </p>
        </div>

        {/* Tasting notes */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {tasting.map((note, i) => (
            <div
              key={note.label}
              className="card-hover relative p-6 border border-[#c49b64]/10 bg-[#1a0d06]/50 backdrop-blur-sm"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-4">{note.icon}</div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-[#f0e6d8] mb-2">
                {note.label}
              </h4>
              <p className="text-xs text-[#f0e6d8]/40 leading-relaxed mb-4">
                {note.desc}
              </p>
              {/* Intensity bar */}
              <div className="h-px bg-[#c49b64]/10 w-full">
                <div
                  className="h-px bg-gradient-to-r from-[#c49b64] to-[#d4b07a] transition-all duration-1000"
                  style={{ width: animated ? `${note.intensity}%` : "0%" }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-[#f0e6d8]/20 tracking-widest uppercase">Intensity</span>
                <span className="text-[9px] text-[#c49b64]/60">{note.intensity}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Roast selector */}
        <div
          className={`transition-all duration-1000 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-center text-[10px] tracking-[0.4em] uppercase text-[#c49b64] mb-8">
            Select Your Roast
          </p>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {roasts.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setActiveRoast(i)}
                className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeRoast === i
                    ? "bg-[#c49b64] text-[#0d0906] border-[#c49b64] font-bold"
                    : "border-[#c49b64]/20 text-[#f0e6d8]/50 hover:border-[#c49b64]/50 hover:text-[#f0e6d8]"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Roast detail card */}
          <div className="max-w-3xl mx-auto">
            {roasts.map((r, i) => (
              <div
                key={r.name}
                className={`transition-all duration-500 ${
                  activeRoast === i
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none absolute"
                }`}
                style={{ display: activeRoast === i ? "block" : "none" }}
              >
                <div className="border border-[#c49b64]/15 bg-[#1a0d06]/50 p-8 md:p-12">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-[#c49b64] mb-2">
                        {r.batch}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-[#f0e6d8]">
                        {r.name}
                      </h3>
                    </div>
                    {/* Coffee bean icon */}
                    <svg width="56" height="40" viewBox="0 0 100 60" fill="none" opacity="0.5">
                      <ellipse cx="50" cy="30" rx="45" ry="25" fill="#8b4513" />
                      <path d="M50 8 Q70 30 50 52 Q30 30 50 8Z" fill="#6b3410" opacity="0.6" />
                    </svg>
                  </div>

                  <p className="text-[#f0e6d8]/60 leading-relaxed mb-8">{r.desc}</p>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#c49b64]/10">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/50 mb-1">
                        Grind
                      </p>
                      <p className="text-sm text-[#f0e6d8]/80 font-medium">{r.grind}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/50 mb-1">
                        Process
                      </p>
                      <p className="text-sm text-[#f0e6d8]/80 font-medium">{r.process}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/50 mb-1">
                        Origin
                      </p>
                      <p className="text-sm text-[#f0e6d8]/80 font-medium">Nepal Hills</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="#order"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-[#c49b64] text-[#0d0906] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#d4b07a] transition-colors duration-300"
                    >
                      Order {r.name}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
