"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { IMG, NAV, img } from "@/lib/data";
import { ArrowRight, EASE } from "./ui";

export default function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200);
    setSolid(v > 40);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: hidden ? -90 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div
          className={`mx-auto flex h-[68px] max-w-[1441px] items-center justify-between px-[34px] transition-[background,backdrop-filter] duration-500 ${
            solid ? "bg-white/55 backdrop-blur-xl" : ""
          }`}
        >
          <a href="#top" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(IMG.logo, 400)} alt="Bandlik" className="h-[28px] w-auto" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setActive(i)}
                className={`relative text-[18px] font-semibold leading-[22px] transition-colors duration-300 hover:text-blue ${
                  active === i ? "text-blue" : "text-ink/60"
                }`}
              >
                {n.label}
                <sup className="ml-[1px] align-super text-[10px] font-medium opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </sup>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden h-[34px] items-center rounded-full bg-card px-5 text-[17px] sm:flex"
            >
              Kirish
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="grid size-9 place-items-center lg:hidden"
            >
              <span className="block h-[2px] w-5 bg-ink before:mt-[-6px] before:block before:h-[2px] before:w-5 before:bg-ink after:mt-[10px] after:block after:h-[2px] after:w-5 after:bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-white px-[34px] lg:hidden"
        initial={false}
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {NAV.map((n) => (
          <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between text-[34px] font-semibold tracking-tight">
            {n.label}
            <ArrowRight />
          </a>
        ))}
      </motion.div>
    </>
  );
}
