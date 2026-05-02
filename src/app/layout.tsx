import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
// @ts-ignore
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Prasetyo & Yolla — Undangan Pernikahan",
  description:
    "Dengan penuh sukacita, kami mengundang Anda untuk hadir dalam hari bahagia kami.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
