import type { Metadata } from "next";
import { getDictionary, type Dictionary } from "./dictionaries";
import { hasLocale, locales } from "./i18n";

type PageKey = keyof Dictionary["pages"];
type Props = { params: Promise<{ lang: string }> };

/** generateMetadata for an inner page: its menu name as the page title, the hero text as description, per-language alternates. */
export const pageMetadata =
  (key: PageKey, path: string) =>
  async ({ params }: Props): Promise<Metadata> => {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const dict = await getDictionary(lang);
    const page = dict.pages[key];
    return {
      title: dict.nav[key].title,
      description: page.hero.text,
      alternates: {
        canonical: `/${lang}${path}`,
        languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])), "x-default": `/uz${path}` },
      },
    };
  };
