"use client";

import { motion } from "motion/react";
import { getVacancies } from "@/lib/api/client";
import type { Vacancy } from "@/lib/api/types";
import { useResource } from "@/lib/api/use-resource";
import { fill, formatDate, formatNumber } from "@/lib/format";
import { localizedHref } from "@/lib/i18n";
import BgShade from "./BgShade";
import CountryFlag from "./CountryFlag";
import { useI18n } from "./I18nProvider";
import ResourceState from "./ResourceState";
import { EASE, FadeUp, PillButton, PlusRule, SectionHead, SplitReveal } from "./ui";

const ICON = "/framer/icons";

/**
 * Label · dotted leader · value, as in the Framer card: the value sits on the label's first line, the leader
 * on its last line. An optional second value line (the so'm amount) hangs under the value without widening
 * its column, so the label keeps its room; its background hides the end of the leader behind it.
 */
function Row({ icon, label, value, sub }: { icon: string; label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className={`flex items-start gap-[10px] font-gilroy text-[14px] font-medium leading-5 ${sub ? "min-h-[38px]" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${ICON}/${icon}.svg`} alt="" className="mt-[1px] size-[18px] shrink-0" />
      <div className="flex min-w-0 flex-1 gap-2 self-stretch">
        <span className="min-w-0 text-slate">{label}</span>
        <span className="mb-[5px] min-w-3 flex-1 self-end border-b border-dashed border-[#d0d5dd]" />
        <span className="relative shrink-0 self-start text-ink">
          {value}
          {sub && (
            <span className="absolute right-0 top-full whitespace-nowrap bg-mist pl-2 text-[12px] leading-[18px] text-slate">{sub}</span>
          )}
        </span>
      </div>
    </div>
  );
}

/** Groups thousands with (non-breaking) spaces, as the Framer card shows so'm amounts: "23 500 000". */
const spaced = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function JobCard({ vacancy, i = 0 }: { vacancy: Vacancy; i?: number }) {
  const { lang, dict } = useI18n();
  const t = dict.vacancies;
  const text = { title: vacancy.title[lang], place: vacancy.place[lang] };
  const { durationMonths: months } = vacancy;
  const duration = months
    ? months.min === months.max
      ? fill(t.duration.fixed, { count: months.min })
      : fill(t.duration.range, { min: months.min, max: months.max })
    : t.duration.open;
  return (
    <motion.article
      className="flex flex-col rounded-[22px] bg-paper p-2 ring-1 ring-ink/[0.05] transition-[background-color,box-shadow,translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[5px] hover:bg-white hover:shadow-[0_14px_40px_rgba(9,9,9,0.09)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (i % 4) * 0.07 }}
    >
      <div className="flex h-[60px] items-center gap-[10px] rounded-[20px] bg-mist px-[10px]">
        <CountryFlag code={vacancy.countryCode} size={30} />
        <div className="min-w-0 flex-1 font-gilroy">
          <h3 title={text.title} className="truncate text-[16px] font-semibold leading-[22px] text-ink">
            {text.title}
          </h3>
          <p className="truncate text-[14px] font-medium leading-5 text-blue">{text.place}</p>
        </div>
        <span className="flex shrink-0 items-center gap-[7px] pr-2 font-gilroy text-[12px] font-medium text-slate">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12 20.5s-8-5-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 5.6-8 10.6-8 10.6Z" />
          </svg>
          {formatNumber(lang, vacancy.likes)}
        </span>
      </div>

      <div className="mt-[6px] flex-1 space-y-[13px] rounded-[20px] bg-mist px-[20px] py-[16px]">
        <Row
          icon="cash-gray"
          label={t.card.salary}
          value={`$${formatNumber(lang, vacancy.salaryNetUsd)}`}
          sub={vacancy.salaryLocalUzs ? fill(t.salaryLocal, { amount: spaced(vacancy.salaryLocalUzs) }) : undefined}
        />
        <Row icon="briefcase" label={t.card.type} value={`${t.type[vacancy.employmentType]} • ${duration}`} />
        {vacancy.deadline && <Row icon="clock-vacancy" label={t.card.deadline} value={formatDate(vacancy.deadline)} />}
        <Row
          icon="users-group"
          label={t.card.hired}
          value={
            <>
              {formatNumber(lang, vacancy.hired)}/<span className="text-slate">{formatNumber(lang, vacancy.capacity)}</span>
            </>
          }
        />
        {/* Framer shows this one label without a colon */}
        <Row icon="check-list" label={t.card.applied.replace(/:$/, "")} value={formatNumber(lang, vacancy.applied)} />
      </div>

      <div className="mt-[6px] flex items-center gap-[6px]">
        <div className="min-w-0 flex-1">
          <PillButton href={localizedHref(lang, "/vacancies")} className="w-full">
            {dict.common.details}
          </PillButton>
        </div>
        <button
          type="button"
          aria-label={dict.common.share}
          className="grid size-[54px] shrink-0 place-items-center rounded-full bg-blue text-white transition-transform duration-500 hover:scale-105"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ICON}/share.svg`} alt="" className="size-[16px]" />
        </button>
      </div>
    </motion.article>
  );
}

/**
 * Vacancy grid. On the home page it has the big "Latest vacancies" heading and shows the first rows;
 * the vacancies page shows every vacancy under a plain caption.
 */
export default function Vacancies({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const { lang, dict } = useI18n();
  const t = dict.vacancies;
  const res = useResource(getVacancies);
  const items = res.status === "ready" ? (limit ? res.data.slice(0, limit) : res.data) : [];
  return (
    <section id="vacancies" className="relative z-20 overflow-hidden bg-white pt-[clamp(70px,6vw,120px)]">
      <BgShade flip />
      <PlusRule />
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pt-[28px]">
        <SectionHead label={heading ? t.label : t.pageLabel} />
        {heading && (
          <div className="mt-[60px] flex flex-col items-center text-center">
            <SplitReveal
              className="text-[clamp(48px,7.6vw,110px)] font-semibold leading-[0.82] tracking-[-0.03em] text-[#1e1e1e]"
              text={t.heading}
            />
            <FadeUp delay={0.15}>
              <p className="mt-[30px] max-w-[800px] text-[18px] leading-6 text-soft">{t.intro}</p>
            </FadeUp>
            {limit && (
              <FadeUp delay={0.25} className="mt-[30px]">
                <PillButton href={localizedHref(lang, "/vacancies")}>{t.cta}</PillButton>
              </FadeUp>
            )}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(70px,6vw,110px)] pt-[clamp(40px,4vw,60px)]">
        {res.status !== "ready" || items.length === 0 ? (
          <ResourceState state={res.status === "ready" ? "empty" : res.status} onRetry={res.status === "error" ? res.reload : () => {}} />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-4 gap-y-[34px]">
            {items.map((v, i) => (
              <JobCard key={v.id} vacancy={v} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
