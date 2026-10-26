"use client";

import { useState } from "react";
import { FadeUp, PillButton, SplitReveal } from "./ui";

const field =
  "w-full rounded-lg bg-card px-4 py-[14px] font-sans text-[13px] text-ink outline-none transition-shadow placeholder:text-mute focus:shadow-[0_0_0_2px_#0759db]";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative z-20 bg-white pt-[100px]">
      <div className="mx-auto grid max-w-[1441px] gap-16 px-[38px] pb-[100px] lg:grid-cols-2">
        <div className="flex flex-col justify-end">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-md bg-[#fde7ef] px-3 py-1 text-[11px] font-semibold text-[#d4457a]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 12l20-9-6 18-4-7z" />
              </svg>
              ALOQA
            </span>
          </FadeUp>
          <SplitReveal
            className="mt-5 text-[clamp(48px,6.4vw,92px)] font-semibold leading-[0.9] tracking-[-0.04em]"
            text="Biz bilan bog‘laning"
          />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[330px] text-[13px] leading-[18px] text-mute">
              Savollaringiz yoki takliflaringiz bormi? Xabaringizni yuboring, siz bilan bog‘lanamiz.
            </p>
            <ul className="mt-6 space-y-3 border-t border-ink/[0.07] pt-5 text-[12px]">
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#fde7ef]" />
                Telefon orqali aloqa
              </li>
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#fde7ef]" />
                Telegram orqali murojaat
              </li>
            </ul>
            <div className="mt-7">
              <PillButton href="#contact">Biz bilan bog&apos;laning</PillButton>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="relative pt-6">
          <span className="absolute left-[-10px] top-0 size-3 border-l border-t border-blue" />
          <h3 className="text-center text-[30px] font-semibold tracking-tight">Xabaringizni yuboring</h3>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 3500);
            }}
          >
            <input required className={field} placeholder="Ismingiz *" />
            <input required type="tel" className={field} placeholder="Telefon raqamingiz *" />
            <textarea required rows={4} className={`${field} resize-none`} placeholder="Xabaringiz *" />
            <button
              type="submit"
              className="h-[52px] w-full rounded-lg bg-[#0b0b0d] text-[14px] text-white transition-colors duration-300 hover:bg-blue"
            >
              {sent ? "Yuborildi ✓" : "Xabarni yuborish →"}
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
