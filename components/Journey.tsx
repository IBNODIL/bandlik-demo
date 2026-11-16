"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import { EASE, FadeUp, PlusRule, SectionHead, SplitReveal } from "./ui";

/** Five dots, the first `step` of them blue: how far along the five steps this card is. */
function Dots({ step }: { step: number }) {
  return (
    <span className="flex gap-[6px] pt-[1px]" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`size-[10px] rounded-full ${i <= step ? "bg-blue" : "bg-[#d9d9d9]"}`} />
      ))}
    </span>
  );
}

/**
 * "How it works — in 5 steps" (Framer's "Experience" section, measured at 1440px): centered badge, 72px heading and
 * intro, then 435×307 warm-grey step cards (number + progress dots on top, title and text at the bottom) in a
 * 3-column grid, with a photo card in the sixth cell.
 */
export default function Journey() {
  const { lang, dict } = useI18n();
  const t = dict.journey;
  const steps = Object.values(dict.process.steps);
  return (
    <section className="relative z-20 bg-white pt-[clamp(70px,8.4vw,120px)]">
      <PlusRule className="!mx-[clamp(20px,2.8vw,40px)]" />
      <div className="mx-auto max-w-[1425px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(70px,8.4vw,120px)] pt-[34px]">
        <SectionHead label={t.label} noteEnd />
        <div className="mt-11 flex flex-col items-center text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-[9px] rounded-[10px] bg-[#2e38ff]/10 px-[13px] py-[7.5px] text-[14px] font-semibold leading-6 text-blue">
              <svg viewBox="0 0 256 256" className="size-[17px] shrink-0" fill="currentColor" aria-hidden>
                <path opacity="0.2" d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" />
                <path d="M221.35,104.11a8,8,0,0,0-6.57,9.21A88.85,88.85,0,0,1,216,128a87.62,87.62,0,0,1-22.24,58.41,79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75A88,88,0,0,1,128,40a88.76,88.76,0,0,1,14.68,1.22,8,8,0,0,0,2.64-15.78,103.92,103.92,0,1,0,85.24,85.24A8,8,0,0,0,221.35,104.11ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM237.66,45.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L200,60.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
              </svg>
              {t.badge}
            </span>
          </FadeUp>
          <SplitReveal
            className="mt-9 max-w-[1000px] text-[clamp(40px,5vw,72px)] font-semibold leading-[1.03] tracking-[-0.042em] text-[#1e1e1e]"
            text={t.title}
          />
          <FadeUp delay={0.15}>
            <p className="mt-[30px] max-w-[800px] text-[18px] leading-6 text-soft">{t.text}</p>
          </FadeUp>
        </div>

        <ol className="mt-[34px] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="flex min-h-[307px] flex-col justify-between rounded-[26px] bg-card px-6 pb-[42px] pt-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[30px] font-bold leading-[35px] tracking-[-0.033em] text-[#29292b]">{String(i + 1).padStart(2, "0")}</span>
                <Dots step={i + 1} />
              </div>
              <div>
                <h3 className="flex items-start gap-[10px] text-[18px] font-semibold leading-[26px] text-[#29292b]">
                  <span className="mt-[7px] size-[13px] shrink-0 rounded-[3px] bg-blue" />
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[387px] text-[18px] leading-6 text-mute">{s.text}</p>
              </div>
            </motion.li>
          ))}
          <motion.li
            className="sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
          >
            <Link
              href={localizedHref(lang, "/vacancies")}
              aria-label={dict.vacancies.cta}
              className="group relative block h-full min-h-[307px] rounded-[20px] bg-[#f6f6f5] p-2 [background-image:repeating-linear-gradient(135deg,#ececeb_0,#ececeb_2px,transparent_2px,transparent_6px)]"
            >
              <span className="relative block h-full min-h-[291px] overflow-hidden rounded-[10px]">
                <Image
                  src={MEDIA.journey}
                  alt={t.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              <span className="absolute inset-0 opacity-0 backdrop-blur-[8px] transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <span className="absolute left-1/2 top-1/2 grid size-[90px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-white ">
                <svg viewBox="0 0 256 256" className="size-[34px]" fill="currentColor" aria-hidden>
                  <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm53.66,93.66-32,32a8,8,0,0,1-11.32,0L112,123.31,85.66,149.66a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0L144,132.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </span>
            </Link>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}
