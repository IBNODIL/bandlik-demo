"use client";

import { useI18n } from "./I18nProvider";
import SiteBar from "./SiteBar";
import { ArrowRight } from "./ui";

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { lang, dict } = useI18n();
  const t = dict.legal[kind];
  return (
    <>
      <SiteBar />
      <main className="mx-auto max-w-[860px] px-[34px] pb-[120px] pt-[clamp(40px,6vw,96px)]">
        <a href={`/${lang}`} className="group inline-flex items-center gap-2 text-[14px] text-ink/50 transition-colors hover:text-blue">
          <ArrowRight className="size-4 rotate-180" />
          {dict.legal.back}
        </a>
        <h1 className="mt-8 text-[clamp(30px,5.4vw,72px)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#1e1e1e]">
          {t.title}
        </h1>
        <p className="mt-4 text-[14px] text-ink/40">
          {dict.legal.updated} {dict.legal.date}
        </p>
        <p className="mt-10 text-[18px] leading-[1.5] text-mute">{t.intro}</p>
        <ol className="mt-12 border-t border-ink/[0.07]">
          {t.sections.map((s, i) => (
            <li key={s.h} className="grid gap-3 border-b border-ink/[0.07] py-8 sm:grid-cols-[56px_1fr]">
              <span className="font-mono text-[13px] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-[20px] font-semibold leading-[1.25] text-ink">{s.h}</h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-mute">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
