"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "For Roasters", href: "/for-roasters" },
  { label: "Origin", href: "/origin" },
  { label: "Sample Lots", href: "/sample-lots" },
  { label: "Our Trip", href: "/our-trip" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0906]/95 backdrop-blur-md border-b border-[#c49b64]/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-[10px] tracking-[0.4em] text-[#c49b64] uppercase">Mewa Valley</span>
          <span className="text-xl font-bold tracking-widest text-[#f0e6d8] group-hover:text-[#c49b64] transition-colors duration-300">
            COFFEE
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-14">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === l.href
                    ? "text-[#c49b64]"
                    : "text-[#f0e6d8]/70 hover:text-[#c49b64]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-[#c49b64]/50 text-[#c49b64] text-xs tracking-[0.2em] uppercase hover:bg-[#c49b64] hover:text-[#0d0906] transition-all duration-300 font-medium"
        >
          Enquire
        </Link>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-4 bg-[#0d0906]/98 border-t border-[#c49b64]/10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === l.href ? "text-[#c49b64]" : "text-[#f0e6d8]/70 hover:text-[#c49b64]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-2 px-5 py-2 border border-[#c49b64]/50 text-[#c49b64] text-xs tracking-[0.2em] uppercase"
            >
              Enquire
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
