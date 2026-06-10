"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
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
    <section id="story" className="relative py-32 px-6 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #c49b64 0px,
            #c49b64 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64] mb-4">
            The Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-[#f0e6d8] mb-6">
            Our Story
          </h2>
          <div className="section-divider" />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <div
            className={`transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#c49b64]/20" />
              <div
                className="relative aspect-[4/5] flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a0d06 0%, #2d1508 50%, #1a0d06 100%)",
                }}
              >
                {/* Stylized mountain illustration */}
                <svg viewBox="0 0 400 500" className="w-full h-full p-12">
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d0906" />
                      <stop offset="100%" stopColor="#2d1508" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3d2010" />
                      <stop offset="100%" stopColor="#1a0d06" />
                    </linearGradient>
                    <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a2a15" />
                      <stop offset="100%" stopColor="#2d1508" />
                    </linearGradient>
                  </defs>

                  {/* Stars */}
                  {[
                    [60, 40], [120, 25], [200, 15], [280, 35], [340, 20],
                    [80, 70], [160, 55], [300, 60], [360, 80], [40, 90],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="1.5" fill="#c49b64" opacity={0.4 + (i % 3) * 0.2} />
                  ))}

                  {/* Moon */}
                  <circle cx="330" cy="50" r="18" fill="none" stroke="#c49b64" strokeWidth="1" opacity="0.5" />
                  <circle cx="336" cy="50" r="18" fill="#0d0906" />

                  {/* Far mountains */}
                  <polygon points="0,300 60,180 120,300" fill="url(#mountainGrad)" opacity="0.4" />
                  <polygon points="50,300 140,140 230,300" fill="url(#mountainGrad)" opacity="0.5" />
                  <polygon points="150,300 270,120 400,300" fill="url(#mountainGrad)" opacity="0.45" />
                  <polygon points="300,300 380,170 400,300" fill="url(#mountainGrad)" opacity="0.4" />

                  {/* Main mountain */}
                  <polygon points="0,380 200,100 400,380" fill="url(#mountainGrad2)" />

                  {/* Snow cap */}
                  <polygon points="170,145 200,100 230,145 215,155 185,155" fill="#f0e6d8" opacity="0.15" />

                  {/* Terraced fields */}
                  {[0, 1, 2, 3].map((i) => (
                    <path
                      key={i}
                      d={`M${80 + i * 20},${300 + i * 25} Q200,${290 + i * 22} ${320 - i * 20},${300 + i * 25}`}
                      stroke="#c49b64"
                      strokeWidth="0.8"
                      fill="none"
                      opacity="0.2"
                    />
                  ))}

                  {/* Coffee plants silhouette */}
                  {[100, 140, 180, 220, 260, 300].map((x, i) => (
                    <g key={i} transform={`translate(${x}, ${380 - i * 5})`}>
                      <ellipse cx="0" cy="-8" rx="10" ry="6" fill="#3d2010" opacity="0.8" />
                      <rect x="-1" y="-8" width="2" height="20" fill="#2d1508" opacity="0.8" />
                    </g>
                  ))}

                  {/* Ground */}
                  <rect x="0" y="380" width="400" height="120" fill="#1a0d06" />

                  {/* Text overlay */}
                  <text x="200" y="460" textAnchor="middle" fill="#c49b64" fontSize="11" letterSpacing="5" opacity="0.6" fontFamily="Arial">
                    NEPAL · 2000-5000 FT
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div
            className={`transition-all duration-1000 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c49b64] mb-6">
              Est. In The Himalayas
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-[#f0e6d8] leading-tight mb-6">
              Where the clouds meet the coffee trees
            </h3>
            <p className="text-[#f0e6d8]/60 leading-relaxed mb-6">
              Nestled in the ancient valleys of Nepal, Mewa Valley Coffee sources its beans
              from small-scale farmers cultivating some of the Himalayan region's most promising
              highland growing conditions. The unique microclimate, with cool mountain air,
              mineral-rich soils, and abundant rainfall, creates exceptional conditions for
              specialty coffee at high altitude.
            </p>
            <p className="text-[#f0e6d8]/60 leading-relaxed mb-8">
              We are developing relationships with small-scale producers in Nepal's
              coffee-growing hills, with a focus on transparency, lot-level traceability
              and long-term partnerships. Our first sourcing trip will document producer
              details, processing methods, harvest information and sample quality for
              roasters interested in Nepali coffee.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#c49b64]/15">
              {[
                { num: "2-5K", label: "Feet altitude" },
                { num: "100%", label: "Arabica beans" },
                { num: "Nepal", label: "Origin" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-[#c49b64] mb-1">{stat.num}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#f0e6d8]/40">
                    {stat.label}
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
