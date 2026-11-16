"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import StepEdge from "./StepEdge";

/**
 * Full-bleed photo that sticks to the top of the screen (as in the Framer site): it scrolls in with a light
 * parallax, then stays pinned while the next section slides up over it. The covering section's top edge
 * carries the stepped white blocks, and the photo darkens as it gets covered.
 *
 * Scroll progress is read from a zero-height marker in normal flow just before the photo,
 * because a sticky element's own position changes while it is pinned.
 */
export default function FullImage({ src, alt }: { src: string; alt: string }) {
  const start = useRef<HTMLDivElement>(null);

  // entering: from the photo's top reaching the bottom of the screen until it reaches the top
  const enter = useScroll({ target: start, offset: ["start end", "start start"] }).scrollYProgress;
  const y = useTransform(enter, [0, 1], ["-12%", "0%"]);
  const scale = useTransform(enter, [0, 1], [1.15, 1.02]);

  // being covered: the next section enters the screen as the photo pins, and reaches the top one screen later
  // (measured on the start marker, which tracks reliably; "0 -1" = the marker one screen-height above the top)
  const cover = useScroll({ target: start, offset: ["0 0", "0 -1"] }).scrollYProgress;
  const dim = useTransform(cover, [0.1, 1], [0, 0.6]);
  const steps = useSpring(useTransform(cover, [0, 0.45], [0, 1]), { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <>
      <div ref={start} aria-hidden className="h-0" />
      <div className="sticky top-0 z-10 h-[100svh] min-h-[560px] overflow-hidden bg-card">
        <motion.div className="absolute inset-x-0 -top-[14%] h-[128%]" style={{ y, scale }}>
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0 bg-[#090b12]" style={{ opacity: dim }} />
      </div>
      {/* top edge of the covering section: the stepped white blocks rise from here over the pinned photo */}
      <div aria-hidden className="relative z-20 h-0">
        <StepEdge progress={steps} />
      </div>
    </>
  );
}
