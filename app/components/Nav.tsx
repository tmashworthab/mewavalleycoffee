"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoMark from "../media/logo.png";
import { content } from "../lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: content.nav.home, ck: "nav.home", href: "/" },
    { label: content.nav.about, ck: "nav.about", href: "/about" },
    { label: content.nav.contact, ck: "nav.contact", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out-expo ${
          scrolled
            ? "bg-[#141210]/88 backdrop-blur-xl border-b border-[#c9a468]/10 py-4"
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <nav
          aria-label="Primary"
          className="max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-8"
        >
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Mewa Valley Coffee — home"
          >
            <Image
              src={logoMark}
              alt=""
              width={32}
              height={32}
              className="transition-opacity duration-500 group-hover:opacity-80"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="type-eyebrow text-[#c9a468] text-[0.5625rem]">Mewa Valley</span>
              <span className="font-serif-display text-[1.0625rem] tracking-wide text-[#f2ede6] mt-1 group-hover:text-[#c9a468] transition-colors duration-500">
                Coffee
              </span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link type-eyebrow transition-colors duration-500 ${
                      active ? "text-[#c9a468]" : "text-[#f2ede6]/60 hover:text-[#f2ede6]"
                    }`}
                  >
                    <span data-ck={l.ck}>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            className="md:hidden flex flex-col items-end justify-center gap-[6px] -mr-3 min-w-11 min-h-11 px-3"
            onClick={() => setMenuOpen(true)}
            aria-label={content.nav.menu}
            aria-expanded={menuOpen}
          >
            <span className="block h-px w-6 bg-[#f2ede6]" />
            <span className="block h-px w-6 bg-[#f2ede6]" />
          </button>
        </nav>
      </header>

      {/* Mobile sheet — full screen, generous, editorial */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-500 ease-out-expo ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-[#141210]" />

        <div className="relative h-full flex flex-col px-6 pt-7 pb-12">
          <div className="flex items-center justify-between">
            <Image src={logoMark} alt="" width={32} height={32} />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label={content.nav.close}
              className="-mr-3 px-3 min-w-11 min-h-11 flex items-center justify-end text-[#f2ede6]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="flex-1 flex flex-col justify-center gap-2 list-none m-0 p-0">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-serif-display text-[2.5rem] leading-[1.5] transition-all duration-700 ease-out-expo ${
                    pathname === l.href ? "text-[#c9a468]" : "text-[#f2ede6]/85"
                  } ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                  style={{ transitionDelay: menuOpen ? `${120 + i * 80}ms` : "0ms" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-[#c9a468]/15">
            <a href="mailto:info@mewavalley.com" className="type-caption text-[#f2ede6]/60 link-underline">
              info@mewavalley.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
