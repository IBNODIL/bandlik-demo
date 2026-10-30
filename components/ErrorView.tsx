"use client";

import errors from "@/messages/errors.json";
import type { Locale } from "@/lib/i18n";

/**
 * 500 screen. Reads its own small dictionary (messages/errors.json) instead of the page dictionary,
 * so it also works in global-error, where the layout and the i18n provider are gone.
 */
export default function ErrorView({ lang, digest, retry, withBar = false }: { lang: Locale; digest?: string; retry: () => void; withBar?: boolean }) {
  const t = errors[lang];
  return (
    <main className={`mx-auto flex ${withBar ? "min-h-[calc(100svh-68px)]" : "min-h-svh"} max-w-[860px] flex-col items-center justify-center px-[34px] py-[80px] text-center`}>
      <p className="text-[clamp(110px,22vw,260px)] font-semibold leading-[0.85] tracking-[-0.06em] text-blue">500</p>
      <h1 className="mt-8 text-[clamp(28px,3.6vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1e1e1e]">{t.title}</h1>
      <p className="mt-4 max-w-[420px] text-[16px] leading-6 text-[#63615e]">{t.text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={retry}
          className="h-[50px] rounded-full bg-blue px-7 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t.retry}
        </button>
        <a
          href={`/${lang}`}
          className="inline-flex h-[50px] items-center rounded-full bg-[#f5f4f3] px-7 text-[15px] font-semibold text-[#090909] ring-1 ring-black/[0.04] transition-colors hover:text-blue"
        >
          {t.home}
        </a>
      </div>
      {digest && (
        <p className="mt-10 font-mono text-[12px] text-black/30">
          {t.label} ID: {digest}
        </p>
      )}
    </main>
  );
}
