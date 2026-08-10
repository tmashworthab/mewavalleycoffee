"use client";

import { useState } from "react";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import { useContent } from "../lib/locale-context";
import { formatClasses } from "../lib/format";
import { CONTAINER, Grid } from "./Grid";

export default function ContactContent() {
  const { c: all } = useContent();
  const c = all.contact;

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
  });

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const people = [
    {
      name: c.person1Name, nameCk: "contact.person1Name",
      role: c.person1Role, roleCk: "contact.person1Role",
      phone: c.person1Phone, phoneCk: "contact.person1Phone",
    },
    {
      name: c.person2Name, nameCk: "contact.person2Name",
      role: c.person2Role, roleCk: "contact.person2Role",
      phone: c.person2Phone, phoneCk: "contact.person2Phone",
    },
  ];

  const labelClass = "block type-eyebrow text-[#f2ede6]/55 mb-3";
  const inputClass =
    "w-full bg-transparent border-0 border-b border-[#c9a468]/25 px-0 py-3 font-serif-body text-[1.0625rem] text-[#f2ede6] placeholder-[#f2ede6]/50 focus:outline-none focus:border-[#c9a468] transition-colors duration-500";

  return (
    <>
      <PageHero titleCk="contact.title" subtitleCk="contact.subtitle" />

      <section className="pb-32 sm:pb-40 pt-8">
        <div className={CONTAINER}>
        <Grid gapY="gap-y-16">
          {/* Left rail */}
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="font-serif-body type-body text-[#f2ede6]/60">
              <span data-ck="contact.whatNext1" data-ck-role="body" className={formatClasses("contact.whatNext1")}>{c.whatNext1}</span>
            </p>

            <div className="mt-12 pt-10 border-t border-[#c9a468]/15">
              <p className="type-eyebrow text-[#c9a468] mb-5">
                <span data-ck="contact.directHeading" data-ck-role="label" className={formatClasses("contact.directHeading")}>{c.directHeading}</span>
              </p>
              <a
                href="mailto:info@mewavalley.com"
                className="font-serif-body text-[1.0625rem] text-[#f2ede6]/70 hover:text-[#c9a468] transition-colors duration-500 link-underline"
              >
                info@mewavalley.com
              </a>
            </div>

            {/* Named contacts, one either end of the supply chain */}
            <div className="mt-12 pt-10 border-t border-[#c9a468]/15">
              <p className="type-eyebrow text-[#c9a468] mb-6">
                <span
                  data-ck="contact.peopleHeading"
                  data-ck-role="label"
                  className={formatClasses("contact.peopleHeading")}
                >
                  {c.peopleHeading}
                </span>
              </p>

              <ul className="space-y-8 list-none m-0 p-0">
                {people.map((person) => (
                  <li key={person.nameCk}>
                    <p
                      className={`font-serif-display text-[1.125rem] text-[#f2ede6] ${formatClasses(person.nameCk)}`}
                      data-ck={person.nameCk}
                      data-ck-role="title"
                    >
                      {person.name}
                    </p>
                    <p
                      className={`type-caption text-[#f2ede6]/55 mt-1.5 ${formatClasses(person.roleCk)}`}
                      data-ck={person.roleCk}
                      data-ck-role="label"
                    >
                      {person.role}
                    </p>
                    <a
                      href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-block font-serif-body text-[1rem] text-[#f2ede6]/70 hover:text-[#c9a468] transition-colors duration-500 link-underline mt-2.5"
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
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <div
                className="py-10"
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-11 h-11 border border-[#c9a468]/40 flex items-center justify-center mb-8"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="#c9a468"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="font-serif-display type-subtitle text-[#f2ede6] mb-4">
                  <span data-ck="contact.thankYouHeading" data-ck-role="title" className={formatClasses("contact.thankYouHeading")}>{c.thankYouHeading}</span>
                </h2>
                <p className="font-serif-body type-body text-[#f2ede6]/60 max-w-md">
                  <span data-ck="contact.thankYouBody" data-ck-role="body" className={formatClasses("contact.thankYouBody")}>{c.thankYouBody}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      <span data-ck="contact.labels.name" data-ck-role="label" className={formatClasses("contact.labels.name")}>{c.labels.name}</span>{" "}
                      <span className="text-[#c9a468]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      className={inputClass}
                      placeholder={c.placeholders.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className={labelClass}>
                      <span data-ck="contact.labels.business" data-ck-role="label" className={formatClasses("contact.labels.business")}>{c.labels.business}</span>{" "}
                      <span className="text-[#c9a468]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      required
                      autoComplete="organization"
                      value={form.business}
                      onChange={set("business")}
                      className={inputClass}
                      placeholder={c.placeholders.business}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <label htmlFor="email" className={labelClass}>
                    <span data-ck="contact.labels.email" data-ck-role="label" className={formatClasses("contact.labels.email")}>{c.labels.email}</span>{" "}
                    <span className="text-[#c9a468]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass}
                    placeholder={c.placeholders.email}
                  />
                </div>

                <div className="mt-10">
                  <label htmlFor="message" className={labelClass}>
                    <span data-ck="contact.labels.message" data-ck-role="label" className={formatClasses("contact.labels.message")}>{c.labels.message}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputClass} resize-y`}
                    placeholder={c.placeholders.message}
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-8 font-serif-body text-[0.9375rem] text-[#e6a08a]"
                  >
                    <span data-ck="contact.sendError" data-ck-role="body" className={formatClasses("contact.sendError")}>{c.sendError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group mt-14 inline-flex items-center gap-4 text-[#f2ede6] hover:text-[#c9a468] disabled:opacity-40 disabled:cursor-wait transition-colors duration-500"
                >
                  <span className="type-eyebrow">
                    {sending ? c.sending : c.submit}
                  </span>
                  <span className="block w-12 h-px bg-current" />
                  <svg
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  >
                    <path
                      d="M1 1l5 4.5L1 10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </Reveal>
        </Grid>
        </div>
      </section>
    </>
  );
}
