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

const facts = [
  { num: "01", title: "High Altitude", body: "Coffee grown above 2,000 feet develops more slowly, concentrating sugars and complex flavour compounds for a richer cup." },
  { num: "02", title: "Himalayan Climate", body: "Cool nights, warm days, and seasonal monsoon rainfall create ideal conditions for coffee cherries to thrive." },
  { num: "03", title: "Local Varieties", body: "Heritage Arabica varieties adapted over generations to Nepal's unique terroir - found nowhere else on Earth." },
  { num: "04", title: "Hand Picked", body: "Every cherry is hand-selected at peak ripeness. No machines. Just care and tradition passed down through families." },
];

export default function Origin() {
  const { ref, inView } = useInView();

  return (
    <section id="origin" className="bg-[#f0ebe3] border-t-2 border-[#1a1a1a]">

      {/* Header bar */}
      <div className="border-b-2 border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs tracking-[0.4em] uppercase font-black text-[#1a1a1a]">Origin</p>
          <p className="text-xs tracking-[0.4em] uppercase font-bold text-[#6b6560]">The Himalayas</p>
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 border-b-2 border-[#1a1a1a]">

          {/* Left: headline + map */}
          <div className={`py-16 md:border-r-2 border-[#1a1a1a] md:pr-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-[#1a1a1a] mb-8">
              BORN<br />IN<br />
              <span className="text-[#c8271a]">NEPAL</span>
            </h2>
            <div className="w-12 h-1 bg-[#c8271a] mb-8" />

            {/* Stylised map */}
            <div className="border-2 border-[#1a1a1a] p-6 bg-[#1a1a1a]">
              <svg viewBox="0 0 400 260" className="w-full">
                {/* Grid */}
                {[80,160,240,320].map((v,i) => (
                  <g key={i} opacity="0.08">
                    <line x1={v} y1="0" x2={v} y2="260" stroke="#f0ebe3" strokeWidth="0.5"/>
                    <line x1="0" y1={v*0.65} x2="400" y2={v*0.65} stroke="#f0ebe3" strokeWidth="0.5"/>
                  </g>
                ))}

                {/* Nepal silhouette */}
                <path
                  d="M60,110 L75,100 L100,95 L125,90 L145,88 L165,92 L185,86 L210,82 L230,86 L255,78 L280,84 L310,92 L335,100 L345,112 L340,128 L320,138 L300,132 L280,144 L255,148 L235,138 L210,144 L190,150 L165,144 L140,148 L115,140 L90,144 L70,136 Z"
                  fill="#c8271a"
                  opacity="0.9"
                />

                {/* Mountain silhouette */}
                <polygon points="100,115 120,75 140,115" fill="#f0ebe3" opacity="0.15"/>
                <polygon points="155,118 185,60 215,118" fill="#f0ebe3" opacity="0.2"/>
                <polygon points="240,112 268,55 296,112" fill="#f0ebe3" opacity="0.15"/>

                {/* Pin */}
                <circle cx="200" cy="115" r="7" fill="#f0ebe3"/>
                <circle cx="200" cy="115" r="14" fill="none" stroke="#f0ebe3" strokeWidth="1.5" opacity="0.4"/>
                <circle cx="200" cy="115" r="22" fill="none" stroke="#f0ebe3" strokeWidth="0.8" opacity="0.2"/>

                {/* Labels */}
                <text x="200" y="168" textAnchor="middle" fill="#f0ebe3" fontSize="9" fontWeight="900" letterSpacing="4" opacity="0.8" fontFamily="Arial">MEWA VALLEY</text>
                <text x="200" y="182" textAnchor="middle" fill="#f0ebe3" fontSize="7" letterSpacing="2" opacity="0.35" fontFamily="Arial">27.7°N · 85.3°E</text>

                {/* Compass */}
                <g transform="translate(360,30)" opacity="0.5">
                  <line x1="0" y1="-14" x2="0" y2="14" stroke="#f0ebe3" strokeWidth="1"/>
                  <line x1="-14" y1="0" x2="14" y2="0" stroke="#f0ebe3" strokeWidth="1"/>
                  <polygon points="0,-14 -3,-6 3,-6" fill="#c8271a"/>
                  <text x="0" y="-16" textAnchor="middle" fill="#f0ebe3" fontSize="8" fontFamily="Arial">N</text>
                </g>
              </svg>

              <div className="flex justify-between mt-4 pt-4 border-t border-[#f0ebe3]/10">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#f0ebe3]/30">Region</p>
                  <p className="text-sm font-black text-[#f0ebe3]">Himalayan Foothills</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#f0ebe3]/30">Altitude</p>
                  <p className="text-sm font-black text-[#f0ebe3]">2,000 - 5,000 ft</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: facts */}
          <div className={`py-16 md:pl-12 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-[10px] tracking-[0.5em] uppercase font-black text-[#c8271a] mb-8">Why Nepal?</p>
            <div className="space-y-0">
              {facts.map((f, i) => (
                <div
                  key={f.num}
                  className={`flex gap-6 py-8 ${i < facts.length - 1 ? "border-b-2 border-[#1a1a1a]" : ""}`}
                >
                  <span className="text-4xl font-black text-[#c8271a]/20 leading-none flex-shrink-0 w-12">{f.num}</span>
                  <div>
                    <h4 className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a] mb-2">{f.title}</h4>
                    <p className="text-sm text-[#6b6560] leading-relaxed font-medium">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
