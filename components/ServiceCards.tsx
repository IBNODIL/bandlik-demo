"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { MEDIA } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import { EASE, PlusRule, SectionHead } from "./ui";

/** Services page: six tall photo cards, number on top, title and text at the bottom over a light scrim. */
export default function ServiceCards() {
  const t = useI18n().dict.pages.services;
  const items = Object.values(t.items);
  return (
    <section className="relative z-20 bg-white pt-[clamp(70px,6vw,120px)]">
      <PlusRule />
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(70px,6vw,120px)] pt-[28px]">
        <SectionHead label={t.label} noteEnd />
        <ul className="mt-[50px] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.li
              key={s.title}
              className="group relative aspect-[434/560] overflow-hidden rounded-[14px] bg-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <Image
                src={MEDIA.services.cards[i]}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10 transition-opacity duration-700 group-hover:opacity-90" />
              <div className="relative flex h-full flex-col justify-between p-[clamp(22px,2.5vw,36px)]">
                <span className="text-[22px] font-medium leading-[35px] tracking-[-0.045em] text-black">{String(i + 1).padStart(2, "0")}</span>
                <div className="pr-8">
                  <h3 className="max-w-[300px] text-[clamp(34px,3.3vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] text-black">{s.title}</h3>
                  <p className="mt-3 max-w-[300px] text-[clamp(17px,1.5vw,22px)] font-medium leading-[1.55] tracking-[-0.045em] text-black/80">{s.text}</p>
                </div>
              </div>
              <span className="absolute bottom-[clamp(22px,2.5vw,36px)] right-[clamp(22px,2.5vw,36px)] grid size-9 place-items-center rounded-full bg-black text-white transition-transform duration-500 group-hover:-rotate-45" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M11.9 9.85H2.85v-1.7h9.04L7.78 4.05 9 2.85 15.15 9 9 15.15l-1.22-1.2Z" fill="currentColor" />
                </svg>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
