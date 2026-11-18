"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "./I18nProvider";
import { EASE, FadeUp, Label } from "./ui";

/** Thin 18px plus drawn with two 2px bars; the vertical bar folds away into a minus when the answer is open. */
function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-[18px] shrink-0" aria-hidden>
      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#29292b]" />
      <motion.span
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-[#29292b]"
        animate={{ scaleY: open ? 0 : 1, rotate: open ? 90 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </span>
  );
}

/**
 * FAQ as on the Framer site (measured at 2240px): a plain rule, the label in a 457px column, and an 888px list of
 * 71px rows — number, question 285px further, thin plus on the right — all collapsed until clicked.
 */
export default function FAQ() {
  const { dict } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative z-20 bg-white">
      <div className="mx-auto max-w-[2240px] px-[clamp(20px,2.8vw,40px)] pb-[120px]">
        <div className="h-px bg-[#eaeaea]" />
        <div className="grid gap-6 lg:grid-cols-[457px_minmax(0,1fr)] lg:gap-0">
          <div className="pt-[51px] lg:sticky lg:top-[100px] lg:self-start">
            <Label className="[&>span]:size-[13px]">{dict.faq.label}</Label>
          </div>
          <ul className="lg:pt-[29px]">
            {Object.entries(dict.faq.items).map(([key, { question: q, answer: a }], i) => (
              <FadeUp key={key} delay={i * 0.04}>
                <li className="border-b border-[#eaeaea]">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="group flex w-full items-start py-[22px] text-left text-[18px] font-medium leading-[26px] text-[#29292b]"
                    aria-expanded={open === i}
                  >
                    <span className="w-[clamp(48px,20vw,285px)] shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 pr-6 transition-colors group-hover:text-blue">{q}</span>
                    <span className="block shrink-0 pt-1">
                      <PlusIcon open={open === i} />
                    </span>
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
                        <p className="pb-[22px] pl-[clamp(48px,20vw,285px)] pr-12 text-[18px] leading-6 text-soft">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
