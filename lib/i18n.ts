export const locales = ["uz", "en", "ru", "de", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

/** Endonyms (each language written in itself); these are names, not translations. */
export const localeNames: Record<Locale, string> = {
  uz: "Özbekça",
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  tr: "Türkçe",
};

/** Remembers the language the visitor picked, so a bare "/" opens it next time. */
export const LOCALE_COOKIE = "bandlik-lang";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** First supported language found in the browser's preference list, if any. */
export function matchBrowserLocale(languages: readonly string[]): Locale | null {
  for (const l of languages) {
    const code = l.toLowerCase().split("-")[0];
    if (hasLocale(code)) return code;
  }
  return null;
}
