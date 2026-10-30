"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const COLS = 5;

/** Blue wall of five columns: a progress bar fills, then the columns split at the horizontal center, top halves sliding up and bottom halves sliding down, left to right. */
export default function Loader({ onOpen }: { onOpen: () => void }) {
  const p = useMotionValue(0);
  const width = useTransform(p, (v) => `${v}%`);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // right after a language switch the intro is skipped (flag set in the root layout)
    if (document.documentElement.hasAttribute("data-no-intro")) {
      queueMicrotask(() => setGone(true));
      onOpen();
      return;
    }
    const c = animate(p, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setOpen(true);
        onOpen();
        setTimeout(() => setGone(true), 2600);
      },
    });
    return () => c.stop();
  }, [p, onOpen]);

  if (gone) return null;

  return (
    <div data-loader className="pointer-events-none fixed inset-0 z-[80]">
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} className="relative h-full flex-1">
            {(["top", "bottom"] as const).map((half) => (
              <motion.div
                key={half}
                className={`absolute inset-x-0 h-1/2 ${half === "top" ? "top-0" : "bottom-0"}`}
                style={{ background: "linear-gradient(to bottom, #8fd3f6 0%, #4b7fd6 38%, #0759db 100%)" }}
                initial={{ y: 0 }}
                animate={{ y: open ? (half === "top" ? "-101%" : "101%") : 0 }}
                transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: open ? i * 0.14 : 0 }}
              />
            ))}
          </div>
        ))}
      </div>
      <motion.div
        className="absolute inset-x-0 top-0 h-[7px] bg-white/80"
        style={{ width }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
