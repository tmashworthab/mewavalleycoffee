"use client";
import Image, { type StaticImageData } from "next/image";
import Reveal from "../Reveal";
import { useContent } from "../../lib/locale-context";

/**
 * Text primitives take a `ck` (content key) rather than children, so every
 * string on the page is stamped with the dot-path it came from. The editor
 * finds editable text by querying for [data-ck].
 */

/* ---------- Layout shell ---------- */

export function Section({
  children,
  className = "",
  id,
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "ink" | "raised";
}) {
  return (
    <section
      id={id}
      className={`relative px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-48 ${
        tone === "raised" ? "bg-[#1c1916]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ---------- Eyebrow + rule ---------- */

export function Eyebrow({
  ck,
  className = "",
  delay = 0,
}: {
  ck: string;
  className?: string;
  delay?: number;
}) {
  const { t } = useContent();
  return (
    <Reveal delay={delay} className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-[#c9a468]/50" />
      <span className="type-eyebrow text-[#c9a468]" data-ck={ck}>
        {t(ck)}
      </span>
    </Reveal>
  );
}

/* ---------- Headings ---------- */

export function SectionTitle({
  ck,
  className = "",
  delay = 80,
  size = "title",
}: {
  ck: string;
  className?: string;
  delay?: number;
  size?: "title" | "subtitle";
}) {
  const { t } = useContent();
  return (
    <Reveal delay={delay}>
      <h2
        data-ck={ck}
        className={`font-serif-display ${
          size === "title" ? "type-title" : "type-subtitle"
        } text-[#f2ede6] text-balance ${className}`}
      >
        {t(ck)}
      </h2>
    </Reveal>
  );
}

/* ---------- Body copy ---------- */

export function Body({
  ck,
  className = "",
  delay = 0,
  lead = false,
}: {
  ck: string;
  className?: string;
  delay?: number;
  lead?: boolean;
}) {
  const { t } = useContent();
  return (
    <Reveal delay={delay}>
      <p
        data-ck={ck}
        className={`font-serif-body ${
          lead ? "type-lead text-[#f2ede6]/85" : "type-body text-[#f2ede6]/65"
        } ${className}`}
      >
        {t(ck)}
      </p>
    </Reveal>
  );
}

/* ---------- Full-bleed photographic break ---------- */

export function PhotoBreak({
  src,
  altCk,
  height = "tall",
  captionCk,
  position = "object-center",
}: {
  src: StaticImageData;
  altCk: string;
  height?: "tall" | "mid" | "short";
  captionCk?: string;
  position?: string;
}) {
  const { t } = useContent();
  const heights = {
    tall: "h-[80svh] sm:h-[92svh]",
    mid: "h-[58svh] sm:h-[72svh]",
    short: "h-[42svh] sm:h-[56svh]",
  };

  return (
    <figure className="relative m-0">
      <div className={`relative w-full overflow-hidden grain ${heights[height]}`}>
        <Image
          src={src}
          alt={t(altCk)}
          fill
          sizes="100vw"
          placeholder="blur"
          className={`object-cover ${position} animate-slow-zoom`}
        />
        <div className="absolute inset-0 scrim-vignette pointer-events-none" />
      </div>
      {captionCk && (
        <figcaption className="max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16 pt-5">
          <Reveal>
            <span className="type-caption text-[#f2ede6]/55" data-ck={captionCk}>
              {t(captionCk)}
            </span>
          </Reveal>
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Inset photograph in an editorial column ---------- */

export function InsetPhoto({
  src,
  altCk,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: StaticImageData;
  altCk: string;
  className?: string;
  sizes?: string;
}) {
  const { t } = useContent();
  return (
    <Reveal variant="mask" className={className}>
      <div className="relative w-full overflow-hidden grain">
        <Image
          src={src}
          alt={t(altCk)}
          sizes={sizes}
          placeholder="blur"
          className="w-full h-auto object-cover"
        />
      </div>
    </Reveal>
  );
}

/* ---------- Hairline divider that draws itself ---------- */

export function Hairline({ className = "" }: { className?: string }) {
  return (
    <Reveal variant="rule">
      <span className={`block h-px w-full bg-[#c9a468]/20 ${className}`} />
    </Reveal>
  );
}
