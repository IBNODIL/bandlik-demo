"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type Value = { lang: Locale; dict: Dictionary };

const Ctx = createContext<Value | null>(null);

export default function I18nProvider({ lang, dict, children }: Value & { children: React.ReactNode }) {
  return <Ctx.Provider value={{ lang, dict }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
}
