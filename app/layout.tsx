import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import ScrollProgress    from "@/components/ui/ScrollProgress";
import AmbientParticles  from "@/components/ui/AmbientParticles";
import CustomCursor      from "@/components/ui/CustomCursor";
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
        <CustomCursor />
        <ScrollProgress />
        <AmbientParticles />

        {/*
          CINEMATIC AMBIENT CSS LAYERS
          Three fixed overlays that keep the scene visually alive
          when videos rest on their final frame.
          All are nearly invisible — felt, never noticed.
        */}

        {/* Primary bloom — warm gold glow that wanders slowly */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9989,
            background:
              "radial-gradient(ellipse 55% 45% at 50% 52%, rgba(212,168,67,0.055) 0%, rgba(180,130,40,0.018) 55%, transparent 100%)",
            animation: "bloomDrift 24s ease-in-out infinite",
          }}
        />

        {/* Secondary bloom — offset phase, lower-left area, adds depth */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9988,
            background:
              "radial-gradient(ellipse 45% 55% at 28% 68%, rgba(212,168,67,0.032) 0%, transparent 100%)",
            animation: "bloomDrift2 31s ease-in-out infinite",
          }}
        />

        {/* Breathing vignette — edges pulse gently so the frame feels alive */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9987,
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5,5,5,0.32) 100%)",
            animation: "vignetteBreathe 8s ease-in-out infinite",
          }}
        />

        {children}
      </body>
    </html>
  );
}
