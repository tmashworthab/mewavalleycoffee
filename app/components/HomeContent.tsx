"use client";
import Hero from "./home/Hero";
import Premise from "./home/Premise";
import Coffee from "./home/Coffee";
import Origins from "./home/Origins";
import Invitation from "./home/Invitation";
import Filmstrip from "./home/Filmstrip";
import { homeSections, SECTION_LABELS, type SectionId } from "../lib/sections";

/**
 * The page is assembled from the stored section order rather than a fixed
 * sequence, so it can be rearranged from the editor. data-section marks each
 * one for the reorder panel.
 */
const SECTIONS: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  premise: Premise,
  coffee: Coffee,
  origins: Origins,
  invitation: Invitation,
  filmstrip: Filmstrip,
};

export default function HomeContent() {
  return (
    <>
      {homeSections().map((id) => {
        const Component = SECTIONS[id];
        return (
          <div key={id} data-section={id} data-section-label={SECTION_LABELS[id]}>
            <Component />
          </div>
        );
      })}
    </>
  );
}
