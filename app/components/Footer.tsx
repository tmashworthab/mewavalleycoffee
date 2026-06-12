import Link from "next/link";
import Image from "next/image";
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
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="" width={44} height={44} unoptimized style={{ opacity: 0.85 }} />
              <div>
                <p className="text-[10px] tracking-[0.4em] text-[#d4a96a] uppercase">Mewa Valley</p>
                <p className="text-2xl font-black tracking-widest text-[#f5f0ea]">COFFEE</p>
              </div>
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
        </div>
      </div>
      </Reveal>
    </footer>
  );
}
