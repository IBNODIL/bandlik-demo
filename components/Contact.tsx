"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import { FadeUp, PillButton, PlusRule, SplitReveal } from "./ui";

const MAP_QUERY = "Tashkent, Uzbekistan";

const field =
  "h-[67px] w-full rounded-lg bg-card px-6 text-[16px] text-ink outline-none transition-shadow placeholder:text-ink/50 focus:shadow-[0_0_0_2px_#0759db]";

/** Blue "+" in a light coral circle, the row marker of the Framer contact list. */
function PlusDot() {
  return (
    <span className="grid size-[23px] shrink-0 place-items-center rounded-full bg-[#ff462e]/20 text-blue" aria-hidden>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * Contact block as on the Framer site: heading, intro, divider, phone / Telegram rows and a pill button on the
 * left; the "company details" form on the right; a full-width map underneath.
 * The contact page shows it under its own hero, with the "ALOQA" badge and a top rule (`page`).
 */
export default function Contact({ page = false }: { page?: boolean }) {
  const { lang, dict } = useI18n();
  const t = dict.contact;
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className={`relative z-20 bg-white ${page ? "pt-[clamp(70px,6vw,120px)]" : "pt-[clamp(40px,4vw,64px)]"}`}>
      {page && <PlusRule />}
      <div
        className={`mx-auto grid max-w-[1920px] gap-14 px-[clamp(20px,3.65vw,52px)] lg:grid-cols-[minmax(0,600px)_minmax(0,550px)] lg:justify-between ${
          page ? "pt-[clamp(60px,8vw,130px)]" : ""
        }`}
      >
        <div>
          {page && (
            <FadeUp className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-[10px] bg-[#ff462e]/10 px-3 py-[9px] text-[14px] font-semibold leading-6 text-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M2 12 22 3l-6 18-4-7z" />
                </svg>
                {t.badge}
              </span>
            </FadeUp>
          )}
          <SplitReveal
            className="text-[clamp(44px,5vw,72px)] font-semibold leading-[1.03] tracking-[-0.042em] text-[#1e1e1e]"
            text={t.heading}
          />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[420px] text-[18px] leading-6 text-soft">{t.intro}</p>
            <div className="mt-6 h-px w-full bg-[#eaeaea]" />
            <ul className="mt-[25px] space-y-[21px] text-[16px] leading-[22px] text-[#29292b]">
              <li>
                <a href={CONTACT.phoneHref} className="flex w-fit items-center gap-[10px] transition-colors hover:text-blue">
                  <PlusDot />
                  {t.byPhone}
                </a>
              </li>
              <li>
                <a href={CONTACT.telegram} className="flex w-fit items-center gap-[10px] transition-colors hover:text-blue">
                  <PlusDot />
                  {t.byTelegram}
                </a>
              </li>
            </ul>
            <div className="mt-[25px]">
              <PillButton href={`mailto:${CONTACT.email}`}>{dict.common.contactUs}</PillButton>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="relative lg:pt-6">
          {/* thin blue corner mark above the form title */}
          <span className="absolute -left-[19px] -top-[12px] size-[19px] border-l border-t border-blue lg:top-[12px]" aria-hidden />
          <h3 className="text-[clamp(34px,3.4vw,49px)] font-semibold leading-[1.5] tracking-[-0.06em] text-[#1e1e1e]">{t.form.title}</h3>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 3500);
            }}
          >
            <input name="company" autoComplete="organization" aria-label={t.form.company} className={field} placeholder={t.form.company} />
            <input name="tin" inputMode="numeric" aria-label={t.form.tin} className={field} placeholder={t.form.tin} />
            <input name="address" autoComplete="street-address" aria-label={t.form.address} className={field} placeholder={t.form.address} />
            <input name="phone" required type="tel" autoComplete="tel" aria-label={t.form.phone} className={field} placeholder={t.form.phone} />
            <button
              type="submit"
              className="h-[72px] w-full rounded-[10px] bg-[#1e1e1e] text-[18px] leading-[26px] text-paper transition-colors duration-300 hover:bg-blue"
            >
              <span aria-live="polite">{sent ? t.form.sent : t.form.send}</span>
            </button>
          </form>
        </FadeUp>
      </div>

      {/* Google's embed draws its own "Open in Maps" link in the corner */}
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(70px,7vw,140px)] pt-[50px]">
        <FadeUp className="relative h-[260px] overflow-hidden rounded-[10px] bg-card">
          <iframe
            title={t.map}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=12&hl=${lang}&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeUp>
      </div>
    </section>
  );
}
