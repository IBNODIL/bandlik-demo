"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/** Column blocks (width = 1/5 viewport) that rise at different speeds, giving the stepped white edge over the hero. */
const COLS = [0.5, 0.72, 1, 0.6, 0.42];
const MAX_RISE = 300;

function Step({ i, p }: { i: number; p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], [0, -MAX_RISE * COLS[i]]);
  return (
    <motion.div
      className="absolute top-0 bg-white"
      // 1px overlap so no hairline seam can show between neighbouring blocks
      style={{ left: `${i * 20}%`, width: "calc(20% + 1px)", height: MAX_RISE + 120, y }}
    />
  );
}

/** Stepped white edge anchored to the bottom of its parent; rises as progress goes 0 -> 1. */
export default function StepEdge({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0">
      {COLS.map((_, i) => (
        <Step key={i} i={i} p={progress} />
      ))}
    </div>
  );
}
