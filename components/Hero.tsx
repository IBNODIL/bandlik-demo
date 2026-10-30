"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { IMG, img } from "@/lib/data";
import HeroFog from "./HeroFog";
import { useI18n } from "./I18nProvider";
import StepEdge from "./StepEdge";
import { EASE } from "./ui";

export default function Hero({ ready }: { ready: boolean }) {
  const { dict } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const imgY = useTransform(p, [0, 1], ["0%", "18%"]);
  const textY = useTransform(p, [0, 1], [0, -80]);
  const textO = useTransform(p, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 -top-[8%] h-[112%] w-full"
          initial={{ scale: 1.16 }}
          animate={ready ? { scale: 1 } : {}}
          transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(IMG.hero, 2400)}
            alt={dict.hero.alt}
            className="h-full w-full object-cover object-center"
          />
          {/* Unicorn Studio fog, desktop only (see HeroFog) */}
          <HeroFog />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] backdrop-blur-[10px]"
          style={{ maskImage: "linear-gradient(to top, black 10%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 10%, transparent)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-[#2b2e35]/95 via-[#3c3f46]/55 to-transparent" />
        {/* deeper bottom corners */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 55% 90% at 0% 100%, rgba(30,32,38,0.75), transparent 70%), radial-gradient(ellipse 45% 80% at 100% 100%, rgba(30,32,38,0.6), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="absolute z-[2] bottom-[40px] left-[34px] right-[34px] xl:left-[42px] flex items-end justify-between"
        style={{ y: textY, opacity: textO }}
      >
        <motion.p
          className="max-w-[400px] text-[clamp(18px,1.6vw,26px)] font-semibold leading-[1.16] text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          {dict.hero.text}
        </motion.p>
        <motion.a
          href="#about"
          aria-label={dict.hero.scrollDown}
          className="mr-[4px] grid size-[40px] place-items-center"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1, y: [0, 12, 0, 6, 0] } : {}}
          transition={{ opacity: { delay: 0.6 }, y: { duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut", delay: 1.4 } }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M10 2v19M3 14l7 7 7-7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>
      <StepEdge progress={p} />
    </section>
  );
}