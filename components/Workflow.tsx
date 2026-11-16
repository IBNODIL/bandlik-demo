"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { MEDIA } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import { EASE } from "./ui";

/** Phosphor "path" glyph: two nodes joined by a winding route. */
function PathIcon() {
  return (
    <svg viewBox="0 0 256 256" className="size-[22px] shrink-0" fill="currentColor" aria-hidden>
      <path d="M200,168a32.06,32.06,0,0,0-31,24H72a32,32,0,0,1,0-64h96a40,40,0,0,0,0-80H72a8,8,0,0,0,0,16h96a24,24,0,0,1,0,48H72a48,48,0,0,0,0,96h96.05A32,32,0,1,0,200,168Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,200,216Z" />
    </svg>
  );
}

/**
 * "Jarayon" on the employers page, from the Framer page measured at 1440px: a pinned intro on the left, and five
 * steps on the right hanging off a thin vertical line — big blue number on the line, title, text, 594×281 photo.
 */
export default function Workflow() {
  const t = useI18n().dict.pages.employers.workflow;
  const steps = Object.values(t.steps);
  return (
    <section className="relative z-20 bg-[#f9f9f9]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-[clamp(20px,6.5vw,94px)] pb-[60px] pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,692px)] lg:gap-0 lg:pb-[88px] lg:pr-[clamp(20px,6.5vw,94px)]">
        <div className="lg:sticky lg:top-[195px] lg:self-start lg:pr-10">
          <div className="flex items-center gap-2 text-[18px] leading-[26px] text-[#4a5ec9]">
            <PathIcon />
            {t.label}
          </div>
          <h2 className="mt-5 max-w-[520px] text-[clamp(34px,3.2vw,46px)] font-semibold leading-[1.07] tracking-[-0.02em] text-[#2b3245]">{t.title}</h2>
          <p className="mt-5 max-w-[500px] text-[16px] leading-[27px] text-[#3b4150]">{t.text}</p>
        </div>

        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 pb-[60px] sm:grid-cols-[74px_minmax(0,1fr)] sm:gap-x-6 lg:pb-[81px]">
              <div className="relative flex justify-center">
                <span className="relative z-10 block h-[50px] bg-[#f9f9f9] text-[clamp(34px,3.4vw,49px)] font-bold leading-[50px] tracking-[-0.03em] text-[#4059c9]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-[6px] left-1/2 top-[59px] w-px bg-[#d6d6d6]" aria-hidden />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <h3 className="text-[clamp(20px,1.7vw,24px)] font-medium leading-9 tracking-[-0.01em] text-[#252e3d]">{s.title}</h3>
                <p className="mt-[6px] text-[16px] leading-[27px] text-[#3b4150]">{s.text}</p>
                <div className="relative mt-5 aspect-[794/375] overflow-hidden rounded-[16px] bg-card">
                  <Image src={MEDIA.employers.steps[i]} alt={s.title} fill sizes="(min-width: 1024px) 594px, 100vw" className="object-cover" />
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
