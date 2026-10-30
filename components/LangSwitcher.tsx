"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeNames } from "@/lib/i18n";
import { switchLocale } from "@/lib/switch-locale";
import Flag from "./Flag";
import { useI18n } from "./I18nProvider";

export default function LangSwitcher() {
  const { lang, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e.type === "keydown" ? (e as KeyboardEvent).key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-label={dict.common.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 items-center gap-[6px] rounded-full bg-ink/[0.05] px-3 text-[14px] font-semibold uppercase text-ink transition-colors hover:bg-ink/[0.09] hover:text-blue"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden className="lg:max-xl:hidden">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.6 2.7 4 6 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-6-4-9.5s1.4-6.8 4-9.5z" />
        </svg>
        <Flag lang={lang} />
        <span className="lg:max-xl:hidden">{lang}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={dict.common.language}
          className="absolute right-0 top-full z-10 mt-2 min-w-[150px] overflow-hidden rounded-xl bg-white py-1 shadow-[0_8px_30px_rgba(9,9,9,0.14)] ring-1 ring-ink/[0.06]"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <a
                href={`/${l}`}
                lang={l}
                onClick={(e) => {
                  e.preventDefault();
                  if (l === lang) return setOpen(false);
                  switchLocale(l);
                }}
                className={`flex items-center justify-between gap-4 whitespace-nowrap px-4 py-2 text-[14px] transition-colors hover:bg-card ${
                  l === lang ? "font-semibold text-blue" : "text-ink"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Flag lang={l} />
                  {localeNames[l]}
                </span>
                <span className="text-[11px] uppercase text-ink/40">{l}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
