"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Label, PlusRule } from "./ui";

const cardCls = "relative aspect-[584/750] min-h-[460px] overflow-hidden rounded-xl";

/** Thin blue corner mark, as in the original cards. */
function Corner({ right = false }: { right?: boolean }) {
  return (
    <span
      className={`absolute top-[25px] size-[25px] border-t border-blue ${
        right ? "right-[25px] border-r" : "left-[25px] border-l"
      }`}
    />
  );
}

export default function Benefits() {
  // scroll-linked entrance: cards rise into line at different rates, inner images drift into place
  const grid = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: grid, offset: ["start 98%", "start 30%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const y1 = useTransform(p, [0, 1], [150, 0]);
  const y2 = useTransform(p, [0, 1], [270, 0]);
  const y3 = useTransform(p, [0, 1], [90, 0]);
  const carX = useTransform(p, [0, 1], ["-14%", "0%"]);
  const phoneY = useTransform(p, [0, 1], ["22%", "0%"]);
  const fade = useTransform(p, [0, 0.35], [0, 1]);
  return (
    <section className="relative z-20 bg-white pt-[clamp(70px,6vw,120px)]">
      <PlusRule />
      <div className="w-full px-[38px] pb-[clamp(90px,6vw,120px)] pt-[28px] lg:px-[2.6vw]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Label>PLATFORMA IMKONIYATLARI</Label>
          <span className="text-[clamp(16px,1.15vw,22px)] text-ink">Har bir foydalanuvchi uchun o‘z yo‘li</span>
        </div>

        <div ref={grid} className="mt-[clamp(40px,6vw,115px)] grid gap-[14px] lg:grid-cols-3 lg:gap-[1.3vw]">
          {/* 1 — speed */}
          <motion.div style={{ y: y1, opacity: fade }} className={`${cardCls} bg-[#f7f7f6]`}>
            <motion.img
              src="/mDl5kWwqr4JYD5LWJoNL9nrZPc.avif"
              alt=""
              style={{ x: carX }}
              className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-[0%_50%]"
            />
            <Corner />
            <div className="absolute inset-x-0 top-[clamp(24px,5.4%,60px)] px-6 text-center">
              <p className="text-[clamp(16px,1.15vw,22px)] font-semibold leading-tight tracking-[-0.02em]">
                It takes 5.1 Minutes to launch your site.
              </p>
              <p className="mt-1 text-[clamp(13px,0.95vw,18px)] text-mute">
                Lightning-fast delivery without compromising quality
              </p>
            </div>
            <motion.div
              className="absolute left-1/2 top-[51%] grid size-[clamp(64px,4.7vw,90px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" />
              </svg>
            </motion.div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wfveBp4CC208LYbfJecE1rZL50.avif"
              alt="Viper"
              className="absolute bottom-[12%] left-1/2 w-[26%] -translate-x-1/2"
            />
          </motion.div>

          {/* 2 — all in one */}
          <motion.div
            style={{ y: y2, opacity: fade }}
            className={`${cardCls} bg-gradient-to-b from-white via-[#dce8fb] to-[#1f6be6] p-[4.8%] pb-0`}
          >
            <div className="h-full rounded-t-[4px] bg-[#f6f6f6] px-6 pt-[clamp(20px,3.4%,34px)] text-center">
              <p className="text-[clamp(11px,0.75vw,14px)] font-semibold tracking-[-0.01em] text-[#29292b]">
                FROM 0 TO 100 IN ONE SMALL STEP
              </p>
              <h3 className="mt-3 text-[clamp(44px,3.45vw,68px)] font-semibold leading-[0.9] tracking-[-0.045em]">
                All in one
                <br />
                platform
              </h3>
            </div>
          </motion.div>

          {/* 3 — support */}
          <motion.div style={{ y: y3, opacity: fade }} className={`${cardCls} bg-[#101010] text-white`}>
            <Corner right />
            <div className="px-[5%] pt-[clamp(20px,3.6%,34px)]">
              <p className="text-[clamp(11px,0.75vw,14px)] font-semibold tracking-[-0.01em]">FULL TIME SUPPORT</p>
              <p className="mt-2 text-[clamp(44px,3.5vw,68px)] font-semibold leading-none tracking-[-0.04em]">24/6</p>
              <p className="mt-3 flex gap-[6px] text-blue">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="size-[clamp(16px,1.3vw,24px)]">
                    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7L2 9.5l7.1-.6z" />
                  </svg>
                ))}
              </p>
              <p className="mt-3 max-w-[92%] text-[clamp(14px,1.05vw,20px)] leading-snug tracking-[-0.02em] text-white/90">
                I have a custom application for 24/6 support and you will get update anytime.
              </p>
            </div>
            <motion.img
              src="/uGcQ6mHB0wiF8ZtXK6bQKyhvo8o.avif"
              alt="Chat"
              style={{ y: phoneY, x: "-50%" }}
              className="absolute bottom-0 left-1/2 w-[66%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
