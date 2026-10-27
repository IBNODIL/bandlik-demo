"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CLIENTS, IMG, img } from "@/lib/data";
import BgShade from "./BgShade";
import { FadeUp, Label, Marquee, PillButton, PlusRule, SplitReveal } from "./ui";

function Info({ title, body }: { title: string; body: string }) {
  return (
    <FadeUp className="border-y border-ink/[0.07] py-8">
      <h3 className="text-[clamp(16px,1.15vw,24px)] leading-[1.35] text-ink">{title}</h3>
      <p className="mt-6 max-w-[28vw] min-w-[260px] text-[clamp(16px,1.15vw,24px)] leading-[1.35] text-mute">{body}</p>
    </FadeUp>
  );
}

function PhotoCard({ id, alt, i }: { id: string; alt: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div
      ref={ref}
      className="relative aspect-[1204/860] overflow-hidden rounded-lg bg-card"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.12 }}
    >
      <motion.div className="absolute inset-0 -top-[10%] h-[120%]" style={{ y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(id, 1000)} alt={alt} className="h-full w-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-white">
      <BgShade />

      <PlusRule className="relative top-[2px]" />

      <div className="relative w-full px-[38px] pt-[28px] lg:px-[2.6vw]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[26.4vw_1fr]">
          <Label className="pt-[10px]">Ish beruvchilar uchun</Label>
          <div className="lg:pr-[40px]">
            <SplitReveal
              as="p"
              className="text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1e1e1e] sm:text-[48px] lg:text-[clamp(48px,3.45vw,72px)]"
              indent={156}
              text="Kerakli kasb, ishchilar soni, til darajasi va mehnat shartlarini belgilang. Bandlik platformasi orqali ishchi so‘rovingizni yuboring."
            />
            <FadeUp delay={0.2} className="mt-12">
              <PillButton>Ishchi so&apos;rash</PillButton>
            </FadeUp>
            <div className="mt-[56px] grid gap-x-[5.6vw] md:grid-cols-2">
              <Info title="Ishchi ehtiyojini belgilang" body="Kompaniya, kerakli kasb, ishchilar soni, til darajasi va ish shartlari haqida ma’lumot bering." />
              <Info title="Ish jarayoni bilan tanishing" body="Xizmatlar sahifasida ishga yollash bosqichlari, mas’ul tomonlar va o‘rtacha muddatlarni ko‘ring." />
            </div>
          </div>
        </div>

        <div className="mt-[clamp(70px,5.8vw,112px)] grid grid-cols-1 gap-[18px] lg:gap-[1.3vw] md:grid-cols-3">
          <PhotoCard id={IMG.worker} alt="Qurilish ishchisi" i={0} />
          <PhotoCard id={IMG.chef} alt="Oshpaz" i={1} />
          <PhotoCard id={IMG.warehouse} alt="Ombor xodimi" i={2} />
        </div>
      </div>

      <PlusRule className="relative mt-[clamp(70px,5.8vw,112px)]" />
      <div className="mt-[clamp(70px,7.8vw,150px)] border-y border-ink/[0.07]">
        <Marquee duration={40}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="grid h-[clamp(110px,11.7vw,225px)] w-[clamp(250px,17.4vw,335px)] shrink-0 place-items-center border-r border-ink/[0.07] text-[clamp(26px,2.3vw,44px)] font-bold tracking-tight text-ink/90">
              {c}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
