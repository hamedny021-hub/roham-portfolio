"use client";

import { useEffect, useRef, useState } from "react";
import { motion }                       from "framer-motion";
import { gsap }                         from "gsap";
import { ScrollTrigger }                from "gsap/ScrollTrigger";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Hero section — cinematic scroll-scrubbed video.
 *
 * Architecture
 * ────────────
 * Outer <section>  : height 600vh  — provides the scroll runway.
 * Inner sticky div : height 100vh  — stays in view the entire time.
 *
 * The video never auto-plays. GSAP ScrollTrigger maps page scroll position
 * (0 → 600vh) directly to video.currentTime (0 → duration) so the user
 * controls the footage frame-by-frame with their scroll wheel or swipe.
 * Reverse scrubbing works natively.
 *
 * scrub: 1   → 1-second GSAP smoothing (hides browser seek latency on desktop).
 * scrub: 1.5 → used on touch / mobile where native video seeking is slower.
 *
 * Performance: no play(), no RAF loop, no IntersectionObserver.
 * One GSAP ScrollTrigger instance + the browser's internal seek pipeline.
 */
export default function HeroSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const stRef             = useRef<ScrollTrigger | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const v       = videoRef.current;
    if (!section || !v) return;

    // Safe to call multiple times — GSAP no-ops if already registered
    gsap.registerPlugin(ScrollTrigger);

    // Touch / mobile devices seek video more slowly → more GSAP smoothing
    const scrub =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
        ? 1.5
        : 1;

    const init = () => {
      const dur = v.duration;
      if (!dur || !isFinite(dur)) return;

      // Park on frame 0 so the video is visible before the user scrolls
      v.currentTime = 0;
      setReady(true);

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub,
        onUpdate(self) {
          // Clamp 0–1: prevents iOS rubber-band overscroll from seeking out of range
          const t = Math.max(0, Math.min(1, self.progress)) * dur;
          // Skip negligibly-small deltas to avoid redundant browser seeks
          if (Math.abs(v.currentTime - t) > 0.001) {
            v.currentTime = t;
          }
        },
      });
    };

    // readyState >= 1 (HAVE_METADATA) → duration is known, run immediately
    if (v.readyState >= 1) {
      init();
    } else {
      v.addEventListener("loadedmetadata", init, { once: true });
    }

    return () => {
      // Remove listener if metadata hasn't fired yet (e.g. fast unmount)
      v.removeEventListener("loadedmetadata", init);
      stRef.current?.kill();
      stRef.current = null;
    };
  }, []);

  return (
    /*
     * Outer section — 600vh of scroll distance.
     * bg-ink fills any gap between the sticky panel and the next section.
     */
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-ink"
      style={{ height: "600vh" }}
    >
      {/* ── Sticky inner — stays in view the full 600vh ──────────────── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-end justify-start">

        {/* ── Video — scroll-driven, never auto-plays ───────────────── */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: "center 40%" }}
          muted
          playsInline
          preload="auto"
          // No autoPlay, no loop — scroll position IS the playhead
        >
          <source src="/videos/01-bean-hero.MP4" type="video/mp4" />
        </video>

        {/* ── Overlays ──────────────────────────────────────────────── */}
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

        {/* ── Content — bottom-left, film-caption style ─────────────── */}
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

        {/* ── Scroll indicator — right edge ────────────────────────── */}
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

        {/* ── Bottom crossfade into next section ───────────────────── */}
        <div
          className="absolute bottom-0 inset-x-0 h-52 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
        />
      </div>
    </section>
  );
}
