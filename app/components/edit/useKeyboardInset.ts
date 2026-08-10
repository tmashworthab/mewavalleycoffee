"use client";

import { useEffect, useState } from "react";

/**
 * How far the on-screen keyboard covers the bottom of the window.
 *
 * A `position: fixed; bottom: 0` bar sits against the layout viewport, which
 * a phone keyboard happily covers. The visual viewport reports what is
 * actually on screen, so the bar can be lifted clear of it.
 */
export default function useKeyboardInset(): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      // Everything below the visual viewport is covered — keyboard or toolbar.
      const covered = window.innerHeight - vv.height - vv.offsetTop;
      // Ignore small values so ordinary browser chrome does not shift the bar.
      setInset(covered > 80 ? Math.round(covered) : 0);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return inset;
}
