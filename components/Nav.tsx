"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IMG, NAV, img } from "@/lib/data";
import { ArrowRight, EASE } from "./ui";

export default function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const go = (e: React.MouseEvent, href: string, i: number) => {
    e.preventDefault();
    setActive(i);
    setOpen(false);
    const l = (window as unknown as { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
    l?.scrollTo(href === "#top" ? 0 : href, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  };

  // highlight the link whose section is currently in view
  useEffect(() => {
    const ids = [...new Set(NAV.map((n) => n.href.slice(1)))];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(NAV.findIndex((n) => n.href === "#" + en.target.id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);


  return (
    <>
      <motion.header
        className="absolute inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div
          className={`mx-auto flex h-[68px] max-w-[1441px] items-center justify-between px-[34px] xl:px-[58px] transition-[background,backdrop-filter] duration-500 ${
            ""
          }`}
        >
          <a href="#top" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(IMG.logo, 400)} alt="Bandlik" className="h-[28px] w-auto" />
          </a>

          <nav className="ml-[18px] hidden flex-1 items-center justify-between lg:flex xl:ml-[28px] xl:pr-[10px]">
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                onClick={(e) => go(e, n.href, i)}
                className={`group relative text-[clamp(14px,1.15vw,22px)] font-semibold leading-[1.2] transition-colors duration-500 hover:text-blue ${
                  active === i ? "text-blue" : "text-ink/40"
                }`}
              >
                <span className="relative inline-block overflow-hidden align-top">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                    {n.label}
                  </span>
                  <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                    {n.label}
                  </span>
                </span>
                <sup className="ml-[1px] align-super text-[10px] font-medium opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </sup>
                {active === i && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="grid size-9 place-items-center lg:hidden"
            >
              <span className="block h-[2px] w-5 bg-ink before:mt-[-6px] before:block before:h-[2px] before:w-5 before:bg-ink after:mt-[10px] after:block after:h-[2px] after:w-5 after:bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-white px-[34px] lg:hidden"
        initial={false}
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {NAV.map((n) => (
          <a key={n.label} href={n.href} onClick={(e) => go(e, n.href, NAV.indexOf(n))} className="flex items-center justify-between text-[34px] font-semibold tracking-tight">
            {n.label}
            <ArrowRight />
          </a>
        ))}
      </motion.div>
    </>
  );
}
