"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import Cursor from "@/components/Cursor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FullImage from "@/components/FullImage";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import SmoothScroll from "@/components/SmoothScroll";
import Vacancies from "@/components/Vacancies";
import { IMG } from "@/lib/data";

export default function Page() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <>
      <SmoothScroll locked={!ready} />
      <Cursor />
      <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Process />
        <FullImage id={IMG.man} alt="Xorijga yo‘l olgan yigit" />
        <Vacancies />
        <FullImage id={IMG.woman} alt="Xorijga yo‘l olgan qiz" />
        <Benefits />
        <Courses />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
