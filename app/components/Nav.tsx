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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f0ebe3]/95 backdrop-blur-sm border-b-2 border-[#1a1a1a] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex flex-col leading-none">
          <span className="text-[9px] tracking-[0.5em] uppercase text-[#c8271a] font-bold">
            Mewa Valley
          </span>
          <span className="text-lg font-black tracking-widest uppercase text-[#1a1a1a] group-hover:text-[#c8271a] transition-colors">
            COFFEE
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-xs tracking-[0.25em] uppercase font-bold text-[#1a1a1a] hover:text-[#c8271a]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#order"
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-[#c8271a] text-[#f0ebe3] text-xs tracking-[0.25em] uppercase font-black hover:bg-[#a81f15] transition-colors"
        >
          Shop Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-4 bg-[#f0ebe3] border-t-2 border-[#1a1a1a]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.25em] uppercase font-black text-[#1a1a1a] hover:text-[#c8271a]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#order"
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-1 px-6 py-2 bg-[#c8271a] text-[#f0ebe3] text-xs tracking-[0.25em] uppercase font-black"
            >
              Shop Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
