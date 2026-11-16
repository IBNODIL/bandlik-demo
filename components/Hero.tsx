"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { Fragment, useRef } from "react";
import { MEDIA } from "@/lib/data";
import { AudienceButtons } from "./CTA";
import { useHeroDrift } from "./heroDrift";
import HeroFog from "./HeroFog";
import { useI18n } from "./I18nProvider";
import { useReady } from "./PageShell";
import StepEdge from "./StepEdge";
import { EASE } from "./ui";

export default function Hero() {
  const ready = useReady();
  const { dict } = useI18n();
  const t = dict.hero;
  const ref = useRef<HTMLElement>(null);
  // the stepped white edge rises as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  // Framer's motion: the hero's contents stay almost still while the page scrolls over them
  const drift = useHeroDrift();
  const words = t.title.split(" ");

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[680px] overflow-visible bg-[#090909]">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: drift.content }}>
          <motion.div className="absolute inset-0 -top-[8%] h-[112%] w-full" style={{ y: drift.image }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.16 }}
              animate={ready ? { scale: 1 } : {}}
              transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={MEDIA.hero} alt={t.alt} fill preload sizes="100vw" className="object-cover object-[50%_30%]" />
              {/* Unicorn Studio fog, desktop only (see HeroFog) */}
              <HeroFog />
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0b0d12]/95 via-[#0b0d12]/55 to-transparent" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 90% at 0% 100%, rgba(11,13,18,0.7), transparent 70%), radial-gradient(ellipse 45% 80% at 100% 100%, rgba(11,13,18,0.5), transparent 70%)",
            }}
          />

          {/* thin brand line along the top edge, as on the Framer heroes */}
          <div className="absolute inset-x-0 top-0 z-[3] h-[6px] bg-blue" />

          <div className="absolute inset-x-[clamp(20px,2.8vw,40px)] bottom-[clamp(48px,5.5vw,80px)] z-[2]">
            <h1 className="max-w-[10.6em] font-sans text-[clamp(44px,6vw,86px)] font-medium leading-[1.08] tracking-[-0.035em] text-[#f2efea]">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={ready ? { y: 0 } : {}}
                      transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.05 }}
                    >
                      {w}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
            <motion.p
              className="mt-4 max-w-[800px] font-sans text-[clamp(16px,1.4vw,20px)] leading-[1.65] text-white/[0.78]"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              {t.text}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.7 }}>
              <AudienceButtons className="mt-7" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      <StepEdge progress={p} />
    </section>
  );
}
