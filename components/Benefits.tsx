"use client";

import { motion } from "motion/react";
import { EASE, Label, PlusRule } from "./ui";

const card = (i: number) => ({
  initial: { opacity: 0, y: 70, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.1, ease: EASE, delay: i * 0.12 },
});

export default function Benefits() {
  return (
    <section className="relative z-20 bg-white pt-[40px]">
      <PlusRule />
      <div className="mx-auto max-w-[1441px] px-[38px] pb-[110px] pt-[28px]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Label>PLATFORMA IMKONIYATLARI</Label>
          <span className="text-[18px] text-ink">Har bir foydalanuvchi uchun o‘z yo‘li</span>
        </div>

        <div className="mt-[40px] grid gap-[14px] lg:grid-cols-3">
          <motion.div
            {...card(0)}
            className="relative flex min-h-[520px] flex-col items-center justify-between overflow-hidden rounded-xl bg-card p-8 text-center"
          >
            <div>
              <p className="text-[15px] font-semibold">It takes 5.1 Minutes to launch your site.</p>
              <p className="mt-1 text-[13px] text-mute">Lightning-fast delivery without compromising quality</p>
            </div>
            <motion.div
              className="grid size-[60px] place-items-center rounded-full bg-blue text-white"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
              </svg>
            </motion.div>
            <span className="text-[34px] font-bold tracking-tight">
              VIPER<span className="text-red-600">•</span>
            </span>
          </motion.div>

          <motion.div
            {...card(1)}
            className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-card via-white to-blue p-8 text-center"
          >
            <p className="text-[10px] tracking-wider text-mute">FROM 0 TO 100 IN ONE SMALL STEP</p>
            <h3 className="mt-3 text-[clamp(44px,4.6vw,66px)] font-semibold leading-[0.9] tracking-[-0.04em]">
              All in one
              <br />
              platform
            </h3>
          </motion.div>

          <motion.div {...card(2)} className="relative min-h-[520px] overflow-hidden rounded-xl bg-[#0b0b0d] p-7 text-white">
            <p className="text-[10px] tracking-wider text-white/60">FULL TIME SUPPORT</p>
            <p className="mt-2 text-[44px] font-semibold leading-none tracking-tight">24/6</p>
            <p className="mt-2 text-yellow-400">★★★★★</p>
            <p className="mt-3 max-w-[300px] text-[13px] leading-[17px] text-white/80">
              I have a custom application for 24/6 support and you will get update anytime.
            </p>
            <div className="absolute -bottom-10 left-1/2 w-[270px] -translate-x-1/2 rounded-[38px] border-[6px] border-[#222] bg-[#111] p-3 pb-14">
              <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-black" />
              <div className="space-y-2 text-[11px]">
                <div className="ml-auto w-[80%] rounded-2xl bg-blue px-3 py-2">Hi! How&apos;s the setup going?</div>
                <div className="w-[70%] rounded-2xl bg-[#2a2a2d] px-3 py-2">Let me send it now and you can take a look.</div>
                <div className="ml-auto w-[60%] rounded-2xl bg-blue px-3 py-2">What do you think?</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
