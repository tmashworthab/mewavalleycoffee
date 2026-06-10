"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export default function Contact() {
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
            <p className={`${tr} ${mounted ? show : hide} text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-4`} style={{ transitionDelay: "100ms" }}>
              Get in Touch
            </p>
            <h1 className={`${tr} ${mounted ? show : hide} text-4xl md:text-6xl font-black tracking-widest uppercase text-[#f5f0ea] leading-none mb-6`} style={{ transitionDelay: "220ms" }}>
              Contact
            </h1>
            <p className={`${tr} ${mounted ? show : hide} text-[#f5f0ea]/50 text-lg max-w-2xl leading-relaxed font-light`} style={{ transitionDelay: "380ms" }}>
              Whether you are a roaster looking for samples, an importer wanting to discuss
              volumes, or simply curious about Nepali coffee - get in touch.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-16">

            {/* Left: context */}
            <Reveal>
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4a96a] mb-6">What happens next</p>
              <div className="space-y-6 text-sm text-[#f5f0ea]/50 leading-relaxed">
                <p>We will respond to all enquiries within 48 hours.</p>
                <p>If you are a roaster interested in samples, we will add you to our list and contact you when lots are confirmed after our July 2026 sourcing trip.</p>
                <p>If you have questions about the origin or our sourcing approach, we are happy to talk through the details.</p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#d4a96a]/15 space-y-3 text-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4a96a] mb-4">Direct</p>
                <p className="text-[#f5f0ea]/50">hello@mewavalleycoffee.com</p>
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
                  <h2 className="text-2xl font-black tracking-widest uppercase text-[#f5f0ea] mb-3">Thank you</h2>
                  <p className="text-[#f5f0ea]/50 text-sm max-w-sm leading-relaxed">
                    We have received your message and will be in touch within 48 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input type="text" required value={form.name} onChange={set("name")} className={inputClass} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className={labelClass}>Business *</label>
                      <input type="text" required value={form.business} onChange={set("business")} className={inputClass} placeholder="Company or roastery name" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Role *</label>
                      <input type="text" required value={form.role} onChange={set("role")} className={inputClass} placeholder="e.g. Head of Sourcing" />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder="you@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Are you a... *</label>
                    <select required value={form.type} onChange={set("type")} className={`${inputClass} bg-[#1c1814]`}>
                      <option value="" disabled>Select one</option>
                      <option value="roaster">Roaster</option>
                      <option value="importer">Importer</option>
                      <option value="cafe">Café</option>
                      <option value="consumer">Consumer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Are you interested in... *</label>
                    <select required value={form.interest} onChange={set("interest")} className={`${inputClass} bg-[#1c1814]`}>
                      <option value="" disabled>Select one</option>
                      <option value="green-samples">Green samples for cupping</option>
                      <option value="roasted">Roasted coffee</option>
                      <option value="private-label">Private label</option>
                      <option value="general">General information</option>
                      <option value="multiple">Multiple of the above</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Comments</label>
                    <textarea
                      rows={5}
                      value={form.comments}
                      onChange={set("comments")}
                      className={inputClass}
                      placeholder="Any questions, context about your business, volumes you have in mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.4em] uppercase font-black hover:bg-[#e0be88] transition-colors"
                  >
                    Send Enquiry
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
