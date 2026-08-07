"use client";
import Image, { type StaticImageData } from "next/image";
import Reveal from "../Reveal";
import { useContent } from "../../lib/locale-context";
import { formatClasses, baseSizeClass, type Role, type Size } from "../../lib/format";
import RichText, { isRich } from "../RichText";

/**
 * Text primitives take a `ck` (content key) rather than children, so every
 * string on the page is stamped with the dot-path it came from. The editor
 * finds editable text by querying for [data-ck], and reads data-ck-raw when a
 * field's source differs from what is rendered.
 */

/** Attributes the editor needs to find, classify and edit a field. */
function editableProps(
  ck: string,
  text: string,
  role: Role,
  multiline = false
) {
  return {
    "data-ck": ck,
    "data-ck-role": role,
    // The editor edits the source, not the rendered lists.
    ...(isRich(text) ? { "data-ck-raw": text } : {}),
    ...(multiline ? { "data-ck-multiline": "true" } : {}),
  };
}

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
  const text = t(ck);
  return (
    <Reveal delay={delay} className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-[#c9a468]/50 shrink-0" />
      <span
        className={`type-eyebrow text-[#c9a468] ${formatClasses(ck, "label")}`}
        {...editableProps(ck, text, "label")}
      >
        {text}
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
  const text = t(ck);
  const base = size === "title" ? baseSizeClass("title", "md") : "type-subtitle";
  return (
    <Reveal delay={delay}>
      <h2
        className={`font-serif-display ${base} text-[#f2ede6] text-balance ${formatClasses(
          ck,
          "title"
        )} ${className}`}
        {...editableProps(ck, text, "title")}
      >
        {text}
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
  const text = t(ck);
  const defaultSize: Size = lead ? "lg" : "md";
  return (
    <Reveal delay={delay}>
      <div
        className={`font-serif-body ${baseSizeClass("body", defaultSize)} ${
          lead ? "text-[#f2ede6]/85" : "text-[#f2ede6]/65"
        } ${formatClasses(ck, "body", defaultSize)} ${className}`}
        {...editableProps(ck, text, "body", true)}
      >
        <RichText text={text} />
      </div>
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
            <span
              className={`type-caption text-[#f2ede6]/55 ${formatClasses(
                captionCk,
                "label"
              )}`}
              {...editableProps(captionCk, t(captionCk), "label")}
            >
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
