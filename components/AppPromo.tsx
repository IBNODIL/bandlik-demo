"use client";

import Image from "next/image";
import { MEDIA, STORE } from "@/lib/data";
import { fill } from "@/lib/format";
import { useI18n } from "./I18nProvider";
import { FadeUp, PillButton, PlusRule, SectionHead, SplitReveal } from "./ui";

/** "Platform features": mobile app pitch with store QR codes and a hand-held phone playing the app screen. */
export default function AppPromo() {
  const t = useI18n().dict.app;
  const stores = [
    { name: "App Store", qr: MEDIA.qrAppStore, href: STORE.appStore },
    { name: "Google Play", qr: MEDIA.qrGooglePlay, href: STORE.googlePlay },
  ];
  return (
    <section className="relative z-20 bg-white pt-[clamp(70px,6vw,120px)]">
      <PlusRule />
      <div className="mx-auto max-w-[1920px] px-[clamp(20px,2.8vw,40px)] pt-[28px]">
        <SectionHead label={t.label} note={t.tagline} />
        <div className="grid items-center gap-12 pb-[clamp(40px,4vw,70px)] pt-[clamp(50px,6vw,90px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:pl-[clamp(0px,1.4vw,24px)]">
          <div>
            <SplitReveal
              as="h2"
              className="max-w-[780px] text-[clamp(38px,4vw,58px)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#1e1e1e]"
              text={t.title}
            />
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-[550px] text-[clamp(17px,1.4vw,20px)] leading-[1.4] text-soft">{t.text}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-[50px] flex gap-6">
                {stores.map((s) => (
                  <Image key={s.name} src={s.qr} alt={fill(t.qr, { store: s.name })} width={134} height={134} className="size-[clamp(110px,9.3vw,134px)]" />
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-[50px] flex flex-wrap gap-4">
                {stores.map((s) => (
                  <PillButton key={s.name} href={s.href} className="!bg-[#fafaf9]">
                    {s.name}
                  </PillButton>
                ))}
              </div>
            </FadeUp>
          </div>

          {/*
            The mockup (1288×1968) has a transparent screen cut-out at x 334–955, y 162–1502 with ~90px corners,
            and its own dynamic island. The video sits behind the image, filling that cut-out (a hair larger so
            no seam shows); the frame, island and fingers in the image then cover its edges.
          */}
          <div className="relative mx-auto aspect-[1288/1968] w-[min(397px,80vw)]">
            <video
              className="absolute left-[25.8%] top-[8.1%] h-[68.3%] w-[48.5%] rounded-[15%/7%] bg-white object-cover"
              src={MEDIA.phoneVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
            <Image src={MEDIA.phone} alt={t.phoneAlt} fill sizes="400px" className="z-[1] object-contain" />

            {/* fog: the bottom of the hand dissolves into the white section (soft blur + white fade) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[12%] bottom-0 z-[2] h-[20%] backdrop-blur-[6px]"
              style={{ maskImage: "linear-gradient(to top, #000 40%, transparent)", WebkitMaskImage: "linear-gradient(to top, #000 40%, transparent)" }}
            />
            {/* starts just below the phone (its bottom edge is at 76% of the image), so the screen stays crisp */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[12%] -bottom-px z-[2] h-[23%]"
              style={{ background: "linear-gradient(to top, #fff 20%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.4) 72%, rgba(255,255,255,0))" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
