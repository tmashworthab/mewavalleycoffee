"use client";

/**
 * The site's one layout grid.
 *
 * Every section sits in the same container at the same gutters, and every
 * block of content declares its position in columns rather than picking an
 * ad-hoc max-width. That is what makes edges line up down the page: a heading
 * in one section starts on the same vertical as the paragraph three sections
 * below it.
 *
 * Twelve columns on desktop, eight on tablet, four on phones.
 */

export const CONTAINER = "w-full max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16";

/** Standard gutter, used by every grid so columns align across sections. */
export const GUTTER = "gap-x-6 sm:gap-x-8 lg:gap-x-10";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${CONTAINER} ${className}`}>{children}</div>;
}

export function Grid({
  children,
  className = "",
  gapY = "gap-y-12",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gapY?: string;
  /** So a grid of terms can still be a <dl> rather than losing its semantics. */
  as?: "div" | "dl" | "ul" | "ol";
}) {
  return (
    <Tag
      className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 ${GUTTER} ${gapY} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Named column spans, so sections describe intent rather than repeating
 * breakpoint soup. Each covers phone / tablet / desktop.
 */
export const COL = {
  /** Full bleed within the container. */
  full: "col-span-4 md:col-span-8 lg:col-span-12",
  /** The reading column — where body copy lives. */
  text: "col-span-4 md:col-span-8 lg:col-span-7",
  /** A narrower reading column for lead paragraphs beside a rail. */
  textNarrow: "col-span-4 md:col-span-6 lg:col-span-6",
  /** Left rail for eyebrows and labels. */
  rail: "col-span-4 md:col-span-8 lg:col-span-3",
  /** Content that starts after the rail. */
  afterRail: "col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5",
  /** One half of a two-up. */
  half: "col-span-4 md:col-span-4 lg:col-span-6",
  /** Right half, explicitly placed so the gutter is the real grid gutter. */
  halfEnd: "col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7",
} as const;
