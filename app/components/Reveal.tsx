"use client";
import { useEffect, useRef, useState } from "react";

type Variant = "up" | "fade" | "rule" | "mask";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  as?: "div" | "section" | "figure" | "li" | "span";
}

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-6",
  fade: "opacity-0",
  rule: "opacity-100 scale-x-0",
  mask: "opacity-0 translate-y-10",
};

const shown: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  fade: "opacity-100",
  rule: "opacity-100 scale-x-100",
  mask: "opacity-100 translate-y-0",
};

const duration: Record<Variant, string> = {
  up: "duration-[900ms]",
  fade: "duration-[1200ms]",
  rule: "duration-[1100ms]",
  mask: "duration-[1400ms]",
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  threshold = 0.12,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion is handled in CSS (see the [data-reveal] override in
    // globals.css) so content stays visible even before this effect runs.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal=""
      className={`transition-all ${duration[variant]} ease-out-expo ${
        visible ? shown[variant] : hidden[variant]
      } ${variant === "rule" ? "origin-left" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
