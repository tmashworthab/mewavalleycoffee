"use client";
import { useEffect, useState } from "react";
import { useContent } from "../lib/locale-context";
import { formatClasses } from "../lib/format";

interface PageHeroProps {
  eyebrowCk?: string;
  titleCk: string;
  subtitleCk?: string;
}

export default function PageHero({ eyebrowCk, titleCk, subtitleCk }: PageHeroProps) {
  const { t } = useContent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const rise = `transition-all duration-[1100ms] ease-out-expo ${
    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 pt-40 sm:pt-48 lg:pt-56 pb-16 sm:pb-20">
      <div className="max-w-[88rem] mx-auto">
        {eyebrowCk && (
          <div className={`flex items-center gap-4 mb-8 ${rise}`} style={{ transitionDelay: "120ms" }}>
            <span className="h-px w-8 bg-[#c9a468]/50" />
            <span className={`type-eyebrow text-[#c9a468] ${formatClasses(eyebrowCk)}`} data-ck={eyebrowCk} data-ck-role="label">
              {t(eyebrowCk)}
            </span>
          </div>
        )}

        <h1
          className={`font-serif-display type-title text-[#f2ede6] max-w-[18ch] text-balance ${rise} ${formatClasses(titleCk)}`}
          style={{ transitionDelay: "240ms" }}
          data-ck={titleCk}
          data-ck-role="title"
        >
          {t(titleCk)}
        </h1>

        {subtitleCk && (
          <p
            className={`font-serif-body type-lead text-[#f2ede6]/65 max-w-[42rem] mt-8 ${rise} ${formatClasses(subtitleCk)}`}
            style={{ transitionDelay: "380ms" }}
            data-ck={subtitleCk}
            data-ck-role="body"
          >
            {t(subtitleCk)}
          </p>
        )}
      </div>
    </section>
  );
}
