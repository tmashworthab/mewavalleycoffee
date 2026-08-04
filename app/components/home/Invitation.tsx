"use client";
import Link from "next/link";
import Image from "next/image";
import { content } from "../../lib/content";
import Reveal from "../Reveal";
import { Eyebrow } from "./primitives";
import ridge from "../../media/nepal-ridge.jpg";

export default function Invitation() {
  const c = content.cta;

  return (
    <section className="relative overflow-hidden grain">
      {/* Return to the opening photograph — closes the loop */}
      <div className="absolute inset-0">
        <Image
          src={ridge}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[center_30%]"
        />
      </div>
      <div className="absolute inset-0 bg-[#141210]/78" />
      <div className="absolute inset-0 scrim-vignette pointer-events-none" />

      <div className="relative max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16 py-32 sm:py-44 lg:py-56">
        <div className="max-w-[40rem]">
          <Eyebrow ck="cta.eyebrow" className="mb-8" />

          <Reveal delay={80}>
            <h2
              className="font-serif-display type-title text-[#f2ede6] mb-8 text-balance"
              data-ck="cta.title"
            >
              {c.title}
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="font-serif-body type-lead text-[#f2ede6]/70 mb-12" data-ck="cta.body">
              {c.body}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-[#f2ede6] hover:text-[#c9a468] transition-colors duration-500"
            >
              <span className="type-eyebrow" data-ck="cta.button">
                {c.button}
              </span>
              <span className="relative block w-12 h-px bg-current overflow-hidden">
                <span className="absolute inset-0 bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out-expo" />
              </span>
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
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
