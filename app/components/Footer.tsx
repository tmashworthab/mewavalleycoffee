export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t-2 border-[#1a1a1a]">

      {/* Top bar */}
      <div className="border-b-2 border-[#f0ebe3]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs tracking-[0.4em] uppercase font-black text-[#f0ebe3]">Mewa Valley Coffee</p>
          <p className="text-xs tracking-[0.4em] uppercase font-bold text-[#f0ebe3]/30">Nepal · Est. 2024</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#c8271a] font-bold mb-2">Mewa Valley</p>
          <p className="text-3xl font-black uppercase text-[#f0ebe3] mb-6">COFFEE</p>
          <p className="text-xs text-[#f0ebe3]/30 leading-relaxed font-medium max-w-xs">
            Single-origin coffee from the ancient hills of Nepal. Small batches, exceptional quality.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase font-black text-[#f0ebe3]/30 mb-6">Navigate</p>
          <ul className="space-y-3">
            {["Our Story", "The Coffee", "Origin", "Order"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(" ", "")}`}
                  className="text-xs tracking-[0.2em] uppercase font-black text-[#f0ebe3]/40 hover:text-[#c8271a] transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase font-black text-[#f0ebe3]/30 mb-6">Contact</p>
          <p className="text-xs text-[#f0ebe3]/40 leading-relaxed font-medium">
            hello@mewavalleycoffee.com
            <br /><br />
            For wholesale and bulk orders,
            <br />use the order form above.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t-2 border-[#f0ebe3]/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#f0ebe3]/20">
            © {new Date().getFullYear()} Mewa Valley Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#c8271a]" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#f0ebe3]/20">Single Origin Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
