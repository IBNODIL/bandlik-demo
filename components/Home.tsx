"use client";

import About from "@/components/About";
import AppPromo from "@/components/AppPromo";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import FAQ from "@/components/FAQ";
import FullImage from "@/components/FullImage";
import Hero from "@/components/Hero";
import { useI18n } from "@/components/I18nProvider";
import PageShell from "@/components/PageShell";
import Process from "@/components/Process";
import Vacancies from "@/components/Vacancies";
import { MEDIA } from "@/lib/data";

export default function Home() {
  const { dict } = useI18n();
  return (
    <PageShell>
      <Hero />
      <About />
      <Process />
      <FullImage src={MEDIA.man} alt={dict.fullImages.man} />
      <Vacancies limit={10} />
      <FullImage src={MEDIA.woman} alt={dict.fullImages.woman} />
      <AppPromo />
      <Courses />
      <FAQ />
      <Contact />
    </PageShell>
  );
}
