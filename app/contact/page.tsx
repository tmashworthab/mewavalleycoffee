"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { useLanguage } from "../lib/language";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const tr = "transition-all duration-700 ease-spring";
  const show = "opacity-100 translate-y-0";
  const hide = "opacity-0 translate-y-4";
  const [form, setForm] = useState({
    name: "",
    business: "",
    role: "",
    email: "",
    type: "",
    interest: "",
    comments: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const labelClass = "block text-[9px] tracking-[0.35em] uppercase font-bold text-[#d4a96a]/70 mb-2";
  const inputClass = "w-full bg-transparent border border-[#d4a96a]/20 px-4 py-3 text-sm text-[#f5f0ea] placeholder-[#f5f0ea]/20 focus:outline-none focus:border-[#d4a96a]/60 transition-colors";

  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative pt-40 pb-16 px-6 border-b border-[#d4a96a]/15">
          <div className="max-w-4xl mx-auto">
            <h1 className={`${tr} ${mounted ? show : hide} text-4xl md:text-6xl font-black tracking-widest uppercase text-[#f5f0ea] leading-none mb-6`} style={{ transitionDelay: "220ms" }}>
              {c.title}
            </h1>
            <p className={`${tr} ${mounted ? show : hide} text-[#f5f0ea]/50 text-lg max-w-2xl leading-relaxed font-light`} style={{ transitionDelay: "380ms" }}>
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-16">

            {/* Left: context */}
            <Reveal>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4a96a] mb-6">{c.whatNextHeading}</p>
              <div className="space-y-6 text-sm text-[#f5f0ea]/50 leading-relaxed">
                <p>{c.whatNext1}</p>
                <p>{c.whatNext2}</p>
                <p>{c.whatNext3}</p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#d4a96a]/15 space-y-3 text-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4a96a] mb-4">{c.directHeading}</p>
                <a href="mailto:info@mewavalley.com" className="text-[#f5f0ea]/50 hover:text-[#d4a96a] transition-colors">
                  info@mewavalley.com
                </a>
              </div>
            </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={120} className="md:col-span-2">
            <div>
              {submitted ? (
                <div className="flex flex-col items-start py-12">
                  <div className="w-12 h-12 border border-[#d4a96a]/40 flex items-center justify-center mb-6">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="#d4a96a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black tracking-widest uppercase text-[#f5f0ea] mb-3">{c.thankYouHeading}</h2>
                  <p className="text-[#f5f0ea]/50 text-sm max-w-sm leading-relaxed">
                    {c.thankYouBody}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>{c.labels.name}</label>
                      <input type="text" required value={form.name} onChange={set("name")} className={inputClass} placeholder={c.placeholders.name} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.labels.business}</label>
                      <input type="text" required value={form.business} onChange={set("business")} className={inputClass} placeholder={c.placeholders.business} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>{c.labels.role}</label>
                      <input type="text" required value={form.role} onChange={set("role")} className={inputClass} placeholder={c.placeholders.role} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.labels.email}</label>
                      <input type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder={c.placeholders.email} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>{c.labels.areYouA}</label>
                    <select required value={form.type} onChange={set("type")} className={`${inputClass} bg-[#1c1814]`}>
                      <option value="" disabled>{c.selectOne}</option>
                      {c.typeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>{c.labels.interestedIn}</label>
                    <select required value={form.interest} onChange={set("interest")} className={`${inputClass} bg-[#1c1814]`}>
                      <option value="" disabled>{c.selectOne}</option>
                      {c.interestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>{c.labels.comments}</label>
                    <textarea
                      rows={5}
                      value={form.comments}
                      onChange={set("comments")}
                      className={inputClass}
                      placeholder={c.placeholders.comments}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.4em] uppercase font-black hover:bg-[#e0be88] transition-colors"
                  >
                    {c.submit}
                  </button>
                </form>
              )}
            </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
