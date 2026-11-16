"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { MEDIA } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import { EASE, FadeUp, Label, PillButton, SplitReveal } from "./ui";

function StepImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className="relative mt-6 aspect-[623/300] overflow-hidden rounded-[10px]">
      <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

/** Employers page: sticky intro on the left, four numbered steps with photos scrolling on the right. */
export default function Workflow() {
  const { lang, dict } = useI18n();
  const t = dict.pages.employers.workflow;
  const steps = Object.values(t.steps);
  return (
    <section className="relative z-20 bg-[#f7f7f7]">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-[clamp(20px,2.8vw,40px)] py-[clamp(70px,6.5vw,93px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-[clamp(40px,4vw,80px)]">
        <div className="lg:sticky lg:top-[120px] lg:self-start lg:pl-5">
          <Label>{t.label}</Label>
          <SplitReveal
            className="mt-8 max-w-[560px] text-[clamp(40px,4.4vw,64px)] font-semibold leading-[0.95] tracking-[-0.035em] text-[#1e1e1e]"
            text={t.title}
          />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[521px] text-[18px] leading-[1.6] text-mute">{t.text}</p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-9">
            <PillButton href={localizedHref(lang, "/contact")}>{dict.common.requestWorkers}</PillButton>
          </FadeUp>
        </div>

        <ol className="space-y-[clamp(56px,6vw,90px)]">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="grid grid-cols-[auto_1fr] gap-x-[clamp(16px,2vw,28px)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: EASE }}
            >
              <span className="w-[clamp(52px,5.6vw,82px)] text-[clamp(36px,3.5vw,50px)] font-bold leading-none tracking-[-0.04em] text-[#969696]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[clamp(22px,1.8vw,26px)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#252e3d]">{s.title}</h3>
                <p className="mt-3 text-[18px] leading-[1.6] text-[#252e3d]/80">{s.text}</p>
                <StepImage src={MEDIA.employers.steps[i]} alt={s.title} />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
