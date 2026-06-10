"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#f0ebe3] flex flex-col overflow-hidden pt-24">

      {/* Top info bar */}
      <div className="border-b-2 border-[#1a1a1a] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Single Origin</span>
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Mewa Valley Coffee</span>
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Nepal Hills</span>
        </div>
      </div>

      {/* Main hero layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-0 items-stretch">

        {/* Left: giant type */}
        <div className="flex flex-col justify-center py-12 md:py-0 md:border-r-2 border-[#1a1a1a] md:pr-12">
          <p className="text-[10px] tracking-[0.6em] uppercase font-black text-[#c8271a] mb-4">
            Small Batch · No. 39
          </p>

          <h1 className="hero-title text-[clamp(4rem,12vw,8rem)] font-black uppercase leading-[0.88] tracking-tight text-[#1a1a1a] mb-8">
            BOLD<br />
            <span className="text-[#c8271a]">&</span><br />
            BREWED
          </h1>

          <div className="w-12 h-1 bg-[#c8271a] mb-8" />

          <p className="text-sm leading-relaxed text-[#6b6560] max-w-sm mb-10 font-medium">
            Grown between 2,000 and 5,000 feet in the ancient hills of Nepal.
            Exceptionally smooth - rich chocolate and vanilla with a nutty finish.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#order"
              className="px-8 py-4 bg-[#c8271a] text-[#f0ebe3] text-xs tracking-[0.3em] uppercase font-black hover:bg-[#a81f15] transition-colors"
            >
              Shop Now
            </a>
            <a
              href="#story"
              className="px-8 py-4 border-2 border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase font-black hover:bg-[#1a1a1a] hover:text-[#f0ebe3] transition-colors"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Right: visual panel */}
        <div className="relative flex flex-col justify-end items-center pb-0 pt-8 md:pt-0 md:pl-12">

          {/* Large decorative text behind */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              className="text-[clamp(8rem,22vw,18rem)] font-black uppercase leading-none text-[#1a1a1a]/5 tracking-tighter"
            >
              NEPAL
            </span>
          </div>

          {/* Coffee cup illustration (SVG) */}
          <div className="relative z-10 w-full max-w-sm mx-auto">
            <svg viewBox="0 0 320 400" className="w-full drop-shadow-2xl" fill="none">
              {/* Tray */}
              <rect x="30" y="330" width="260" height="50" rx="16" fill="#e8e0d4" stroke="#1a1a1a" strokeWidth="2.5"/>

              {/* Left glass (iced latte) */}
              <g>
                <rect x="60" y="160" width="80" height="170" rx="8" fill="#f5f0ea" stroke="#1a1a1a" strokeWidth="2.5"/>
                {/* milk layer */}
                <rect x="62" y="250" width="76" height="78" rx="0 0 6 6" fill="#e8cfa8"/>
                {/* coffee layer */}
                <rect x="62" y="200" width="76" height="55" fill="#8b5c2a" opacity="0.85"/>
                {/* foam top */}
                <ellipse cx="100" cy="200" rx="38" ry="8" fill="#c8a070" opacity="0.7"/>
                {/* ice cubes */}
                <rect x="72" y="215" width="20" height="20" rx="3" fill="#f0ebe3" opacity="0.6" stroke="#1a1a1a" strokeWidth="1"/>
                <rect x="100" y="225" width="18" height="18" rx="3" fill="#f0ebe3" opacity="0.6" stroke="#1a1a1a" strokeWidth="1"/>
                <rect x="80" y="240" width="22" height="16" rx="3" fill="#f0ebe3" opacity="0.5" stroke="#1a1a1a" strokeWidth="1"/>
              </g>

              {/* Right glass (black iced) */}
              <g>
                <rect x="180" y="140" width="80" height="190" rx="8" fill="#f5f0ea" stroke="#1a1a1a" strokeWidth="2.5"/>
                {/* dark coffee */}
                <rect x="182" y="200" width="76" height="128" rx="0 0 6 6" fill="#2a1a0a" opacity="0.88"/>
                {/* milk swirl on top */}
                <ellipse cx="220" cy="200" rx="38" ry="10" fill="#c8a070" opacity="0.5"/>
                <path d="M200 195 Q220 188 240 196" stroke="#f0ebe3" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                {/* ice cubes */}
                <rect x="190" y="215" width="22" height="22" rx="3" fill="#f0ebe3" opacity="0.15" stroke="#f0ebe3" strokeWidth="1"/>
                <rect x="220" y="230" width="20" height="20" rx="3" fill="#f0ebe3" opacity="0.15" stroke="#f0ebe3" strokeWidth="1"/>
                <rect x="195" y="250" width="25" height="18" rx="3" fill="#f0ebe3" opacity="0.1" stroke="#f0ebe3" strokeWidth="1"/>
              </g>

              {/* Steam lines above left */}
              <path d="M90 155 Q95 140 90 125" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
              <path d="M105 150 Q110 135 105 120" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>

              {/* Label sticker on left glass */}
              <rect x="65" y="170" width="70" height="22" rx="3" fill="#c8271a"/>
              <text x="100" y="184" textAnchor="middle" fill="#f0ebe3" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="Arial">MEWA VALLEY</text>
            </svg>
          </div>

          {/* Bottom label */}
          <div className="relative z-10 w-full border-t-2 border-[#1a1a1a] mt-4 py-4 flex justify-between items-center">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Altitude</p>
              <p className="text-sm font-black text-[#1a1a1a]">2,000 - 5,000 ft</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Process</p>
              <p className="text-sm font-black text-[#1a1a1a]">Washed</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#6b6560]">Origin</p>
              <p className="text-sm font-black text-[#1a1a1a]">Nepal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="border-t-2 border-b-2 border-[#1a1a1a] bg-[#c8271a] py-3 overflow-hidden mt-auto">
        <div className="marquee-track flex gap-0 whitespace-nowrap w-max">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[#f0ebe3] text-xs font-black tracking-[0.4em] uppercase px-8">
              Single Origin Nepal &nbsp;·&nbsp; Small Batch &nbsp;·&nbsp; Arabica &nbsp;·&nbsp; Direct Trade &nbsp;·&nbsp; 2000-5000ft &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
