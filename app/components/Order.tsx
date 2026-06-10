"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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
  {
    name: "Espresso Roast",
    sub: "First lots arriving after July 2026 sourcing trip",
    weight: "250g",
    price: "£18",
    notes: ["Chocolate", "Vanilla", "Nutty"],
    popular: true,
  },
  {
    name: "Filter Roast",
    sub: "Sample lots pending confirmation",
    weight: "250g",
    price: "£17",
    notes: ["Floral", "Fruit", "Caramel"],
    popular: false,
  },
  {
    name: "Whole Bean",
    sub: "Sample lots pending confirmation",
    weight: "500g",
    price: "£30",
    notes: ["Chocolate", "Vanilla", "Nutty"],
    popular: false,
  },
];

export default function Order() {
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "Espresso Roast",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="order" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d0906 0%, #110a07 100%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c49b64]/30 to-transparent" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c49b64] mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-[#f0e6d8] mb-6">
            Order Now
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-[#f0e6d8]/50 max-w-lg mx-auto">
            We ship direct from Nepal to your door. Limited small-batch lots -
            once a batch sells out, it&apos;s gone.
          </p>
        </div>

        {/* Product cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`card-hover relative border p-8 ${
                p.popular
                  ? "border-[#c49b64]/50 bg-[#1a0d06]"
                  : "border-[#c49b64]/10 bg-[#130b07]"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {p.popular && (
                <div className="absolute -top-px left-8 px-3 py-1 bg-[#c49b64] text-[#0d0906] text-[9px] font-bold tracking-[0.3em] uppercase">
                  Most Popular
                </div>
              )}

              {/* Bean icon */}
              <div className="mb-6">
                <svg width="48" height="32" viewBox="0 0 100 60" fill="none" opacity="0.7">
                  <ellipse cx="50" cy="30" rx="45" ry="25" fill="#8b4513" />
                  <path d="M50 8 Q70 30 50 52 Q30 30 50 8Z" fill="#6b3410" opacity="0.6" />
                </svg>
              </div>

              <p className="text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/60 mb-2">
                {p.sub}
              </p>
              <h3 className="text-xl font-black tracking-wider uppercase text-[#f0e6d8] mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-[#f0e6d8]/30 mb-6">{p.weight}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.notes.map((n) => (
                  <span
                    key={n}
                    className="px-2 py-1 text-[9px] tracking-widest uppercase border border-[#c49b64]/20 text-[#c49b64]/60"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between pt-6 border-t border-[#c49b64]/10">
                <span className="text-3xl font-black text-[#c49b64]">{p.price}</span>
                <button
                  onClick={() =>
                    setFormData((f) => ({ ...f, product: p.name }))
                  }
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    p.popular
                      ? "bg-[#c49b64] text-[#0d0906] hover:bg-[#d4b07a] font-bold"
                      : "border border-[#c49b64]/30 text-[#c49b64]/70 hover:border-[#c49b64] hover:text-[#c49b64]"
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact / Order form */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border border-[#c49b64]/15 bg-[#130b07] p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="#c49b64" strokeWidth="1.5" />
                    <path d="M14 24l7 7 13-14" stroke="#c49b64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black tracking-wider uppercase text-[#f0e6d8] mb-3">
                  Thank You
                </h3>
                <p className="text-[#f0e6d8]/50">
                  We&apos;ll be in touch within 24 hours to confirm your order and arrange delivery.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#c49b64] mb-2">
                  Place an Order
                </p>
                <h3 className="text-2xl font-black tracking-wider uppercase text-[#f0e6d8] mb-8">
                  Get in Touch
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/60 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#0d0906] border border-[#c49b64]/15 px-4 py-3 text-sm text-[#f0e6d8] placeholder-[#f0e6d8]/20 focus:outline-none focus:border-[#c49b64]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/60 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#0d0906] border border-[#c49b64]/15 px-4 py-3 text-sm text-[#f0e6d8] placeholder-[#f0e6d8]/20 focus:outline-none focus:border-[#c49b64]/50 transition-colors"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/60 mb-2">
                      Product
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData((f) => ({ ...f, product: e.target.value }))}
                      className="w-full bg-[#0d0906] border border-[#c49b64]/15 px-4 py-3 text-sm text-[#f0e6d8] focus:outline-none focus:border-[#c49b64]/50 transition-colors"
                    >
                      {products.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} - {p.weight} ({p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#c49b64]/60 mb-2">
                      Message (optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-[#0d0906] border border-[#c49b64]/15 px-4 py-3 text-sm text-[#f0e6d8] placeholder-[#f0e6d8]/20 focus:outline-none focus:border-[#c49b64]/50 transition-colors resize-none"
                      placeholder="Bulk orders, wholesale enquiries, questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#c49b64] text-[#0d0906] text-xs tracking-[0.4em] uppercase font-black hover:bg-[#d4b07a] transition-colors duration-300"
                  >
                    Send Enquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
