"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill button: on hover the blue circle stretches across the pill, the arrow slides out and a new one slides in from the left, and the label rolls up to a white copy. Internal links ("/uz/...") navigate client-side. */
export function PillButton({
  children,
  href = "#contact",
  dark = false,
  className = "",
  type,
}: {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  className?: string;
  /** render a <button> instead of a link */
  type?: "button" | "submit";
}) {
  const cls = `group relative inline-flex h-[54px] items-center overflow-hidden rounded-full pl-[66px] pr-6 ring-1 ring-ink/[0.04] ${
    dark ? "bg-ink text-paper" : "bg-card text-ink"
  } ${className}`;
  const inner = (
    <>
      <span className="absolute left-[5px] top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-blue transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-[calc(100%-10px)] group-hover:delay-[180ms]" />
      <span className="absolute left-[5px] top-1/2 size-11 -translate-y-1/2 overflow-hidden rounded-full text-white">
        <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[160%] group-hover:delay-[180ms]">
          <ArrowRight />
        </span>
        <span className="absolute inset-0 grid -translate-x-[160%] place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:delay-[280ms]">
          <ArrowRight />
        </span>
      </span>
      <span className="relative block h-5 overflow-hidden whitespace-nowrap text-[17px] leading-5">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full block text-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full group-hover:delay-[260ms]">
          {children}
        </span>
      </span>
    </>
  );
  if (type) return <button type={type} className={cls}>{inner}</button>;
  if (href.startsWith("/")) return <Link href={href} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
}

/** Section caption row: blue-square label on the left, "©2026" (or another note) on the right. */
export function SectionHead({ label, note = "©2026", noteEnd = false, className = "" }: { label: ReactNode; note?: ReactNode; /** push the note to the far right edge */ noteEnd?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col justify-between gap-3 sm:flex-row sm:items-start ${className}`}>
      <Label>{label}</Label>
      <span className={`text-[18px] leading-[26px] text-[#29292b] ${noteEnd ? "sm:text-right" : "sm:w-[31%] sm:text-left"}`}>{note}</span>
    </div>
  );
}

/** Blue square bullet + label, used for section captions. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-[18px] leading-[26px] text-[#29292b] ${className}`}>
      <span className="size-3 rounded-[3px] bg-blue" />
      {children}
    </div>
  );
}

const wordV: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.035 },
  }),
};

/** Word-by-word masked reveal when scrolled into view. */
export function SplitReveal({
  text,
  className = "",
  as: Tag = "h2",
  blueWords = [],
  indent = 0,
  suffix,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  blueWords?: string[];
  indent?: number;
  /** appended after the last word (e.g. a superscript mark), outside the reveal */
  suffix?: ReactNode;
}) {
  const words = text.split(" ");
  const M = motion[Tag];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {indent > 0 && <span className="hidden lg:inline-block" style={{ width: indent }} />}
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span custom={i} variants={wordV} className={`inline-block ${blueWords.includes(w) ? "text-blue" : ""}`}>
              {w}
            </motion.span>
          </span>
          {/* the space sits outside the inline-blocks, where it is not collapsed */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
      {suffix}
    </M>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section top rule with a centered "+" mark. */
export function PlusRule({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-[38px] h-px bg-ink/[0.07] ${className}`}>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[14px] leading-none">+</span>
    </div>
  );
}

export function Marquee({
  children,
  duration = 60,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? "rev" : ""}`} style={{ ["--dur" as string]: `${duration}s` }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
