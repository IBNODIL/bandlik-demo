"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ locked }: { locked: boolean }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const l = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!l) return;
    if (locked) l.stop();
    else l.start();
  }, [locked]);

  return null;
}
