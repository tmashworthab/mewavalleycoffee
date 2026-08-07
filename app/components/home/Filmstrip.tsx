"use client";

import Image, { type StaticImageData } from "next/image";
import { useContent } from "../../lib/locale-context";
import ridge from "../../media/nepal-ridge.jpg";
import road from "../../media/nepal-road.jpg";
import valley from "../../media/nepal-valley.jpg";
import farmhouse from "../../media/nepal-farmhouse.jpg";
import cherry from "../../media/coffee-cherry.jpg";

const FRAMES: { src: StaticImageData; ck: string }[] = [
  { src: valley, ck: "gallery.altValley" },
  { src: road, ck: "gallery.altRoad" },
  { src: farmhouse, ck: "gallery.altFarmhouse" },
  { src: cherry, ck: "gallery.altCherry" },
  { src: ridge, ck: "gallery.altRidge" },
];

/**
 * A continuously drifting strip of photographs, closing the page.
 *
 * The list is rendered twice and translated by exactly half its width, which
 * makes the loop seamless — at the moment the animation resets, the second
 * copy sits precisely where the first began. The duplicate is hidden from
 * assistive technology so the photographs are announced only once.
 */
export default function Filmstrip() {
  const { t } = useContent();

  const strip = (duplicate: boolean) => (
    <ul
      className="filmstrip-track flex shrink-0 list-none m-0 p-0"
      aria-hidden={duplicate || undefined}
    >
      {FRAMES.map(({ src, ck }) => (
        <li key={ck} className="shrink-0 pr-3 sm:pr-5">
          <div className="relative h-[38svh] sm:h-[52svh] w-auto overflow-hidden grain">
            <Image
              src={src}
              alt={duplicate ? "" : t(ck)}
              placeholder="blur"
              sizes="(max-width: 640px) 60vw, 40vw"
              className="h-full w-auto max-w-none object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="relative py-20 sm:py-28 border-t border-[#c9a468]/10"
      aria-label={t("gallery.label")}
    >
      <div className="filmstrip-scroller overflow-hidden">
        <div className="filmstrip flex w-max">
          {strip(false)}
          {strip(true)}
        </div>
      </div>
    </section>
  );
}
