"use client";

import AboutStory from "./AboutStory";
import Contact from "./Contact";
import FAQ from "./FAQ";
import EmployersPartners from "./EmployersPartners";
import JobSeekersTrust from "./JobSeekersTrust";
import FullImage from "./FullImage";
import { useI18n } from "./I18nProvider";
import Journey from "./Journey";
import PageHero from "./PageHero";
import PageShell from "./PageShell";
import ServiceCards from "./ServiceCards";
import { PillButton } from "./ui";
import Vacancies from "./Vacancies";
import Workflow from "./Workflow";
import { MEDIA } from "@/lib/data";
import { localizedHref } from "@/lib/i18n";

export function AboutPage() {
  const t = useI18n().dict.pages.about;
  return (
    <PageShell>
      <PageHero stacked title={t.hero.title} text={t.hero.text} image={MEDIA.about.hero} alt={t.hero.alt} />
      <AboutStory />
      <Journey />
      <FAQ />
    </PageShell>
  );
}

export function EmployersPage() {
  const { lang, dict } = useI18n();
  const t = dict.pages.employers;
  return (
    <PageShell>
      <PageHero long title={t.hero.title} text={t.hero.text} image={MEDIA.employers.hero} alt={t.hero.alt}>
        <PillButton href={localizedHref(lang, "/contact")}>{dict.common.requestWorkers}</PillButton>
      </PageHero>
      <EmployersPartners />
      <Workflow />
      <FullImage src={MEDIA.employers.parallax} alt={t.imageAlt} />
      <FAQ />
    </PageShell>
  );
}

export function JobSeekersPage() {
  const t = useI18n().dict.pages.jobSeekers;
  return (
    <PageShell>
      <PageHero title={t.hero.title} text={t.hero.text} image={MEDIA.jobSeekers.hero} alt={t.hero.alt} />
      <JobSeekersTrust />
      <Vacancies limit={10} inset cta={false} label={t.vacanciesLabel} />
      <Journey />
      <FAQ />
    </PageShell>
  );
}

export function ServicesPage() {
  const t = useI18n().dict.pages.services;
  return (
    <PageShell>
      <PageHero title={t.hero.title} text={t.hero.text} image={MEDIA.services.hero} alt={t.hero.alt} />
      <ServiceCards />
      <FAQ />
    </PageShell>
  );
}

export function VacanciesPage() {
  const t = useI18n().dict.pages.vacancies;
  return (
    <PageShell>
      <PageHero title={t.hero.title} text={t.hero.text} image={MEDIA.vacancies.hero} alt={t.hero.alt} />
      <Vacancies heading={false} />
    </PageShell>
  );
}

export function ContactPage() {
  const t = useI18n().dict.pages.contact;
  return (
    <PageShell>
      <PageHero title={t.hero.title} text={t.hero.text} image={MEDIA.contact.hero} alt={t.hero.alt} />
      <Contact page />
      <FAQ />
    </PageShell>
  );
}
