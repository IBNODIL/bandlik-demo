"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { img } from "@/lib/data";
import StepEdge from "./StepEdge";

/** Full-bleed image with parallax; the stepped white edge rises over it as it scrolls away. */
export default function FullImage({ id, alt }: { id: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.02]);
  const edge = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(edge.scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <div ref={ref} className="relative z-10 h-[100svh] min-h-[560px] bg-card">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-x-0 -top-[14%] h-[128%]" style={{ y, scale }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(id, 2400)} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
      </div>
      <StepEdge progress={p} />
    </div>
  );
}
