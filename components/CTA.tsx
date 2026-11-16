"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { MEDIA } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import { FadeUp, PillButton, SplitReveal } from "./ui";

/** The three entry points (job seeker / employer / agency), used in the home hero and the closing CTA. */
export function AudienceButtons({ className = "" }: { className?: string }) {
  const { lang, dict } = useI18n();
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <PillButton href={localizedHref(lang, "/vacancies")}>{dict.common.lookingForJob}</PillButton>
      <PillButton href={localizedHref(lang, "/employers")}>{dict.common.needWorkers}</PillButton>
      <PillButton href={localizedHref(lang, "/contact")}>{dict.common.agency}</PillButton>
    </div>
  );
}

/** Closing call-to-action above the footer: full-bleed photo, centered title and the three entry points. */
export default function CTA() {
  const t = useI18n().dict.cta;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative z-20 h-[clamp(560px,47.5vw,760px)] overflow-hidden bg-[#f2f2f2]">
      <motion.div className="absolute inset-x-0 -top-[12%] h-[124%]" style={{ y }}>
        <Image src={MEDIA.cta} alt="" fill sizes="100vw" className="object-cover object-top" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-[#0b0d12]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-[clamp(40px,3.5vw,56px)] flex flex-col items-center px-5 text-center">
        <SplitReveal
          as="h2"
          className="max-w-[1000px] font-mona text-[clamp(38px,4.9vw,70px)] font-medium leading-[0.9] tracking-[-0.07em] text-[#f2f2f2]"
          text={t.title}
        />
        <FadeUp delay={0.15}>
          <p className="mt-5 font-mona text-[clamp(16px,1.4vw,20px)] font-normal leading-[1.3] tracking-[-0.02em] text-[#b5b5b5]">{t.text}</p>
        </FadeUp>
        <FadeUp delay={0.25}>
          <AudienceButtons className="mt-8 justify-center" />
        </FadeUp>
      </div>
    </section>
  );
}
