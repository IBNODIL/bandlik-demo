"use client";

import { MEDIA } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import PartnerBlock from "./PartnerBlock";

/** Which partner rows belong to which tab (financial / service providers / digital ecosystem). */
const KEYS = ["banks", "insurance", "documents", "training", "agencies"] as const;
const GROUP = { banks: 0, insurance: 0, documents: 1, training: 1, agencies: 2 };

/** "Bizning hamkorlar" on the employers page: heading with ®, 478px intro column, 694px list of numbered partner rows. */
export default function EmployersPartners() {
  const t = useI18n().dict.pages.employers.partners;
  return (
    <PartnerBlock
      label={t.label}
      title={t.title}
      mark={<sup className="relative top-[0.1em] ml-[0.03em] align-top text-[0.5em] font-medium leading-none">®</sup>}
      text={t.text}
      tabs={t.highlights}
      numbered
      items={KEYS.map((k, i) => ({ key: k, title: t.rows[k].title, text: t.rows[k].text, logo: MEDIA.employers.logos[i], group: GROUP[k] }))}
    />
  );
}
