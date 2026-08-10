"use client";
import Link from "next/link";
import Image from "next/image";
import logoMark from "../media/logo.png";
import Reveal from "./Reveal";
import { localeHref } from "../lib/content";
import { useContent } from "../lib/locale-context";
import { formatClasses } from "../lib/format";
import { CONTAINER, Grid } from "./Grid";

export default function Footer() {
  const { c, locale } = useContent();

  // The same content keys as the contact page, so a title edited in one place
  // changes in both.
  const people = [
    {
      name: c.contact.person1Name, nameCk: "contact.person1Name",
      role: c.contact.person1Role, roleCk: "contact.person1Role",
      phone: c.contact.person1Phone, phoneCk: "contact.person1Phone",
    },
    {
      name: c.contact.person2Name, nameCk: "contact.person2Name",
      role: c.contact.person2Role, roleCk: "contact.person2Role",
      phone: c.contact.person2Phone, phoneCk: "contact.person2Phone",
    },
  ];

  const navLinks = [
    { label: c.nav.home, href: localeHref("/", locale) },
    { label: c.nav.about, href: localeHref("/about", locale) },
    { label: c.nav.contact, href: localeHref("/contact", locale) },
  ];

  return (
    <footer className="relative border-t border-[#c9a468]/10 py-20 sm:py-24">
      <div className={CONTAINER}>
        <Reveal>
          <Grid gapY="gap-y-14">
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <Image src={logoMark} alt="" width={38} height={38} style={{ opacity: 0.8 }} />
                <span className="flex flex-col leading-none">
                  <span className="type-eyebrow text-[#c9a468] text-[0.5625rem]">Mewa Valley</span>
                  <span className="font-serif-display text-xl text-[#f2ede6] mt-1">Coffee</span>
                </span>
              </div>
              <p
                className={`font-serif-body text-[0.9375rem] leading-relaxed text-[#f2ede6]/55 max-w-xs ${formatClasses("footer.tagline")}`}
                data-ck="footer.tagline"
                data-ck-role="body"
                data-ck-multiline="true"
              >
                {c.footer.tagline}
              </p>
            </div>

            <div className="col-span-4 md:col-span-3 lg:col-span-2">
              <p className={`type-eyebrow text-[#f2ede6]/55 mb-6 ${formatClasses("footer.navigate")}`} data-ck="footer.navigate" data-ck-role="label">
                {c.footer.navigate}
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

            <div className="col-span-4 md:col-span-5 lg:col-span-6">
              <p className={`type-eyebrow text-[#f2ede6]/55 mb-6 ${formatClasses("footer.contactHeading")}`} data-ck="footer.contactHeading" data-ck-role="label">
                {c.footer.contactHeading}
              </p>
              <a
                href="mailto:info@mewavalley.com"
                className="type-caption text-[#f2ede6]/60 hover:text-[#c9a468] transition-colors duration-500 link-underline"
              >
                info@mewavalley.com
              </a>

              {/* Nested at the same gutter, so each person starts on a real
                  column of the page grid. */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-7 list-none m-0 p-0">
                {people.map((person) => (
                  <li key={person.nameCk} className="sm:col-span-3">
                    <p
                      className={`font-serif-display text-[1rem] text-[#f2ede6]/90 ${formatClasses(person.nameCk)}`}
                      data-ck={person.nameCk}
                      data-ck-role="title"
                    >
                      {person.name}
                    </p>
                    <p
                      className={`type-caption text-[#f2ede6]/50 mt-1 ${formatClasses(person.roleCk)}`}
                      data-ck={person.roleCk}
                      data-ck-role="label"
                    >
                      {person.role}
                    </p>
                    <a
                      href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-block type-caption text-[#f2ede6]/60 hover:text-[#c9a468] transition-colors duration-500 link-underline mt-2"
                    >
                      <span
                        data-ck={person.phoneCk}
                        data-ck-role="body"
                        className={formatClasses(person.phoneCk)}
                      >
                        {person.phone}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </Reveal>

        {/* Disclosure — deliberately kept, it is part of the trust story */}
        <Reveal delay={80}>
          <div className="mt-20 pt-10 border-t border-[#c9a468]/10 flex flex-col gap-6">
            <p className={`type-caption text-[#f2ede6]/52 leading-relaxed max-w-3xl ${formatClasses("footer.disclaimer")}`} data-ck="footer.disclaimer" data-ck-role="label" data-ck-multiline="true">
              {c.footer.disclaimer}
            </p>
            <p className="type-caption text-[#f2ede6]/52 text-[0.6875rem]">
              © {new Date().getFullYear()} Mewa Valley Coffee.{" "}
              <span data-ck="footer.rights">{c.footer.rights}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
