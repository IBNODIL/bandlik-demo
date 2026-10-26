"use client";

import { motion } from "motion/react";
import { FOOTER_NAV, IMG, img } from "@/lib/data";
import { ArrowRight, EASE, FadeUp, PillButton } from "./ui";

const storeBtn =
  "rounded-xl bg-ink px-5 py-4 text-[18px] leading-none text-paper transition-colors duration-300 hover:bg-blue";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-white px-[20px] pb-[20px]">
      <div className="mx-auto max-w-[1861px] overflow-hidden rounded-2xl bg-[#f7f6f5]">
        <div className="aspect-[1672/941] max-h-[620px] w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(IMG.globe, 2400)} alt="" className="h-full w-full object-cover object-bottom" />
          </motion.div>
        </div>

        <div className="grid gap-12 px-[75px] pb-[60px] pt-[70px] max-lg:px-[28px] lg:grid-cols-2">
          <FadeUp>
            <h2 className="text-[clamp(38px,4.2vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#29292b]">
              Birgalikda yangi
              <br />
              <span className="text-blue">imkoniyatlar</span> yaratamiz
            </h2>
            <p className="mt-8 max-w-[480px] text-[19px] leading-[27px] text-mute">
              Ish beruvchilar va nomzodlar uchun xalqaro bandlik imkoniyatlari
            </p>
            <div className="mt-8">
              <PillButton>Ishchi so&apos;rash</PillButton>
            </div>
          </FadeUp>
          <ul className="lg:ml-auto lg:w-[600px]">
            {FOOTER_NAV.map((n, i) => (
              <li key={n} className="border-t border-ink/10 last:border-b">
                <a href="#top" className="group flex items-center justify-between py-[16px] text-[24px] leading-[28px] text-[#29292b]">
                  <span>
                    <span className="mr-1 font-mono text-[14px] text-mute">{String(i + 1).padStart(2, "0")} /</span>
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:text-blue">
                      {n}
                    </span>
                  </span>
                  <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-[43px] border-t border-ink/10 max-lg:mx-[28px]" />

        <div className="grid items-center gap-10 px-[43px] py-[40px] max-lg:px-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,565px)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/X4ZdeaFXjb47NQvdoDpFKYE9yg.avif" alt="Bandlik" className="w-full max-w-[1150px] object-contain" />

          <div className="relative h-[325px] overflow-hidden rounded-2xl bg-[#6b7aa8]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/ZxMUyWvzXfOYftOqklzEwzhxyQ.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            <p className="absolute left-7 top-6 max-w-[300px] text-[40px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1e1e1e]">
              Mobil ilovani yuklab oling
            </p>
            <div className="absolute bottom-0 left-0 flex gap-3 p-5">
              <a href="#" className={storeBtn}>
                App store
              </a>
              <a href="#" className={storeBtn}>
                Googel Play
              </a>
            </div>
          </div>
        </div>

        <div className="mx-[43px] border-t border-ink/10 max-lg:mx-[28px]" />

        <div className="flex flex-wrap items-center justify-between gap-3 px-[43px] py-7 text-[22px] text-[#29292b] max-lg:px-[28px] max-lg:text-[16px]">
          <span>© Bandlik.uz</span>
          <span className="flex gap-8">
            <a href="#" className="transition-colors hover:text-blue">Maxfiylik siyosati</a>
            <a href="#" className="transition-colors hover:text-blue">Foydalanish shartlari</a>
          </span>
          <button
            onClick={() => (window as unknown as { __lenis?: { scrollTo: (n: number) => void } }).__lenis?.scrollTo(0)}
            className="transition-colors hover:text-blue"
          >
            ©Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
