"use client";

import { useEffect, useRef, useState } from "react";
import { motion }                       from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const v       = videoRef.current;
    if (!section || !v) return;

    const playFromStart = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    // Observe the section element (normal flow, reliable intersection detection).
    // The video element itself is absolute-positioned inside overflow-hidden,
    // which can cause IntersectionObserver edge cases — section is safer.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playFromStart();
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    // canplay fires as soon as playback can begin — trigger the fade-in
    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay, { once: true });

    // Resume if tab was hidden and video hasn't ended
    const onVisibility = () => {
      if (!document.hidden && v.paused && !v.ended) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      v.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[100svh] flex items-end justify-start overflow-hidden bg-ink"
    >

      {/* ── Video — plays once, freezes on last frame ── */}
      {/*
        Fade is 1000ms (was 3000ms). Shorter fade means the user sees
        nearly all of the clip rather than losing the first 3 seconds
        during an invisible transition.
      */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center 40%" }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/01-bean-hero.MP4" type="video/mp4" />
      </video>

      {/* ── Overlays ───────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "rgba(8,5,3,0.38)" }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 55% 45%,
              transparent 28%,
              rgba(5,5,5,0.50) 100%
            ),
            linear-gradient(to bottom,
              rgba(5,5,5,0.30) 0%,
              transparent      18%,
              transparent      52%,
              rgba(5,5,5,0.95) 100%
            )
          `,
        }}
      />

      {/* ── Content — bottom-left, film-caption style ── */}
      <div className="relative z-20 w-full px-8 md:px-16 pb-20 md:pb-24">

        <motion.p
          className="font-inter text-[9px] tracking-[0.55em] uppercase text-gold/45 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
        >
          Toronto, Canada
        </motion.p>

        {/* Name — cinematic rise from below */}
        <div className="overflow-hidden mb-5">
          <motion.h1
            className="font-bodoni font-black leading-[0.88] tracking-[0.14em]"
            style={{ fontSize: "clamp(3rem, 8.5vw, 6.5rem)" }}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          >
            <span className="gold-shimmer">ROHAM</span>
          </motion.h1>
        </div>

        {/* Roles */}
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.4, ease: EASE }}
        >
          {["Barista", "Hospitality Professional", "Team Leader"].map((r, i) => (
            <span key={r} className="flex items-center gap-4">
              <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-ivory/50 font-light">
                {r}
              </span>
              {i < 2 && <span className="text-gold/22 text-[7px]">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-bodoni italic text-base md:text-lg text-ivory/28 tracking-wide mb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.7, ease: EASE }}
        >
          Where coffee craft meets creative direction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 2.0, ease: EASE }}
        >
          <a
            href="#experience"
            className="btn-gold font-inter text-[10px] tracking-[0.28em] uppercase px-8 py-3.5"
          >
            View Experience
          </a>
          <a
            href="#contact"
            className="font-inter text-[10px] tracking-[0.25em] uppercase text-ivory/28 hover:text-ivory/58 transition-colors duration-500"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator — right edge ─────────── */}
      <motion.div
        className="absolute right-9 bottom-9 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2, ease: EASE }}
      >
        <div
          className="w-px h-12 origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(212,168,67,0.38), transparent)",
            animation: "scrollPulse 2.8s ease-in-out infinite",
          }}
        />
        <span className="font-inter text-[7px] tracking-[0.45em] uppercase text-ivory/16">
          Scroll
        </span>
      </motion.div>

      {/* ── Bottom crossfade into next section ──────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
