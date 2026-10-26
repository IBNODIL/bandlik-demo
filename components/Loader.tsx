"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const p = useMotionValue(0);
  const width = useTransform(p, (v) => `${v}%`);

  useEffect(() => {
    const c = animate(p, 100, { duration: 1.6, ease: [0.65, 0, 0.35, 1], onComplete: () => setTimeout(onDone, 150) });
    return () => c.stop();
  }, [p, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div className="h-[7px] bg-blue" style={{ width }} />
      <motion.div
        className="absolute bottom-9 left-[34px] text-[14px] text-paper/60"
        exit={{ opacity: 0 }}
      >
        Bandlik
      </motion.div>
    </motion.div>
  );
}
