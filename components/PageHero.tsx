"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Fragment, useRef, type ReactNode } from "react";
import { useHeroDrift } from "./heroDrift";
import HeroFog from "./HeroFog";
import { useI18n } from "./I18nProvider";
import { useReady } from "./PageShell";
import { EASE } from "./ui";

/** Big title revealed letter by letter, ending in the blue asterisk of the Framer design. */
function LetterTitle({ text, ready }: { text: string; ready: boolean }) {
  // letters are grouped per word (no wrapping inside a word); the asterisk sticks to the last word
  const words = `${text}*`.split(" ");
  let n = 0;
  return (
    <h1 className="text-[clamp(52px,8.9vw,128px)] font-semibold leading-[0.82] tracking-[-0.03em] text-[#f9f9f9]">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {[...w].map((c, ci) => {
                const i = n++;
                const star = wi === words.length - 1 && ci === w.length - 1;
                return (
                  <span key={ci} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className={`inline-block ${star ? "text-blue" : ""}`}
                      initial={{ y: "105%" }}
                      animate={ready ? { y: 0 } : {}}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.03 }}
                    >
                      {c}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}

function ScrollArrow({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="grid size-[44px] shrink-0 place-items-center rounded-full text-white transition-transform duration-500 hover:translate-y-1">
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" aria-hidden>
        <path d="M14.03 19.81V4.75h2.94v15.06l7.06-6.84L26.1 15 15.5 25.25 4.9 15l2.07-2.03Z" fill="#f9f9f9" />
      </svg>
    </button>
  );
}

/** Dark hero of the inner pages: photo with parallax, "©2026", big title, intro text and a scroll arrow. */
export default function PageHero({
  title,
  text,
  image,
  alt,
  long = false,
  stacked = false,
  fog = true,
  children,
}: {
  title: string;
  text: string;
  image: string;
  alt: string;
  /** sentence-long title: smaller type, revealed as one block */
  long?: boolean;
  /**
   * Framer's "About" hero: no ©2026, a thin rule under the title and the text below it (instead of beside it),
   * and the photo darkened only toward the bottom.
   */
  stacked?: boolean;
  /** the Unicorn Studio fog of the home hero, at Framer's inner-page strength (30%); on for every hero by default */
  fog?: boolean;
  children?: ReactNode;
}) {
  const ready = useReady();
  const { dict } = useI18n();
  const ref = useRef<HTMLElement>(null);
  // Framer's motion: the hero frame scrolls away while its contents stay almost still (see useHeroDrift)
  const drift = useHeroDrift();

  const scrollOn = () => {
    const el = ref.current;
    if (!el) return;
    const l = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    const target = el.offsetTop + el.offsetHeight;
    if (l) l.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={ref} className={`relative overflow-hidden bg-[#090909] ${long ? "min-h-[640px] h-[78svh]" : "h-[clamp(520px,43vw,620px)]"}`}>
      <motion.div className="absolute inset-0" style={{ y: drift.content }}>
      <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: drift.image }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 1.8, ease: EASE }}>
          <Image src={image} alt={alt} fill preload sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      {stacked ? (
        <>
          {/* Framer's overlay: clear at the top, 78% at 60% height, 90% at the bottom */}
          <div
            className="absolute inset-0 bg-[#090909]"
            style={{
              maskImage: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.776) 60%, rgba(0,0,0,0.9) 100%)",
              WebkitMaskImage: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.776) 60%, rgba(0,0,0,0.9) 100%)",
            }}
          />
        </>
      ) : (
        <>
          {/* light overlay: the photo stays bright at the top and darkens only toward the text at the bottom */}
          <div
            className="absolute inset-0 bg-[#090909]"
            style={{
              maskImage: "linear-gradient(rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.78) 100%)",
              WebkitMaskImage: "linear-gradient(rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.78) 100%)",
            }}
          />
        </>
      )}
      {fog && (
        <div className="absolute inset-0 z-[1]">
          <HeroFog className="opacity-30" />
        </div>
      )}
      <div className="absolute inset-x-0 top-0 z-[3] h-[6px] bg-blue" />

      {stacked ? (
        <div className="relative z-[2] flex h-full flex-col justify-end px-[max(clamp(20px,2.4vw,34px),calc((100%-2240px)/2+34px))] pb-[clamp(28px,2.4vw,34px)]">
          <LetterTitle text={title} ready={ready} />
          <motion.div
            className="mt-6 h-px w-full max-w-[830px] origin-left bg-[#eaeaea]/15"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          />
          <motion.div
            className="mt-6 flex items-end justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            <div className="max-w-[650px]">
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.35] text-[#7f7f80]">{text}</p>
              {children && <div className="mt-7">{children}</div>}
            </div>
            <ScrollArrow onClick={scrollOn} label={dict.common.scrollDown} />
          </motion.div>
        </div>
      ) : (
      <div className="relative z-[2] flex h-full flex-col justify-end px-[max(clamp(20px,2.4vw,34px),calc((100%-2240px)/2+34px))] pb-[clamp(28px,2.5vw,36px)]">
        <motion.p
          className="text-[clamp(20px,2.1vw,30px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#f9f9f9]"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          ©2026
        </motion.p>
        <div className={`mt-5 grid items-end gap-6 ${long ? "" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)]"}`}>
          {long ? (
            <motion.h1
              className="max-w-[1100px] text-[clamp(40px,5.6vw,86px)] font-semibold leading-[0.98] tracking-[-0.035em] text-[#f9f9f9]"
              initial={{ opacity: 0, y: 40 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            >
              {title}
              <span className="text-blue">*</span>
            </motion.h1>
          ) : (
            <LetterTitle text={title} ready={ready} />
          )}
          <motion.div
            className="flex items-end justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          >
            <div className="max-w-[650px]">
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.35] text-[#a3a3a5]">{text}</p>
              {children && <div className="mt-7">{children}</div>}
            </div>
            <ScrollArrow onClick={scrollOn} label={dict.common.scrollDown} />
          </motion.div>
        </div>
      </div>
      )}
      </motion.div>
    </section>
  );
}
