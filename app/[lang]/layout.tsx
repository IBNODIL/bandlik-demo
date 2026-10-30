import type { Metadata } from "next";
import { Inter, Inter_Tight, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import I18nProvider from "@/components/I18nProvider";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

// cyrillic is needed for Russian; the browser downloads it only when those glyphs are on the page
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "cyrillic"] });
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});
const gilroy = Manrope({
  variable: "--font-gilroy",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
});

type Props = { params: Promise<{ lang: string }> };

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bandlik.uz"),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/uz" },
    },
  };
}

// Skips the loader intro right after a language switch (the flag is set by switchLocale).
const NO_INTRO = `try{if(sessionStorage.getItem("bandlik-switch")){document.documentElement.setAttribute("data-no-intro","");sessionStorage.removeItem("bandlik-switch")}}catch(e){}`;

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode } & Props>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${display.variable} ${gilroy.variable}`} suppressHydrationWarning>
      <body>
        <Script id="no-intro" strategy="beforeInteractive">
          {NO_INTRO}
        </Script>
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
