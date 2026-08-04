"use client";
import Link from "next/link";
import Image from "next/image";
import logoMark from "../media/logo.png";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/language";

interface FooterProps {
  phone?: string;
}

export default function Footer({ phone }: FooterProps) {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-[#c9a468]/10 px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
      <div className="max-w-[88rem] mx-auto">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-y-14 gap-x-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={logoMark}
                  alt=""
                  width={38}
                  height={38}
                  style={{ opacity: 0.8 }}
                />
                <span className="flex flex-col leading-none">
                  <span className="type-eyebrow text-[#c9a468] text-[0.5625rem]">
                    Mewa Valley
                  </span>
                  <span className="font-serif-display text-xl text-[#f2ede6] mt-1">
                    Coffee
                  </span>
                </span>
              </div>
              <p className="font-serif-body text-[0.9375rem] leading-relaxed text-[#f2ede6]/55 max-w-xs">
                {t.footer.tagline}
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <p className="type-eyebrow text-[#f2ede6]/55 mb-6">
                {t.footer.navigate}
              </p>
              <ul className="space-y-4 list-none m-0 p-0">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="type-caption text-[#f2ede6]/60 hover:text-[#c9a468] transition-colors duration-500 link-underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <p className="type-eyebrow text-[#f2ede6]/55 mb-6">
                {t.footer.contactHeading}
              </p>
              <ul className="space-y-4 list-none m-0 p-0">
                <li>
                  <a
                    href="mailto:info@mewavalley.com"
                    className="type-caption text-[#f2ede6]/60 hover:text-[#c9a468] transition-colors duration-500 link-underline"
                  >
                    info@mewavalley.com
                  </a>
                </li>
                {phone && (
                  <li>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="type-caption text-[#f2ede6]/60 hover:text-[#c9a468] transition-colors duration-500 link-underline"
                    >
                      {phone}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Disclosure — deliberately kept, it is part of the trust story */}
        <Reveal delay={80}>
          <div className="mt-20 pt-10 border-t border-[#c9a468]/10 flex flex-col gap-6">
            <p className="type-caption text-[#f2ede6]/52 leading-relaxed max-w-3xl">
              {t.footer.disclaimer}
            </p>
            <p className="type-caption text-[#f2ede6]/52 text-[0.6875rem]">
              © {new Date().getFullYear()} Mewa Valley Coffee. {t.footer.rights}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
