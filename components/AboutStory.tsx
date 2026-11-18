"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import StepEdge from "./StepEdge";
import { MEDIA } from "@/lib/data";
import BgShade from "./BgShade";
import { useI18n } from "./I18nProvider";
import { FadeUp, Label, PlusRule } from "./ui";

/*
 * About page story, rebuilt from the Framer page measured at 2240px:
 * label column 377px | content 968px, four text blocks with a 1–3 of 4 progress row, photos 1345×720 (pair 662×600).
 * Photos sit in fixed rounded frames; the picture inside each frame zooms out while the frame scrolls in.
 */

/**
 * Photo in a fixed rounded frame: the frame keeps its size and place, only the picture inside zooms out
 * (25% larger → fit) while the frame scrolls from the bottom of the screen to the top.
 */
function ZoomPhoto({ src, alt, className, sizes = "100vw" }: { src: string; alt: string; className: string; sizes?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["0 1.15", "0 0.02"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  return (
    <div ref={frame} className={`relative overflow-hidden rounded-[10px] bg-card ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}

/** Last photo: white stepped blocks rise over its bottom edge as it scrolls away, leading into the next section. */
function ClosingPhoto({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.6", "end 0.1"] });
  const steps = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <div ref={wrap} className="relative mt-[120px] overflow-hidden">
      <ZoomPhoto src={src} alt={alt} className="aspect-[1345/730]" />
      <StepEdge progress={steps} />
    </div>
  );
}

/** "1 of 4" style progress row under each text block. */
function Progress({ step }: { step: number }) {
  return (
    <div className="mt-[30px] flex gap-[6px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`size-[10px] rounded-full ${i < step ? "bg-blue" : "bg-[#d9d9d9]"}`} />
      ))}
    </div>
  );
}

/** Label in the 377px column, content in the 968px column. */
function Row({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-[377px_minmax(0,968px)] lg:gap-0 ${className}`}>
      <Label className="items-start [&>span]:mt-[7px] [&>span]:size-[13px]">{label}</Label>
      <FadeUp>{children}</FadeUp>
    </div>
  );
}

function Block({ label, title, text, step }: { label: string; title: string; text: string; step: number }) {
  return (
    <Row label={label}>
      <h2 className="text-[22px] font-medium leading-[35px] tracking-[-0.045em] text-[#1e1e1e]">{title}</h2>
      <p className="mt-5 text-[18px] leading-6 text-soft">{text}</p>
      <Progress step={step} />
    </Row>
  );
}

export default function AboutStory() {
  const t = useI18n().dict.pages.about;
  return (
    <section className="relative z-20 overflow-hidden bg-white pt-[100px]">
      <BgShade />
      <PlusRule className="!mx-[clamp(20px,2.8vw,40px)]" />
      <div className="relative mx-auto max-w-[2240px] px-[clamp(20px,2.8vw,40px)]">
        {/* our approach: stars + kicker between two thin rules */}
        <Row label={t.approach.label} className="pt-[50px]">
          <div className="border-y border-[#eaeaea] py-10">
            <div className="flex gap-0 text-blue" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7L2 9.5l7.1-.6z" />
                </svg>
              ))}
            </div>
            <h2 className="mt-5 text-[18px] font-semibold leading-[26px] text-[#29292b]">{t.approach.kicker}</h2>
            <p className="mt-5 max-w-[880px] text-[18px] leading-6 text-soft">{t.approach.text}</p>
          </div>
        </Row>
        <ZoomPhoto src={MEDIA.about.approach} alt={t.approach.alt} className="mt-5 aspect-[1345/720]" />

        {/* the problem: text + two photos */}
        <div className="mt-[110px]">
          <Block label={t.problem.label} title={t.problem.title} text={t.problem.text} step={1} />
        </div>
        <div className="mt-[120px] grid gap-5 md:grid-cols-2">
          <ZoomPhoto src={MEDIA.about.problemA} alt={t.problem.altA} className="aspect-[662/600]" sizes="(min-width: 768px) 50vw, 100vw" />
          <ZoomPhoto src={MEDIA.about.problemB} alt={t.problem.altB} className="aspect-[662/600]" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        {/* our solution */}
        <div className="mt-[110px]">
          <Block label={t.solution.label} title={t.solution.title} text={t.solution.text} step={2} />
        </div>
        <ZoomPhoto src={MEDIA.about.solution} alt={t.solution.alt} className="mt-[120px] aspect-[1345/720]" />

        {/* our goal + closing photo */}
        <div className="mt-[110px]">
          <Block label={t.mission.label} title={t.mission.title} text={t.mission.text} step={3} />
        </div>
        <ClosingPhoto src={MEDIA.about.closing} alt={t.mission.alt} />
      </div>
    </section>
  );
}
