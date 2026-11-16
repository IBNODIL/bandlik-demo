"use client";

import { motion } from "motion/react";
import { EASE, FadeUp, SectionHead, SplitReveal } from "./ui";

type Row = { title: string; text: string };

/** Line icons (24px, stroke) per row key; rows without a match use the check mark. */
const ICONS: Record<string, string> = {
  banks: "M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3z",
  insurance: "M12 3l8 3v6c0 4.5-3.4 8.1-8 9-4.6-.9-8-4.5-8-9V6zM9 12l2 2 4-4",
  documents: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M8.5 13h7M8.5 17h5",
  agencies: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 14.8c1.7.8 2.8 2.6 3 5.2",
  training: "M2 9l10-5 10 5-10 5zM6 11v5c3.5 2.7 8.5 2.7 12 0v-5M22 9v6",
  licensed: "M12 3l2.4 1.8 3-.1.9 2.8 2.4 1.8-.9 2.8.9 2.8-2.4 1.8-.9 2.8-3-.1L12 21l-2.4-1.8-3 .1-.9-2.8-2.4-1.8.9-2.8-.9-2.8 2.4-1.8.9-2.8 3 .1zM9 12l2 2 4-4",
  skills: "M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.8z",
  terms: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9.5 8h5M9.5 12h5M9.5 16h3",
  coordination: "M5 6a2 2 0 1 0 0-.1M19 20a2 2 0 1 0 0-.1M5 8v3a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v1",
};
const CHECK = "M5 12.5l4.5 4.5L19 7.5";

/**
 * Warm-grey block used for "Our partners" (employers) and "Reliable and safe" (job seekers):
 * big heading, intro and highlights on the left, a list of icon rows on the right.
 */
export default function FeatureList({
  label,
  title,
  text,
  highlights,
  rows,
}: {
  label: string;
  title: string;
  text: string;
  highlights: string[];
  rows: Record<string, Row>;
}) {
  return (
    <section className="relative z-20 bg-card">
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] py-[40px]">
        <SectionHead label={label} />
        <div className="grid gap-12 pb-[clamp(30px,4vw,80px)] pt-[clamp(40px,5.6vw,80px)] lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)]">
          <div>
            <SplitReveal
              className="text-[clamp(44px,6.2vw,90px)] font-semibold leading-[0.82] tracking-[-0.035em] text-[#1e1e1e]"
              text={title}
            />
            <FadeUp delay={0.1}>
              <p className="mt-[30px] max-w-[631px] text-[18px] leading-6 text-mute">{text}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <ul className="mt-[50px] space-y-[23px] pl-[33px]">
                {highlights.map((h) => (
                  <li key={h} className="relative text-[17px] font-semibold leading-5 text-[#29292b]">
                    <span className="absolute -left-[33px] top-[1px] grid size-[18px] place-items-center rounded-full bg-blue text-white">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="m2.5 6.2 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <ul className="lg:pl-[clamp(0px,8vw,118px)] lg:pt-[18px]">
            {Object.entries(rows).map(([key, r], i) => (
              <motion.li
                key={key}
                className="flex gap-[clamp(20px,3vw,42px)] border-b border-ink/[0.08] py-[24px] first:pt-0"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-white text-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={ICONS[key] ?? CHECK} />
                  </svg>
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold leading-[22px] text-ink">{r.title}</h3>
                  <p className="mt-1 max-w-[451px] text-[17px] leading-5 text-ink/60">{r.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
