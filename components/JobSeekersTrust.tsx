"use client";

import { MEDIA } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import PartnerBlock from "./PartnerBlock";

const KEYS = ["licensed", "skills", "terms", "coordination"] as const;
const GROUP = { licensed: 0, coordination: 0, skills: 1, terms: 1 };

/** "Ishonchli va xavfsizlik" on the job-seekers page: 610px intro column, 656px list of four rows with empty pills. */
export default function JobSeekersTrust() {
  const t = useI18n().dict.pages.jobSeekers.trust;
  return (
    <PartnerBlock
      label={t.label}
      title={t.title}
      text={t.text}
      tabs={t.highlights}
      leftWidth={610}
      rightWidth={656}
      items={KEYS.map((k, i) => ({ key: k, title: t.rows[k].title, text: t.rows[k].text, logo: MEDIA.employers.logos[i], group: GROUP[k] }))}
    />
  );
}
