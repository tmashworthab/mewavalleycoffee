"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Our Story", href: "#story" },
  { label: "The Coffee", href: "#coffee" },
  { label: "Origin", href: "#origin" },
  { label: "Order", href: "#order" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group">
          <span className="text-[10px] tracking-[0.4em] text-[#c49b64] uppercase">
            Mewa Valley
          </span>
          <span className="text-xl font-bold tracking-widest text-[#f0e6d8] group-hover:text-[#c49b64] transition-colors duration-300">
            COFFEE
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm tracking-[0.2em] uppercase text-[#f0e6d8]/70 hover:text-[#c49b64] transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#order"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-[#c49b64]/50 text-[#c49b64] text-xs tracking-[0.2em] uppercase hover:bg-[#c49b64] hover:text-[#0d0906] transition-all duration-300 font-medium"
        >
          Shop Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-[#f0e6d8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-64" : "max-h-0"}`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4 bg-[#0d0906]/98 border-t border-[#c49b64]/10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm tracking-[0.2em] uppercase text-[#f0e6d8]/70 hover:text-[#c49b64] transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#order"
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-2 px-5 py-2 border border-[#c49b64]/50 text-[#c49b64] text-xs tracking-[0.2em] uppercase"
            >
              Shop Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
