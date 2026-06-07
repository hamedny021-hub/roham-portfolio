import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ROHAM — Barista · Hospitality Professional · Creative",
  description:
    "Hamed Roham — 7+ years of specialty coffee, hospitality leadership, and creative service design. Based in Toronto, Canada.",
  keywords: ["barista", "hospitality", "coffee", "latte art", "Toronto", "team leader", "creative"],
  openGraph: {
    title: "ROHAM",
    description: "Where coffee craft meets creative direction.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bodoni.variable} ${inter.variable} bg-ink text-ivory antialiased grain-overlay`}>
        {children}
      </body>
    </html>
  );
}
