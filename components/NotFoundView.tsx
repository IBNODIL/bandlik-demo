"use client";

import { useI18n } from "./I18nProvider";
import SiteBar from "./SiteBar";
import { PillButton } from "./ui";

export default function NotFoundView() {
  const { lang, dict } = useI18n();
  const t = dict.notFound;
  return (
    <>
      <SiteBar />
      <main className="mx-auto flex min-h-[calc(100svh-68px)] max-w-[860px] flex-col items-center justify-center px-[34px] pb-[80px] text-center">
        <p className="text-[clamp(110px,22vw,260px)] font-semibold leading-[0.85] tracking-[-0.06em] text-blue">404</p>
        <h1 className="mt-8 text-[clamp(28px,3.6vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1e1e1e]">{t.title}</h1>
        <p className="mt-4 max-w-[420px] text-[16px] leading-6 text-mute">{t.text}</p>
        <div className="mt-8">
          <PillButton href={`/${lang}`}>{t.home}</PillButton>
        </div>
      </main>
    </>
  );
}
