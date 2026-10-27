"use client";

import { motion } from "motion/react";
import { STEPS } from "@/lib/data";
import { EASE, FadeUp, Label, PlusRule } from "./ui";

export default function Process() {
  return (
    <section id="process" className="relative z-20 bg-white pb-[clamp(60px,6vw,120px)] pt-[clamp(90px,8vw,150px)]">
      <PlusRule />
      <div className="mx-auto max-w-[1441px] px-[38px] pt-[28px]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Label>So‘rovdan ishga joylashishgacha</Label>
          <FadeUp>
            <p className="max-w-[400px] text-right text-[18px] leading-[24px] text-ink sm:max-w-[330px]">
              Ish beruvchining ehtiyojidan boshlab ishga joylashishgacha bo‘lgan jarayonni ketma-ket kuzating.
            </p>
          </FadeUp>
        </div>

        <div className="mt-[60px] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([t, d], i) => (
            <motion.article
              key={t}
              className="group flex min-h-[250px] flex-col justify-between rounded-xl bg-card p-[22px] transition-colors duration-500 hover:bg-[#eceae7]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.09 }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[26px] font-semibold leading-none">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex gap-[5px] pt-2">
                  {STEPS.map((_, k) => (
                    <motion.span
                      key={k}
                      className={`size-[6px] rounded-full ${k <= i ? "bg-blue" : "bg-ink/15"}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.09 + k * 0.06, type: "spring", stiffness: 300, damping: 18 }}
                    />
                  ))}
                </span>
              </div>
              <div>
                <h3 className="flex items-start gap-2 text-[15px] font-semibold leading-[19px]">
                  <span className="mt-[4px] size-[10px] shrink-0 rounded-[2px] bg-blue" />
                  {t}
                </h3>
                <p className="mt-3 text-[14px] leading-[18px] text-mute">{d}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
