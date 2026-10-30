"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import suggest from "@/messages/suggest.json";
import { LOCALE_COOKIE, matchBrowserLocale, type Locale } from "@/lib/i18n";
import { switchLocale } from "@/lib/switch-locale";
import { useI18n } from "./I18nProvider";
import { EASE } from "./ui";

const DISMISSED = "bandlik-lang-dismissed";

/** First visit only: offers the browser's language, never switches by itself. */
export default function LangSuggest({ ready }: { ready: boolean }) {
  const { lang } = useI18n();
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      if (document.cookie.split("; ").some((c) => c.startsWith(`${LOCALE_COOKIE}=`))) return;
      if (localStorage.getItem(DISMISSED)) return;
    } catch {}
    const match = matchBrowserLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
    if (match && match !== lang) queueMicrotask(() => setTarget(match));
  }, [lang]);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISSED, "1");
    } catch {}
    setTarget(null);
  };

  const t = target && suggest[target];

  return (
    <AnimatePresence>
      {ready && target && t && (
        <motion.div
          role="dialog"
          aria-live="polite"
          lang={target}
          className="fixed bottom-4 left-4 right-4 z-[70] rounded-2xl bg-white p-5 shadow-[0_8px_40px_rgba(9,9,9,0.18)] ring-1 ring-ink/[0.06] sm:right-auto sm:max-w-[360px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1 }}
        >
          <p className="text-[15px] font-medium leading-[1.3] text-ink">{t.text}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => switchLocale(target)}
              className="h-10 rounded-full bg-blue px-5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t.accept}
            </button>
            <button
              onClick={dismiss}
              className="h-10 rounded-full px-4 text-[14px] text-ink/60 transition-colors hover:text-ink"
            >
              {t.dismiss}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
