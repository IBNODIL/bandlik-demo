"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { IMG, img } from "@/lib/data";
import StepEdge from "./StepEdge";
import { EASE } from "./ui";

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const imgY = useTransform(p, [0, 1], ["0%", "18%"]);
  const textY = useTransform(p, [0, 1], [0, -80]);
  const textO = useTransform(p, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        {/* blurred pre-load layer */}
        <motion.div
          className="absolute inset-0 -top-[8%] h-[112%] w-full"
          initial={{ opacity: 1 }}
          animate={ready ? { opacity: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          style={{ y: imgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(IMG.globe, 1600)} alt="" className="h-full w-full object-cover object-bottom blur-2xl" />
        </motion.div>

        <motion.div
          className="absolute inset-0 -top-[8%] h-[112%] w-full"
          initial={{ scale: 1.18, opacity: 0, filter: "blur(18px)" }}
          animate={ready ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.8, ease: EASE }}
          style={{ y: imgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(IMG.hero, 2400)}
            alt="Ishchilar va xalqaro imkoniyatlar"
            className="h-full w-full object-cover object-[50%_80%]"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/55 to-transparent" />
      </div>

      <motion.div
        className="absolute bottom-[40px] left-[34px] right-[34px] flex items-end justify-between"
        style={{ y: textY, opacity: textO }}
      >
        <motion.p
          className="max-w-[340px] text-[18px] leading-[24px] text-ink"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        >
          Xorijiy ish beruvchilar uchun ishchi topish va nomzodlar uchun tekshirilgan vakansiyalar bilan tanishish imkoniyati.
        </motion.p>
        <motion.a
          href="#about"
          aria-label="Pastga"
          className="grid size-[31px] place-items-center"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1, y: [0, 8, 0] } : {}}
          transition={{ opacity: { delay: 1.2 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 } }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M10 2v19M3 14l7 7 7-7" stroke="#090909" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>
      <StepEdge progress={p} />
    </section>
  );
}
