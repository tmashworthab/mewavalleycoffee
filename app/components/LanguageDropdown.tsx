"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../lib/language";
import type { Lang } from "../lib/translations";

const OPTIONS: { code: Lang; label: string; short: string; flag: string; w: number; h: number }[] = [
  { code: "en", label: "English", short: "EN", flag: "/flags/gb.svg", w: 20, h: 10 },
  { code: "ne", label: "नेपाली", short: "NE", flag: "/flags/np.svg", w: 12, h: 15 },
];

interface Props {
  className?: string;
  variant?: "floating" | "inline";
}

export default function LanguageDropdown({ className = "", variant = "floating" }: Props) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = OPTIONS.find((o) => o.code === lang) ?? OPTIONS[0];

  const select = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#d4a96a]/50 text-[#d4a96a] text-xs tracking-[0.2em] uppercase hover:bg-[#d4a96a] hover:text-[#1c1814] transition-all duration-300 font-medium"
      >
        <Image src={current.flag} alt="" width={current.w} height={current.h} unoptimized />
        {current.short}
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`${
            variant === "floating" ? "absolute right-0 z-50 min-w-[150px]" : "relative w-full"
          } mt-2 bg-[#1c1814] border border-[#d4a96a]/20 shadow-xl`}
        >
          {OPTIONS.map((o) => (
            <button
              key={o.code}
              onClick={() => select(o.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.15em] uppercase text-left transition-colors duration-200 ${
                o.code === lang
                  ? "text-[#d4a96a] bg-[#d4a96a]/10"
                  : "text-[#f5f0ea]/70 hover:text-[#d4a96a] hover:bg-[#d4a96a]/5"
              }`}
            >
              <Image src={o.flag} alt="" width={o.w} height={o.h} unoptimized />
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
