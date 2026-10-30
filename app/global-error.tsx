"use client";

import { useEffect, useState } from "react";
import ErrorView from "@/components/ErrorView";
import { LOCALE_COOKIE, defaultLocale, hasLocale, type Locale } from "@/lib/i18n";
import "./globals.css";

/** The language is not known here (the layout failed): take it from the URL, then the cookie. */
function detectLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const fromPath = window.location.pathname.split("/")[1];
  if (hasLocale(fromPath)) return fromPath;
  const saved = document.cookie.split("; ").find((c) => c.startsWith(`${LOCALE_COOKIE}=`))?.split("=")[1];
  return saved && hasLocale(saved) ? saved : defaultLocale;
}

// Replaces the root layout when it crashes, so it brings its own <html> and <body>.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  const [lang] = useState(detectLocale);
  useEffect(() => {
    console.error(error);
  }, [error]);
  const digest = error instanceof Error ? (error as { digest?: string }).digest : undefined;
  return (
    <html lang={lang}>
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <ErrorView lang={lang} digest={digest} retry={retry} />
      </body>
    </html>
  );
}
