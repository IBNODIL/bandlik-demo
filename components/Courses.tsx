"use client";

import BgShade from "./BgShade";
import { IMG, img } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import { FadeUp, Label, Marquee, PillButton, PlusRule, SplitReveal } from "./ui";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[6px] rounded-full bg-card px-3 py-[5px] font-sans text-[11px] text-ink">
      <span className="size-[9px] rounded-[2px] bg-blue" />
      {children}
    </span>
  );
}

function CourseCard() {
  const COURSE = useI18n().dict.content.course;
  return (
    <article className="group mr-[14px] w-[286px] shrink-0">
      <div className="aspect-[686/386] overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(IMG.course, 800)}
          alt={COURSE.tag}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-gilroy text-[14px] font-semibold">{COURSE.tag}</h3>
      <p className="mt-1 font-sans text-[12px] text-mute">{COURSE.title}</p>
      <div className="mt-3 flex gap-2">
        <Chip>{COURSE.price}</Chip>
        <Chip>{COURSE.hours}</Chip>
        <Chip>{COURSE.lessons}</Chip>
      </div>
    </article>
  );
}

export default function Courses() {
  const t = useI18n().dict.courses;
  const cards = Array.from({ length: 5 });
  return (
    <section className="relative z-20 overflow-hidden bg-white pt-[clamp(70px,6vw,120px)]">
      <BgShade />
      <PlusRule />
      <div className="mx-auto max-w-[1441px] px-[38px] pt-[28px]">
        <div className="flex justify-between">
          <Label>{t.label}</Label>
          <span className="text-[18px] text-[#29292b]">©2026</span>
        </div>
        <div className="mt-[60px] flex flex-col items-center text-center">
          <SplitReveal
            className="max-w-[1000px] text-[clamp(48px,7.6vw,110px)] font-semibold leading-[0.9] tracking-[-0.03em] text-[#1e1e1e]"
            text={t.heading}
          />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-[520px] text-[16px] leading-6 text-soft">{t.intro}</p>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-8">
            <PillButton href="#">{t.cta}</PillButton>
          </FadeUp>
        </div>
      </div>
      <div className="mt-[50px] space-y-[28px] pb-[90px]">
        <Marquee duration={80}>
          {cards.map((_, i) => (
            <CourseCard key={i} />
          ))}
        </Marquee>
        <Marquee duration={90} reverse>
          {cards.map((_, i) => (
            <CourseCard key={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
