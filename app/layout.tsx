import type { Metadata } from "next";
import { Inter, Inter_Tight, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});
const gilroy = Manrope({
  variable: "--font-gilroy",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bandlik",
  description:
    "Xalqaro bandlik platformasi: ish beruvchilar uchun ishchi so‘rovi, nomzodlar uchun tekshirilgan vakansiyalar va tayyorlov kurslari.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${display.variable} ${gilroy.variable}`}>
      <body>{children}</body>
    </html>
  );
}
