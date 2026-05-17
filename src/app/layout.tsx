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

const title = "Yolla & Tyo - Undangan Pernikahan";
const description =
  "Dengan penuh sukacita, kami mengundang Anda untuk hadir dalam hari bahagia kami.";
const coverImage = "/images/chapter3-story2.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://yollapras.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://yollapras.vercel.app",
    siteName: "Yolla & Tyo",
    images: [
      {
        url: coverImage,
        width: 1200,
        height: 630,
        alt: "Yolla dan Tyo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [coverImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
