import Link from "next/link";
import Reveal from "./Reveal";

const navLinks = [
  { label: "For Roasters", href: "/for-roasters" },
  { label: "Origin",       href: "/origin" },
  { label: "Sample Lots",  href: "/sample-lots" },
  { label: "Our Trip",     href: "/our-trip" },
  { label: "Contact",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#d4a96a]/10 py-16 px-6">
      <Reveal>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.4em] text-[#d4a96a] uppercase">Mewa Valley</p>
              <p className="text-2xl font-black tracking-widest text-[#f5f0ea]">COFFEE</p>
            </div>
            <p className="text-xs text-[#f5f0ea]/30 leading-relaxed max-w-xs">
              Building direct sourcing relationships with Nepali producers and cooperatives.
              First lots arriving after July 2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a96a]/50 mb-4">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-[#f5f0ea]/40 hover:text-[#d4a96a] transition-colors tracking-widest uppercase"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a96a]/50 mb-4">Contact</p>
            <p className="text-xs text-[#f5f0ea]/40 leading-relaxed">
              hello@mewavalleycoffee.com
              <br /><br />
              Roaster enquiries, sample requests,
              <br />and wholesale - use the contact form.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#d4a96a]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0ea]/20">
            © {new Date().getFullYear()} Mewa Valley Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <svg width="28" height="20" viewBox="0 0 100 60" fill="none" opacity="0.3">
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="#d4a96a" />
              <path d="M50 8 Q70 30 50 52 Q30 30 50 8Z" fill="#a07a50" opacity="0.6" />
            </svg>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0ea]/20">
              Nepal · Est. 2024
            </span>
          </div>
        </div>
      </div>
      </Reveal>
    </footer>
  );
}
