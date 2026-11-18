"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MEDIA } from "@/lib/data";
import { isCurrentPage, localizedHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import LangSwitcher from "./LangSwitcher";
import { ArrowRight, EASE, PillButton } from "./ui";

/** Below this scroll position the bar always shows its full-width form. */
const TOP_ZONE = 80;
/** Scroll movement (px) needed before the bar changes form, so small jitters don't flip it. */
const DELTA = 6;

/**
 * Header with two forms (as in the Framer site):
 * - standard: full-width translucent bar, wide spacing (at the top, and whenever the user scrolls up);
 * - compact: centered frosted-white pill with tighter spacing (while the user scrolls down).
 * The change between them is a CSS transition of margins, height, radius, background and gaps.
 */
export default function Nav({ ready }: { ready: boolean }) {
  const { lang, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < TOP_ZONE) return setCompact(false);
    if (y - prev > DELTA) setCompact(true);
    else if (prev - y > DELTA) setCompact(false);
  });

  const contactHref = localizedHref(lang, dict.nav.contact.link);
  const NAV = Object.entries(dict.nav).filter(([key]) => key !== "contact").map(([key, { title, link }]) => ({
    key,
    title,
    href: localizedHref(lang, link),
    active: isCurrentPage(pathname, link),
  }));

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  const ease = "duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-[4px] z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div
          data-compact={compact || undefined}
          className={`flex items-center transition-all ${ease} ${
            compact
              ? "mx-[max(10px,calc((100%-1505px)/2))] h-[66px] rounded-[80px] bg-white/[0.78] px-[clamp(14px,1.3vw,24px)] shadow-[0_6px_30px_rgba(9,9,9,0.08)] backdrop-blur-[18px]"
              : "mx-0 h-[84px] rounded-none bg-transparent px-[max(clamp(16px,2.1vw,40px),calc((100%-2240px)/2+40px))] shadow-none backdrop-blur-[18px]"
          }`}
        >
          <Link href={`/${lang}`} aria-label="Bandlik" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MEDIA.logo}
              alt="Bandlik"
              className={`w-auto transition-all ${ease} ${compact ? "h-[clamp(26px,1.7vw,32px)]" : "h-[clamp(28px,2vw,38px)]"}`}
            />
          </Link>

          <nav
            aria-label={dict.common.menu}
            className={`mx-auto hidden items-center transition-all lg:flex ${ease} ${
              compact ? "gap-[clamp(10px,1.25vw,24px)] px-[clamp(12px,1.25vw,24px)]" : "gap-[clamp(14px,2.6vw,50px)] px-6"
            }`}
          >
            {NAV.map((n, i) => (
              <Link
                key={n.key}
                href={n.href}
                aria-current={n.active ? "page" : undefined}
                className={`group relative whitespace-nowrap text-[clamp(13px,0.94vw,18px)] font-semibold leading-[22px] transition-[color,opacity] duration-300 hover:text-blue hover:opacity-100 ${
                  n.active ? "text-blue" : "text-ink opacity-50"
                }`}
              >
                <span className="relative inline-block overflow-hidden align-top">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{n.title}</span>
                  <span aria-hidden className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                    {n.title}
                  </span>
                </span>
                <sup className="ml-[2px] align-super text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</sup>
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
            <LangSwitcher />
            {/* hidden on phones (it is in the menu there); the wrapper avoids fighting the pill's own display class */}
            <div className="hidden sm:block">
              <PillButton href={contactHref}>{dict.nav.contact.title}</PillButton>
            </div>
            <button
              type="button"
              aria-label={dict.common.menu}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-[46px] place-items-center rounded-full bg-card lg:hidden"
            >
              <span className={`relative block h-[2px] w-[18px] transition-colors ${open ? "bg-transparent" : "bg-ink"}`}>
                <span className={`absolute left-0 h-[2px] w-[18px] bg-ink transition-transform duration-300 ${open ? "top-0 rotate-45" : "-top-[6px]"}`} />
                <span className={`absolute left-0 h-[2px] w-[18px] bg-ink transition-transform duration-300 ${open ? "top-0 -rotate-45" : "top-[6px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-white px-[28px] pt-[90px] lg:hidden"
        initial={false}
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 0.7, ease: EASE }}
        aria-hidden={!open}
        inert={!open}
      >
        {NAV.map((n, i) => (
          <Link
            key={n.key}
            href={n.href}
            onClick={() => setOpen(false)}
            className={`flex items-center justify-between border-b border-ink/[0.07] pb-3 text-[clamp(26px,7vw,34px)] font-semibold tracking-tight ${
              n.active ? "text-blue" : "text-ink"
            }`}
          >
            <span>
              <span className="mr-3 align-middle font-mono text-[13px] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              {n.title}
            </span>
            <ArrowRight />
          </Link>
        ))}
        <Link href={contactHref} className="mt-4 flex h-[54px] items-center justify-center rounded-full bg-blue text-[17px] font-semibold text-white">
          {dict.nav.contact.title}
        </Link>
      </motion.div>
    </>
  );
}
