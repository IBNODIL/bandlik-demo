"use client";

import { JOB } from "@/lib/data";
import BgShade from "./BgShade";
import { useI18n } from "./I18nProvider";
import { FadeUp, Label, Marquee, PillButton, PlusRule, SplitReveal } from "./ui";

function Flag() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" className="shrink-0 rounded-full">
      <defs>
        <clipPath id="flag-clip">
          <circle cx="17" cy="17" r="17" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip)">
        <rect width="34" height="12" fill="#fff" />
        <rect y="11" width="34" height="12" fill="#0b4ea2" />
        <rect y="22" width="34" height="12" fill="#ee1c25" />
        <path d="M9 7h9v9c0 4-4 6-4.5 6S9 20 9 16z" fill="#ee1c25" stroke="#fff" strokeWidth="1" />
      </g>
    </svg>
  );
}

function Row({ icon, label, value, sub }: { icon: string; label: string; value?: string; sub?: string }) {
  return (
    <div className="flex items-start gap-2 text-[14px] leading-5">
      <span className="mt-[1px] grid size-5 shrink-0 place-items-center rounded-md bg-blue/10 text-[11px] text-blue">
        {icon}
      </span>
      <div className="font-sans">
        <span className="text-black">{label}</span>{" "}
        {value && <span className="font-gilroy font-medium text-ink">{value}</span>}
        {sub && <div className="text-[12px] leading-[18px] text-black">{sub}</div>}
      </div>
    </div>
  );
}

export function JobCard() {
  const { dict } = useI18n();
  const job = dict.content.job;
  const card = dict.vacancies.card;
  return (
    <article className="mr-[28px] w-[286px] shrink-0 rounded-2xl bg-white p-[14px] shadow-[0_2px_18px_rgba(9,9,9,0.08)] ring-1 ring-ink/[0.04] transition-transform duration-500 hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <Flag />
        <div className="min-w-0 flex-1 font-gilroy">
          <h3 className="text-[16px] font-semibold leading-[22px] text-ink">{job.title}</h3>
          <p className="text-[14px] font-medium leading-5 text-blue">{job.place}</p>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-soft">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z" />
          </svg>
          {JOB.likes}
        </div>
      </div>
      <div className="mt-4 space-y-[10px]">
        <Row icon="$" label={card.salary} value={JOB.salary} sub={job.salaryLocal} />
        <Row icon="◷" label={card.type} value={job.type} />
        <Row icon="▣" label={card.deadline} value={JOB.deadline} />
        <Row icon="☺" label={card.hired} value={JOB.hired} />
        <Row icon="✎" label={card.applied} value={JOB.applied} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-2">
        <PillButton href="#vacancies" className="!h-[50px] flex-1 !pr-5">
          {dict.common.details}
        </PillButton>
        <button
          aria-label={dict.common.share}
          className="grid size-[44px] shrink-0 place-items-center rounded-full bg-blue text-white transition-transform duration-500 hover:scale-110"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function Vacancies() {
  const { dict } = useI18n();
  const t = dict.vacancies;
  const cards = Array.from({ length: 5 });
  return (
    <section id="vacancies" className="relative z-20 overflow-hidden bg-white pt-[clamp(70px,6vw,120px)]">
      <BgShade flip />
      <PlusRule />
      <div className="mx-auto max-w-[1441px] px-[38px] pt-[28px]">
        <div className="flex justify-between">
          <Label>{t.label}</Label>
          <span className="text-[18px] text-[#29292b]">©2026</span>
        </div>
        <div className="mt-[60px] flex flex-col items-center text-center">
          <SplitReveal
            className="text-[clamp(48px,7.6vw,110px)] font-semibold leading-[0.9] tracking-[-0.03em] text-[#1e1e1e]"
            text={t.heading}
          />
          <FadeUp delay={0.15}>
            <p className="mt-6 text-[18px] leading-6 text-soft">{t.intro}</p>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-8">
            <PillButton href="#vacancies">{t.cta}</PillButton>
          </FadeUp>
        </div>
      </div>
      <div className="mt-[16px] pb-[66px]">
        <Marquee duration={70} className="py-6">
          {cards.map((_, i) => (
            <JobCard key={i} />
          ))}
        </Marquee>
        <Marquee duration={80} reverse className="-mt-2 py-6">
          {cards.map((_, i) => (
            <JobCard key={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
