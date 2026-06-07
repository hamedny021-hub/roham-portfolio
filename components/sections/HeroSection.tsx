"use client";

import { useEffect, useRef, useState } from "react";
import { motion }                       from "framer-motion";

export default function HeroSection() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Prevent restart: keep video playing on visibility change
    const handleVisibility = () => {
      if (!document.hidden && v.paused) v.play().catch(() => {});
    };

    v.addEventListener("canplaythrough", () => {
      setReady(true);
      v.play().catch(() => {});
    });

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const stagger = (i: number) => ({ duration: 1.1, delay: 1.0 + i * 0.18, ease: [0.16, 1, 0.3, 1] as any });

  return (
    <section id="hero" className="relative w-full h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink">

      {/* ── Video ──────────────────────────────────── */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${ready ? "opacity-100" : "opacity-0"}`}
        muted loop playsInline preload="auto"
        /*
         * ╔══════════════════════════════════════════════════════╗
         * ║  PLACE YOUR VIDEO FILES HERE:                        ║
         * ║                                                      ║
         * ║  /public/videos/hero.webm   ← preferred (VP9)       ║
         * ║  /public/videos/hero.mp4    ← fallback  (H.264)     ║
         * ║                                                      ║
         * ║  Recommended: 1920×1080, H.264/VP9, 4-8 Mbps        ║
         * ║  Duration: any — it loops automatically              ║
         * ╚══════════════════════════════════════════════════════╝
         */
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4"  type="video/mp4"  />
      </video>

      {/* ── Cinematic overlay ──────────────────────── */}
      <div className="video-vignette absolute inset-0 z-10" />

      {/* ── Horizontal accent line (top) ───────────── */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px z-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.35), transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Content ────────────────────────────────── */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto select-none">

        {/* Pre-label */}
        <motion.p
          className="font-inter text-[10px] tracking-[0.55em] uppercase text-gold/60 mb-9"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(0)}
        >
          Toronto, Canada · Est. 2019
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-bodoni font-black leading-[0.88] tracking-[0.12em] mb-8"
          style={{ fontSize: "clamp(4.5rem, 16vw, 11rem)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(1)}
        >
          <span className="gold-shimmer">ROHAM</span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={stagger(2)}
        >
          {["Barista", "Hospitality Professional", "Team Leader"].map((r, i) => (
            <span key={r} className="flex items-center gap-4">
              <span className="font-inter text-[11px] md:text-sm tracking-[0.2em] uppercase text-ivory/70">{r}</span>
              {i < 2 && <span className="text-gold/30 text-xs">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-bodoni italic text-xl md:text-3xl text-ivory/45 tracking-wide mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
        >
          Where coffee craft meets creative direction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(4)}
        >
          <a href="#experience" className="btn-gold font-inter text-[11px] tracking-[0.28em] uppercase px-10 py-4">
            View Experience
          </a>
          <a href="#contact" className="font-inter text-[11px] tracking-[0.25em] uppercase text-ivory/35 hover:text-ivory/70 transition-colors duration-300">
            Get in Touch →
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-ivory/20">Scroll</span>
        <div
          className="w-px h-14 origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(212,168,67,0.5), transparent)",
            animation: "scrollPulse 2.4s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* ── Bottom fade to next section ───────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
