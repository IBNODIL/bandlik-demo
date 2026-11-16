import type { Locale } from "./i18n";

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? `{${k}}`));

export const formatNumber = (lang: Locale, n: number) => new Intl.NumberFormat(lang).format(n);

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
