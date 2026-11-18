"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { EASE, FadeUp, SectionHead, SplitReveal } from "./ui";

export type PartnerItem = { key: string; title: string; text: string; logo: string; group: number };

function PlusDot({ open }: { open: boolean }) {
  return (
    <span className={`relative grid size-[21px] shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? "bg-blue text-white" : "bg-[#dfe6fb] text-blue"}`} aria-hidden>
      <span className="absolute h-[2px] w-[9px] rounded-full bg-current" />
      <motion.span className="absolute h-[9px] w-[2px] rounded-full bg-current" animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.35, ease: EASE }} />
    </span>
  );
}

/**
 * Warm-grey "Awards" block of the Framer site (employers and job-seekers pages, measured at 2240px): caption row,
 * big heading, intro and plus-tabs on the left; partner row cards (logo tile, name, description, pill) on the right.
 * A tab narrows the list to its group; clicking it again shows all rows.
 */
export default function PartnerBlock({
  label,
  title,
  mark,
  text,
  tabs,
  items,
  numbered = false,
  leftWidth = 478,
  rightWidth = 694,
}: {
  label: string;
  title: string;
  /** appended after the heading, e.g. the ® sign */
  mark?: ReactNode;
  text: string;
  tabs: string[];
  items: PartnerItem[];
  /** pill shows the row number (employers) instead of staying empty (job seekers) */
  numbered?: boolean;
  leftWidth?: number;
  rightWidth?: number;
}) {
  const [tab, setTab] = useState<number | null>(null);
  const visible = tab === null ? items : items.filter((it) => it.group === tab);
  return (
    <section className="relative z-20 bg-card">
      <div className="mx-auto max-w-[2240px] px-[clamp(20px,2.8vw,40px)] py-[40px]">
        <SectionHead label={label} noteEnd />
        <div
          className="grid gap-12 pb-[clamp(60px,6vw,86px)] pt-[clamp(40px,5.2vw,74px)] lg:justify-between lg:[grid-template-columns:minmax(0,var(--l))_minmax(0,var(--r))]"
          style={{ "--l": `${leftWidth}px`, "--r": `${rightWidth}px` } as React.CSSProperties}
        >
          <div>
            <SplitReveal
              className="text-[clamp(44px,6vw,86px)] font-semibold leading-[0.82] tracking-[-0.035em] text-[#1e1e1e]"
              text={title}
              suffix={mark}
            />
            <FadeUp delay={0.1}>
              <p className="mt-[34px] max-w-[580px] text-[16px] leading-[23px] text-mute">{text}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <ul className="mt-[31px] border-t border-[#dcdcdc] pt-[19px]">
                {tabs.map((h, i) => (
                  <li key={h}>
                    <button
                      type="button"
                      onClick={() => setTab(tab === i ? null : i)}
                      aria-pressed={tab === i}
                      className="flex h-10 w-full items-center gap-[10px] text-left text-[16px] font-medium text-[#1e1e1e] transition-colors hover:text-blue"
                    >
                      <PlusDot open={tab === i} />
                      {h}
                    </button>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <ul className="space-y-[14px]">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((it) => (
                <motion.li
                  key={it.key}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex items-center gap-[18px] rounded-[14px] border border-white/70 bg-[#ececec] p-[14px]"
                >
                  <span className="relative grid size-[64px] shrink-0 place-items-center rounded-[10px] bg-white">
                    <Image src={it.logo} alt="" width={22} height={22} className="size-[22px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] font-medium leading-[23px] text-[#111]">{it.title}</h3>
                    <p className="mt-[2px] text-[16px] leading-[19px] text-[#5c5c5c]">{it.text}</p>
                  </div>
                  {numbered ? (
                    <span className="hidden h-9 min-w-[61px] shrink-0 place-items-center rounded-full bg-[#e0e0e0] px-3 text-[15px] font-semibold text-[#222] sm:grid">
                      {String(items.indexOf(it) + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span className="mr-[6px] hidden h-4 w-[37px] shrink-0 rounded-full bg-[#e3e3e3] sm:block" aria-hidden />
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}
