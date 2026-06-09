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
  {
    num: "01",
    title: "High Altitude Growing",
    body: "Coffee grown above 2,000 feet develops more slowly, concentrating sugars and complex flavor compounds for a richer, more nuanced cup.",
  },
  {
    num: "02",
    title: "Himalayan Climate",
    body: "Cool nights and warm days, combined with the region's seasonal monsoon rainfall, create the ideal stress conditions for coffee cherries to thrive.",
  },
  {
    num: "03",
    title: "Local Varieties",
    body: "Our farmers cultivate heritage Arabica varieties adapted over generations to Nepal's unique terroir — varieties found nowhere else in the world.",
  },
  {
    num: "04",
    title: "Hand Picked",
    body: "Every cherry is hand-selected at peak ripeness. No machine harvesting. This care ensures only the finest fruit makes it into your cup.",
  },
];

export default function Origin() {
  const { ref, inView } = useInView();

  return (
    <section id="origin" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle warm bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(61,32,16,0.3) 0%, transparent 70%), #0d0906",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64] mb-4">
            The Terroir
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-[#f0e6d8] mb-6">
            Born in Nepal
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-[#f0e6d8]/50 max-w-lg mx-auto">
            Nepal sits at the eastern edge of the Himalayas — a land of extraordinary
            biodiversity and an emerging origin for truly exceptional coffee.
          </p>
        </div>

        {/* Map visual + facts */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Facts */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {facts.map((f, i) => (
              <div
                key={f.num}
                className={`flex gap-6 transition-all duration-700`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <span className="text-[#c49b64]/30 text-4xl font-black leading-none">
                    {f.num}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-[#f0e6d8] mb-2">
                    {f.title}
                  </h4>
                  <p className="text-[#f0e6d8]/50 text-sm leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stylized Nepal map / elevation illustration */}
          <div
            className={`transition-all duration-1000 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div
              className="relative aspect-square flex items-center justify-center border border-[#c49b64]/10 p-8"
              style={{ background: "linear-gradient(135deg, #130b07 0%, #1a0d06 100%)" }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c49b64" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#c49b64" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Glow */}
                <circle cx="200" cy="200" r="180" fill="url(#glowGrad)" />

                {/* Latitude/longitude grid */}
                {[80, 140, 200, 260, 320].map((v, i) => (
                  <g key={i} opacity="0.07">
                    <line x1={v} y1="40" x2={v} y2="360" stroke="#c49b64" strokeWidth="0.5" />
                    <line x1="40" y1={v} x2="360" y2={v} stroke="#c49b64" strokeWidth="0.5" />
                  </g>
                ))}

                {/* Concentric elevation rings */}
                {[160, 130, 100, 70, 40].map((r, i) => (
                  <circle
                    key={i}
                    cx="200"
                    cy="200"
                    r={r}
                    fill="none"
                    stroke="#c49b64"
                    strokeWidth="0.5"
                    opacity={0.1 + i * 0.05}
                    strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
                  />
                ))}

                {/* Nepal silhouette (simplified) */}
                <path
                  d="M80,190 L90,180 L110,175 L130,170 L150,165 L170,168 L190,162 L210,158 L230,162 L250,155 L270,160 L300,168 L320,175 L330,185 L325,200 L310,210 L295,205 L280,215 L260,218 L240,210 L220,215 L200,220 L180,215 L160,218 L140,212 L120,215 L100,210 L85,202 Z"
                  fill="#2d1508"
                  stroke="#c49b64"
                  strokeWidth="1"
                  opacity="0.8"
                />

                {/* Mountain peaks */}
                {[
                  { x: 190, y: 168, h: 18, label: "Annapurna" },
                  { x: 270, y: 158, h: 20, label: "Everest" },
                  { x: 150, y: 170, h: 14, label: "Dhaulagiri" },
                ].map((m) => (
                  <g key={m.label}>
                    <polygon
                      points={`${m.x - 10},${m.y + 5} ${m.x},${m.y - m.h} ${m.x + 10},${m.y + 5}`}
                      fill="#c49b64"
                      opacity="0.6"
                    />
                    <text
                      x={m.x}
                      y={m.y + 20}
                      textAnchor="middle"
                      fill="#c49b64"
                      fontSize="7"
                      opacity="0.5"
                      letterSpacing="1"
                    >
                      {m.label}
                    </text>
                  </g>
                ))}

                {/* Coffee region pin */}
                <circle cx="200" cy="195" r="6" fill="#c49b64" opacity="0.9" />
                <circle cx="200" cy="195" r="12" fill="none" stroke="#c49b64" strokeWidth="1" opacity="0.4" />
                <circle cx="200" cy="195" r="20" fill="none" stroke="#c49b64" strokeWidth="0.5" opacity="0.2" />

                {/* Label */}
                <text x="200" y="235" textAnchor="middle" fill="#c49b64" fontSize="9" letterSpacing="3" opacity="0.7">
                  MEWA VALLEY
                </text>
                <text x="200" y="248" textAnchor="middle" fill="#f0e6d8" fontSize="7" letterSpacing="2" opacity="0.3">
                  27.7°N · 85.3°E
                </text>

                {/* Compass rose */}
                <g transform="translate(340, 340)" opacity="0.4">
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#c49b64" strokeWidth="0.8" />
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#c49b64" strokeWidth="0.8" />
                  <polygon points="0,-16 -3,-8 3,-8" fill="#c49b64" />
                  <text x="0" y="-18" textAnchor="middle" fill="#c49b64" fontSize="7">N</text>
                </g>
              </svg>

              {/* Overlay text */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/50">Region</p>
                    <p className="text-sm font-bold text-[#f0e6d8]/80">Himalayan Foothills</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/50">Altitude</p>
                    <p className="text-sm font-bold text-[#f0e6d8]/80">2,000–5,000 ft</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote band */}
        <div
          className={`mt-24 py-12 border-y border-[#c49b64]/15 text-center transition-all duration-1000 delay-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64]/50 mb-4">
            Our Promise
          </p>
          <p className="text-xl md:text-2xl font-light italic text-[#f0e6d8]/70 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Every cup tells the story of a Nepali hillside, a farming family,
            and a tradition of extraordinary care.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
