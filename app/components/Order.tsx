"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const products = [
  { name: "Espresso Roast", sub: "Small Batch No. 39", weight: "250g", price: "£18", notes: ["Chocolate", "Vanilla", "Nutty"], popular: true },
  { name: "Filter Roast",   sub: "Small Batch No. 37", weight: "250g", price: "£17", notes: ["Floral", "Fruit", "Caramel"],    popular: false },
  { name: "Whole Bean",     sub: "Small Batch No. 38", weight: "500g", price: "£30", notes: ["Chocolate", "Vanilla", "Nutty"], popular: false },
];

export default function Order() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", product: "Espresso Roast", message: "" });

  return (
    <section id="order" className="bg-[#f0ebe3] border-t-2 border-[#1a1a1a]">

      {/* Header bar */}
      <div className="border-b-2 border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs tracking-[0.4em] uppercase font-black text-[#1a1a1a]">Order Now</p>
          <p className="text-xs tracking-[0.4em] uppercase font-bold text-[#6b6560]">Direct From Nepal</p>
        </div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 py-16">

        {/* Product cards */}
        <div className={`grid md:grid-cols-3 gap-0 border-2 border-[#1a1a1a] mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`card-hover p-8 relative ${i < 2 ? "border-r-2 border-[#1a1a1a]" : ""} ${p.popular ? "bg-[#c8271a]" : "bg-[#f0ebe3]"}`}
            >
              {p.popular && (
                <span className="absolute top-4 right-4 text-[9px] font-black tracking-[0.3em] uppercase bg-[#f0ebe3] text-[#c8271a] px-2 py-1">
                  Popular
                </span>
              )}

              <p className={`text-[9px] tracking-[0.3em] uppercase font-bold mb-3 ${p.popular ? "text-[#f0ebe3]/60" : "text-[#6b6560]"}`}>{p.sub}</p>
              <h3 className={`text-2xl font-black uppercase tracking-tight mb-1 ${p.popular ? "text-[#f0ebe3]" : "text-[#1a1a1a]"}`}>{p.name}</h3>
              <p className={`text-sm font-bold mb-6 ${p.popular ? "text-[#f0ebe3]/50" : "text-[#6b6560]"}`}>{p.weight}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {p.notes.map((n) => (
                  <span
                    key={n}
                    className={`px-2 py-1 text-[9px] tracking-widest uppercase font-bold border ${
                      p.popular
                        ? "border-[#f0ebe3]/30 text-[#f0ebe3]/70"
                        : "border-[#1a1a1a]/20 text-[#6b6560]"
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>

              <div className={`flex items-end justify-between pt-6 border-t ${p.popular ? "border-[#f0ebe3]/20" : "border-[#1a1a1a]/10"}`}>
                <span className={`text-4xl font-black ${p.popular ? "text-[#f0ebe3]" : "text-[#c8271a]"}`}>{p.price}</span>
                <button
                  onClick={() => setFormData(f => ({ ...f, product: p.name }))}
                  className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-black transition-colors ${
                    p.popular
                      ? "bg-[#f0ebe3] text-[#c8271a] hover:bg-[#e0d8cf]"
                      : "bg-[#1a1a1a] text-[#f0ebe3] hover:bg-[#c8271a]"
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order form */}
        <div className={`grid md:grid-cols-2 gap-16 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Left: copy */}
          <div>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight text-[#1a1a1a] mb-6">
              GET IN<br />
              <span className="text-[#c8271a]">TOUCH</span>
            </h2>
            <div className="w-12 h-1 bg-[#c8271a] mb-8" />
            <p className="text-sm text-[#6b6560] leading-relaxed font-medium mb-8">
              We ship direct from Nepal to your door. Limited small-batch lots -
              once a batch sells out, it&apos;s gone. Fill in the form and we&apos;ll
              confirm your order within 24 hours.
            </p>
            <div className="space-y-4">
              {[
                { label: "Free shipping", desc: "On orders over £40" },
                { label: "Fresh roasted", desc: "Shipped within days of roasting" },
                { label: "Direct trade", desc: "Straight from Nepali farmers" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#c8271a] flex-shrink-0" />
                  <div>
                    <span className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider">{b.label}</span>
                    <span className="text-sm text-[#6b6560] font-medium"> - {b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="border-2 border-[#1a1a1a] p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[#c8271a] flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14l5 5 11-10" stroke="#f0ebe3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black uppercase text-[#1a1a1a] mb-3">Thank You!</h3>
                <p className="text-sm text-[#6b6560] font-medium">We&apos;ll be in touch within 24 hours to confirm your order.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase font-black text-[#1a1a1a] mb-2">Name</label>
                    <input
                      type="text" required
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      className="w-full border-2 border-[#1a1a1a] bg-transparent px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder-[#6b6560] focus:outline-none focus:border-[#c8271a] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase font-black text-[#1a1a1a] mb-2">Email</label>
                    <input
                      type="email" required
                      value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      className="w-full border-2 border-[#1a1a1a] bg-transparent px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder-[#6b6560] focus:outline-none focus:border-[#c8271a] transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase font-black text-[#1a1a1a] mb-2">Product</label>
                  <select
                    value={formData.product}
                    onChange={e => setFormData(f => ({ ...f, product: e.target.value }))}
                    className="w-full border-2 border-[#1a1a1a] bg-[#f0ebe3] px-4 py-3 text-sm font-medium text-[#1a1a1a] focus:outline-none focus:border-[#c8271a] transition-colors"
                  >
                    {products.map(p => (
                      <option key={p.name} value={p.name}>{p.name} - {p.weight} ({p.price})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase font-black text-[#1a1a1a] mb-2">Message (optional)</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                    className="w-full border-2 border-[#1a1a1a] bg-transparent px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder-[#6b6560] focus:outline-none focus:border-[#c8271a] transition-colors resize-none"
                    placeholder="Bulk orders, wholesale, questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#c8271a] text-[#f0ebe3] text-xs tracking-[0.4em] uppercase font-black hover:bg-[#a81f15] transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
