"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { getCourses } from "@/lib/api/client";
import type { Course } from "@/lib/api/types";
import { useResource } from "@/lib/api/use-resource";
import { MEDIA } from "@/lib/data";
import { fill, formatNumber } from "@/lib/format";
import { localizedHref } from "@/lib/i18n";
import BgShade from "./BgShade";
import { useI18n } from "./I18nProvider";
import ResourceState from "./ResourceState";
import { EASE, FadeUp, PillButton, PlusRule, SectionHead, SplitReveal } from "./ui";

function Meta({ icon, children, blue = false }: { icon: string; children: React.ReactNode; blue?: boolean }) {
  return (
    <span className={`flex items-center gap-[7px] whitespace-nowrap ${blue ? "text-blue" : "text-slate"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/framer/icons/${icon}.svg`} alt="" className="size-[18px]" />
      {children}
    </span>
  );
}

function CourseCard({ course, i }: { course: Course; i: number }) {
  const { lang, dict } = useI18n();
  const t = dict.courses;
  const title = course.title[lang];
  return (
    <motion.article
      className="group overflow-hidden rounded-[12px] bg-white ring-1 ring-ink/[0.05] transition-shadow duration-500 hover:shadow-[0_10px_30px_rgba(9,9,9,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (i % 5) * 0.06 }}
    >
      <div className="relative aspect-[253/150] overflow-hidden">
        <Image
          src={course.imageUrl ?? MEDIA.course}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {course.status !== "open" && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-[3px] font-sans text-[12px] font-semibold text-ink shadow-[0_2px_10px_rgba(9,9,9,0.12)]">
            {t.status[course.status]}
          </span>
        )}
      </div>
      <div className="px-[14px] pb-4 pt-[14px] font-gilroy font-medium">
        <h3 className="text-[16px] font-semibold leading-[22px] text-[#0c111d]">{t.category[course.category]}</h3>
        <p title={title} className="mt-[2px] truncate text-[14px] leading-5 text-slate">
          {title}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[14px] leading-5">
          <Meta icon="cash-blue" blue>
            {course.priceUzs === 0 ? t.free : fill(t.price, { amount: formatNumber(lang, course.priceUzs) })}
          </Meta>
          <Meta icon="clock-course">{fill(t.hours, { count: formatNumber(lang, course.hours) })}</Meta>
          <Meta icon="play-circle">{fill(t.lessons, { count: formatNumber(lang, course.lessons) })}</Meta>
        </div>
      </div>
    </motion.article>
  );
}

export default function Courses({ limit = 10 }: { limit?: number }) {
  const { lang, dict } = useI18n();
  const t = dict.courses;
  const res = useResource(getCourses);
  const items = res.status === "ready" ? res.data.slice(0, limit) : [];
  return (
    <section id="courses" className="relative z-20 overflow-hidden bg-white pt-[clamp(70px,6vw,120px)]">
      <BgShade />
      <PlusRule />
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pt-[28px]">
        <SectionHead label={t.label} />
        <div className="mt-[50px] flex flex-col items-center text-center">
          <SplitReveal
            className="max-w-[1000px] text-[clamp(48px,7.6vw,110px)] font-semibold leading-[0.82] tracking-[-0.03em] text-[#1e1e1e]"
            text={t.heading}
          />
          <FadeUp delay={0.15}>
            <p className="mt-[30px] max-w-[800px] text-[18px] leading-6 text-soft">{t.intro}</p>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-[30px]">
            <PillButton href={localizedHref(lang, "/services")}>{t.cta}</PillButton>
          </FadeUp>
        </div>
      </div>
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(70px,6vw,110px)] pt-[50px]">
        {res.status !== "ready" || items.length === 0 ? (
          <ResourceState state={res.status === "ready" ? "empty" : res.status} onRetry={res.status === "error" ? res.reload : () => {}} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {items.map((c, i) => (
              <CourseCard key={c.id} course={c} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
