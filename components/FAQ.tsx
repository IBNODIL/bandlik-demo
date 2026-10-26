"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQ as ITEMS } from "@/lib/data";
import { EASE, FadeUp, Label, PlusRule } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-20 bg-white pt-[40px]">
      <PlusRule />
      <div className="mx-auto grid max-w-[1441px] gap-8 px-[38px] pb-[110px] pt-[28px] lg:grid-cols-[382px_1fr]">
        <div className="lg:sticky lg:top-[100px] lg:self-start">
          <Label>FAQ — ko‘p beriladigan savollar</Label>
        </div>
        <ul className="border-t border-ink/[0.07]">
          {ITEMS.map(([q, a], i) => (
            <FadeUp key={q} delay={i * 0.04}>
              <li className="border-b border-ink/[0.07]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="group flex w-full items-center gap-6 py-[22px] text-left"
                  aria-expanded={open === i}
                >
                  <span className="w-[200px] shrink-0 font-mono text-[13px] text-ink/60 max-sm:w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[16px] transition-colors group-hover:text-blue">{q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-[24px] leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-[224px] pr-12 text-[16px] leading-6 text-mute max-sm:pl-14">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
