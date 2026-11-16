"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

/** Footer link: grey label that rolls up to a light copy on hover. */
function RollLink({ href, children }: { href: string; children: ReactNode }) {
  const inner = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute left-0 top-full block text-[#f2f2f2] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
    </span>
  );
  const cls = "group block w-fit text-[16px] leading-[22.4px] text-[#b5b5b5]";
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="max-w-[170px] text-[20px] font-medium leading-[24px] tracking-[-0.04em] text-[#f2f2f2]">{title}</h3>
      <ul className="mt-4 space-y-[9.6px]">{children}</ul>
    </div>
  );
}

/**
 * Dark footer as on the Framer site (measured at 1440px): brand and blurb on the left, three link columns,
 * a giant faint "Bandlik" wordmark across the full width, a thin divider and the centered copyright.
 */
export default function Footer() {
  const { lang, dict } = useI18n();
  const t = dict.footer;
  const to = (link: string) => localizedHref(lang, link);
  return (
    <footer className="relative z-20 overflow-hidden bg-night font-mona text-[#f2f2f2]">
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pb-10 pt-10">
        {/* 652 | 208 | 263 | 162 with 20px gaps = the Framer column starts at 712 / 940 / 1223 */}
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-[652fr_208fr_263fr_162fr]">
          <div className="sm:col-span-3 lg:col-span-1">
            <p className="text-[32px] font-medium leading-[1.2] tracking-[-0.04em]">Bandlik</p>
            <p className="mt-6 max-w-[652px] text-[clamp(17px,1.4vw,20px)] font-medium leading-[1.6]">{t.about}</p>
          </div>
          <Column title={t.platform}>
            <li><RollLink href={to("/")}>{t.links.home}</RollLink></li>
            <li><RollLink href={to("/about")}>{t.links.about}</RollLink></li>
            <li><RollLink href={to("/services")}>{t.links.services}</RollLink></li>
            <li><RollLink href={to("/vacancies")}>{t.links.vacancies}</RollLink></li>
          </Column>
          <Column title={t.users}>
            <li><RollLink href={to("/job-seekers")}>{t.links.candidates}</RollLink></li>
            <li><RollLink href={to("/employers")}>{t.links.employers}</RollLink></li>
            <li><RollLink href={to("/contact")}>{t.links.agencies}</RollLink></li>
            <li><RollLink href={to("/#faq")}>{t.links.faq}</RollLink></li>
          </Column>
          <Column title={t.contact}>
            <li><RollLink href={`mailto:${CONTACT.email}`}>{CONTACT.email}</RollLink></li>
            <li><RollLink href={CONTACT.phoneHref}>{CONTACT.phone}</RollLink></li>
            <li className="whitespace-nowrap text-[16px] leading-[22.4px] text-[#b5b5b5]">{t.city}</li>
          </Column>
        </div>

        {/*
          Giant faint wordmark: the same fit-to-width text as Framer (Mona Sans 600 in a 1054×260 box, baseline at
          240.5), starting right under the tallest link column. lengthAdjust="spacing" only nudges letter gaps
          if a fallback font is wider; the letter shapes are never stretched.
        */}
        <svg viewBox="0 0 1054 260" className="mt-8 w-full select-none lg:mt-[2px]" aria-hidden>
          <text
            x="0"
            y="240.5"
            textLength="1049"
            lengthAdjust="spacing"
            fontSize="289"
            fontWeight="600"
            letterSpacing="-2.89"
            fill="rgba(242,242,242,0.08)"
            style={{ fontFamily: '"Mona Sans", "Inter Display", sans-serif' }}
          >
            Bandlik
          </text>
        </svg>

        <div className="mt-4 h-px bg-[#2a2a2a]" />
        <p className="mt-[14px] text-center text-[16px] leading-[22.4px] text-[#737373]">{t.copyright}</p>
      </div>
    </footer>
  );
}
