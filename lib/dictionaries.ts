import type { Locale } from "./i18n";

export type Dictionary = typeof import("@/messages/uz.json");

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  uz: () => import("@/messages/uz.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
  ru: () => import("@/messages/ru.json").then((m) => m.default),
  de: () => import("@/messages/de.json").then((m) => m.default),
  tr: () => import("@/messages/tr.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => loaders[locale]();
