import { LOCALE_COOKIE, type Locale } from "./i18n";

/** Remember the choice and open the same page (and section) in another language (full page load, no intro replay). */
export function switchLocale(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    sessionStorage.setItem("bandlik-switch", "1");
  } catch {}
  const { pathname, search, hash } = window.location;
  const path = pathname.replace(/^\/[^/]+/, `/${locale}`);
  // full reload on purpose: root layout (html lang, fonts, dictionary) changes with the language
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `${path}${search}${hash}`;
}
