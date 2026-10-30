"use client";

import { IMG, img } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import LangSwitcher from "./LangSwitcher";

/** Slim header for the inner pages (legal, 404): logo back to the home page and the language switcher. */
export default function SiteBar() {
  const { lang } = useI18n();
  return (
    <header className="mx-auto flex h-[68px] max-w-[1441px] items-center justify-between px-[34px] xl:px-[58px]">
      <a href={`/${lang}`} className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(IMG.logo, 400)} alt="Bandlik" className="h-[28px] w-auto" />
      </a>
      <LangSwitcher />
    </header>
  );
}
