"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CLIENTS, IMG, img } from "@/lib/data";
import { FadeUp, Label, Marquee, PillButton, PlusRule, SplitReveal } from "./ui";

function Info({ title, body }: { title: string; body: string }) {
  return (
    <FadeUp className="border-y border-ink/[0.07] py-8">
      <h3 className="text-[18px] leading-[24px] text-ink">{title}</h3>
      <p className="mt-6 max-w-[380px] text-[18px] leading-[24px] text-mute">{body}</p>
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
      {/* faint diagonal background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[12%] top-[8%] h-[1000px] w-[700px] -rotate-[28deg] rounded-[120px] bg-black/[0.018]" />
        <div className="absolute -right-[10%] top-[34%] h-[700px] w-[500px] rotate-[24deg] rounded-[120px] bg-black/[0.018]" />
      </div>

      <PlusRule className="relative top-[2px]" />

      <div className="relative mx-auto max-w-[1441px] px-[38px] pt-[28px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[382px_1fr]">
          <Label className="pt-[10px]">Ish beruvchilar uchun</Label>
          <div className="lg:pr-[40px]">
            <SplitReveal
              as="p"
              className="text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#1e1e1e] sm:text-[48px] lg:text-[54px]"
              indent={156}
              text="Kerakli kasb, ishchilar soni, til darajasi va mehnat shartlarini belgilang. Bandlik platformasi orqali ishchi so‘rovingizni yuboring."
            />
            <FadeUp delay={0.2} className="mt-12">
              <PillButton>Ishchi so&apos;rash</PillButton>
            </FadeUp>
            <div className="mt-[56px] grid gap-x-20 md:grid-cols-2">
              <Info title="Ishchi ehtiyojini belgilang" body="Kompaniya, kerakli kasb, ishchilar soni, til darajasi va ish shartlari haqida ma’lumot bering." />
              <Info title="Ish jarayoni bilan tanishing" body="Xizmatlar sahifasida ishga yollash bosqichlari, mas’ul tomonlar va o‘rtacha muddatlarni ko‘ring." />
            </div>
          </div>
        </div>

        <div className="mt-[90px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
          <PhotoCard id={IMG.worker} alt="Qurilish ishchisi" i={0} />
          <PhotoCard id={IMG.chef} alt="Oshpaz" i={1} />
          <PhotoCard id={IMG.warehouse} alt="Ombor xodimi" i={2} />
        </div>
      </div>

      <PlusRule className="relative mt-[60px]" />
      <div className="mx-[38px] mt-[70px] border-y border-ink/[0.07]">
        <Marquee duration={40}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="grid h-[110px] w-[250px] shrink-0 place-items-center border-r border-ink/[0.07] text-[32px] font-bold tracking-tight text-ink/90">
              {c}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
