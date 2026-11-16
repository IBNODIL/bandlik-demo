"use client";

import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CLIENT_LOGOS, MEDIA, STATS } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";
import { formatNumber } from "@/lib/format";
import BgShade from "./BgShade";
import { useI18n } from "./I18nProvider";
import { EASE, FadeUp, Label, Marquee, PillButton, PlusRule, SplitReveal } from "./ui";

function Info({ title, body }: { title: string; body: string }) {
  return (
    <FadeUp className="border-y border-ink/[0.07] py-8">
      <h3 className="text-[clamp(16px,1.15vw,24px)] leading-[1.35] text-ink">{title}</h3>
      <p className="mt-6 max-w-[28vw] min-w-[260px] text-[clamp(16px,1.15vw,24px)] leading-[1.35] text-mute">{body}</p>
    </FadeUp>
  );
}

function PhotoCard({ src, alt, i }: { src: string; alt: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div
      ref={ref}
      className="relative aspect-[1204/860] overflow-hidden rounded-lg bg-card"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
    >
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/** Number that counts up from 0 the first time it scrolls into view. */
function CountUp({ value }: { value: number }) {
  const { lang } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(lang, n)}+
    </span>
  );
}

export default function About() {
  const { lang, dict } = useI18n();
  const t = dict.about;
  const stats = Object.entries(dict.stats) as [keyof typeof STATS, { label: string; text: string }][];
  return (
    <section id="about" className="relative z-20 bg-white">
      <BgShade />

      <PlusRule className="relative top-[2px]" />

      <div className="relative w-full px-[clamp(20px,2.6vw,38px)] pt-[28px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[26.4vw_1fr]">
          <Label className="pt-[10px]">{t.label}</Label>
          <div className="lg:pr-[40px]">
            <SplitReveal
              as="p"
              className="text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1e1e1e] sm:text-[48px] lg:text-[clamp(48px,3.45vw,72px)]"
              indent={156}
              text={t.heading}
            />
            <FadeUp delay={0.2} className="mt-12">
              <PillButton href={localizedHref(lang, "/employers")}>{dict.common.requestWorkers}</PillButton>
            </FadeUp>
            <div className="mt-[56px] grid gap-x-[5.6vw] md:grid-cols-2">
              {Object.entries(t.info).map(([key, it]) => (
                <Info key={key} title={it.title} body={it.body} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[clamp(70px,5.8vw,112px)] grid grid-cols-1 gap-[18px] md:grid-cols-3 lg:gap-[1.3vw]">
          <PhotoCard src={MEDIA.worker} alt={t.photoAlt.worker} i={0} />
          <PhotoCard src={MEDIA.chef} alt={t.photoAlt.chef} i={1} />
          <PhotoCard src={MEDIA.warehouse} alt={t.photoAlt.warehouse} i={2} />
        </div>

        <div className="mt-[clamp(60px,5.2vw,100px)] grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map(([key, s], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
            >
              <p className="text-[clamp(64px,7.5vw,108px)] font-semibold leading-[1.18] tracking-[-0.09em] text-[#1e1e1e]">
                <CountUp value={STATS[key]} />
              </p>
              <h3 className="mt-6 text-[clamp(16px,1.25vw,20px)] font-semibold leading-[1.3] text-[#29292b]">{s.label}</h3>
              <p className="mt-2 max-w-[260px] text-[clamp(14px,1.05vw,16px)] leading-[1.4] text-soft">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <PlusRule className="relative mt-[clamp(70px,5.8vw,112px)]" />
      <div className="mt-[clamp(70px,7.8vw,150px)] border-y border-ink/[0.07]">
        <h2 className="sr-only">{dict.clients}</h2>
        <Marquee duration={40}>
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((c, i) => (
            <div
              key={i}
              className="grid h-[clamp(110px,11.7vw,225px)] w-[clamp(220px,18.6vw,268px)] shrink-0 place-items-center border-r border-ink/[0.07]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={i < CLIENT_LOGOS.length ? c.name : ""} className="h-[clamp(36px,3.8vw,55px)] w-auto max-w-[70%] object-contain" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
