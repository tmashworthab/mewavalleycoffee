export default function Footer() {
  return (
    <footer className="relative border-t border-[#c49b64]/10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.4em] text-[#c49b64] uppercase">Mewa Valley</p>
              <p className="text-2xl font-black tracking-widest text-[#f0e6d8]">COFFEE</p>
            </div>
            <p className="text-xs text-[#f0e6d8]/30 leading-relaxed max-w-xs">
              Single-origin coffee imported from the ancient hills of Nepal.
              Small batches, exceptional quality.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c49b64]/50 mb-4">Navigate</p>
            <ul className="space-y-3">
              {["Our Story", "The Coffee", "Origin", "Order"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(" ", "")}`}
                    className="text-xs text-[#f0e6d8]/40 hover:text-[#c49b64] transition-colors tracking-widest uppercase"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c49b64]/50 mb-4">Contact</p>
            <p className="text-xs text-[#f0e6d8]/40 leading-relaxed">
              hello@mewavalleycoffee.com
              <br /><br />
              For wholesale and bulk orders,
              <br />
              use the order form above.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#c49b64]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#f0e6d8]/20">
            © {new Date().getFullYear()} Mewa Valley Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <svg width="28" height="20" viewBox="0 0 100 60" fill="none" opacity="0.3">
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="#c49b64" />
              <path d="M50 8 Q70 30 50 52 Q30 30 50 8Z" fill="#8b6a40" opacity="0.6" />
            </svg>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#f0e6d8]/20">
              Nepal · Est. 2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
