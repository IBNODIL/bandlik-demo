"use client";

import { useEffect } from "react";
import ErrorView from "@/components/ErrorView";
import { useI18n } from "@/components/I18nProvider";
import SiteBar from "@/components/SiteBar";

// Catches errors thrown below the layout; the header (logo, language switcher) stays in place.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  const { lang } = useI18n();
  useEffect(() => {
    console.error(error);
  }, [error]);
  const digest = error instanceof globalThis.Error ? (error as { digest?: string }).digest : undefined;
  return (
    <>
      <SiteBar />
      <ErrorView lang={lang} digest={digest} retry={retry} withBar />
    </>
  );
}
