"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { locales, localeNames } from "@/lib/i18n";
import { switchLocale } from "@/lib/switch-locale";
import Flag from "./Flag";
import { useI18n } from "./I18nProvider";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Panel unfolds downward from the button (clip + slight drop and scale), and folds back up faster. */
const panel: Variants = {
  closed: { opacity: 0, y: -8, scale: 0.96, clipPath: "inset(0% 0% 100% 0% round 18px)" },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 18px)",
    transition: { duration: 0.5, ease: EASE_OUT, staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    clipPath: "inset(0% 0% 100% 0% round 18px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

/** Rows slide in one after another. */
const row: Variants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Without motion preference: plain fade only. */
const fade: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export default function LangSwitcher() {
  const { lang, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const listId = useId();
  const reduce = useReducedMotion();

  // close on outside click / Escape (Escape gives focus back to the button)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // arrow keys move between languages; Home/End jump to the ends
  const onListKey = (e: React.KeyboardEvent) => {
    const list = items.current.filter(Boolean) as HTMLAnchorElement[];
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    const go = (n: number) => {
      e.preventDefault();
      list[(n + list.length) % list.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
    else if (e.key === "Tab") setOpen(false);
  };

  const openWithKeys = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    setOpen(true);
  };

  const highlight = hovered ?? lang;

  return (
    <div ref={box} className="relative">
      <button
        ref={button}
        type="button"
        aria-label={dict.common.language}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={openWithKeys}
        className={`flex h-[46px] items-center gap-[7px] rounded-full bg-card px-[14px] text-[15px] font-medium text-ink ring-1 transition-[color,box-shadow] duration-300 hover:text-blue sm:h-[54px] sm:text-[16px] ${
          open ? "ring-blue/25 shadow-[0_6px_20px_rgba(7,89,219,0.12)]" : "ring-ink/[0.04]"
        }`}
      >
        <motion.svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden
          animate={{ rotate: open && !reduce ? 180 : 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.6 2.7 4 6 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-6-4-9.5s1.4-6.8 4-9.5z" />
        </motion.svg>
        <span className="hidden sm:inline">{localeNames[lang]}</span>
        <span className="uppercase sm:hidden">{lang}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden
          className={`text-ink/50 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            className="absolute right-0 top-full z-10 mt-[10px] w-max min-w-[204px] origin-top-right rounded-[18px] bg-white p-[6px] shadow-[0_18px_50px_rgba(9,9,9,0.16),0_2px_8px_rgba(9,9,9,0.06)] ring-1 ring-ink/[0.05]"
            variants={reduce ? fade : panel}
            initial="closed"
            animate="open"
            exit="exit"
            onAnimationComplete={(def) => {
              // focus the current language once the panel is open, so arrow keys work right away
              if (def === "open" && box.current?.contains(document.activeElement)) items.current[locales.indexOf(lang)]?.focus({ preventScroll: true });
            }}
            onKeyDown={onListKey}
            onPointerLeave={() => setHovered(null)}
          >
            <ul aria-label={dict.common.language}>
              {locales.map((l, i) => {
                const current = l === lang;
                return (
                  <motion.li key={l} variants={reduce ? fade : row}>
                    <a
                      ref={(el) => {
                        items.current[i] = el;
                      }}
                      href={`/${l}`}
                      lang={l}
                      aria-current={current ? "true" : undefined}
                      onPointerEnter={() => setHovered(l)}
                      onFocus={() => setHovered(l)}
                      onClick={(e) => {
                        e.preventDefault();
                        if (current) return setOpen(false);
                        switchLocale(l);
                      }}
                      className={`relative flex h-[46px] items-center justify-between gap-6 rounded-[12px] px-[14px] text-[17px] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue/40 ${
                        current ? "font-semibold text-blue" : "font-medium text-ink"
                      }`}
                    >
                      {/* highlight that glides to the hovered / focused row (rests on the current language) */}
                      {highlight === l && (
                        <motion.span
                          layoutId={`${listId}-hl`}
                          className="absolute inset-0 rounded-[12px] bg-card"
                          transition={{ type: "spring", stiffness: 520, damping: 40 }}
                        />
                      )}
                      <span className="relative flex items-center gap-[14px]">
                        <motion.span
                          className="grid"
                          animate={{ scale: hovered === l && !reduce ? 1.12 : 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        >
                          <Flag lang={l} className="size-[26px]" />
                        </motion.span>
                        {localeNames[l]}
                      </span>
                      <span className={`relative text-[13px] font-medium uppercase ${current ? "text-blue/60" : "text-ink/35"}`}>{l}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
