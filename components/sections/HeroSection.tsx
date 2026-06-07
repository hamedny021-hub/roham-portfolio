"use client";

import { useEffect, useRef, useState }       from "react";
import { motion, useScroll, useTransform }   from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Hero section — play-once autoplay video + late-activating scroll parallax.
 *
 * Video behavior
 * ──────────────
 * autoPlay + muted + playsInline — starts the moment the page loads.
 * NO loop — when the video reaches its last frame the browser pauses there.
 * The final frame stays frozen visibly; there is no jump back to frame 0.
 * readyState guard + canplay fade-in prevents any black-flash before the
 * video has loaded enough data to display.
 *
 * Scroll effects (Framer Motion MotionValues — zero seek calls)
 * ─────────────────────────────────────────────────────────────
 * Effects are deliberately late-activating so the hero feels settled while
 * the user reads the content, only transitioning when they scroll away:
 *   0 – 40 % scroll : nothing moves except a very subtle video drift
 *   40 – 60 % scroll : content starts to rise gently
 *   60 – 95 % scroll : content fades + dark overlay deepens (cinematic exit)
 *
 * scale 1.18 on the video keeps a 9 % buffer on every edge so the -5 %
 * upward drift never clips the frame inside overflow-hidden.
 */
export default function HeroSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // ── Scroll progress ───────────────────────────────────────────────────
  // 0 = hero top aligned with viewport top (section fully visible)
  // 1 = hero bottom aligned with viewport top (section has exited)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // ── Parallax transforms (all lazy — only activate near exit) ────────
  //
  // videoY: gentle upward drift from scroll start — background depth cue.
  // Subtle enough to feel cinematic, not distracting during content reading.
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // contentY: content stays completely still until 40 % scroll, then rises.
  // The [0.4, 1] input range clamps to "0%" below 40 % — zero movement while
  // the user is reading; motion begins only when they're clearly leaving.
  const contentY = useTransform(scrollYProgress, [0.4, 1], ["0%", "-5%"]);

  // contentOpacity: full opacity until 60 %, fades to 0 at 95 %.
  // Last third of the scroll is the fade window — never abrupt.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.60, 0.95], [1, 1, 0]);

  // curtainOpacity: dark overlay that deepens only in the last 35 % of scroll.
  // Max 0.65 — keeps the transition feeling like a dissolve, not a blackout.
  const curtainOpacity = useTransform(scrollYProgress, [0.60, 0.95], [0, 0.65]);

  // ── Video readiness ───────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // readyState 3 = HAVE_FUTURE_DATA — enough to start showing the video
    if (v.readyState >= 3) { setReady(true); return; }

    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay, { once: true });
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* ── Video — plays once, freezes on last frame ───────────────── */}
      {/*
        autoPlay: starts immediately on page load (muted + playsInline required
        for iOS autoplay policy).
        NO loop attribute: when playback ends, the browser pauses on the final
        frame. There is no jump back to frame 0, no flash, no restart.
        transition-opacity + canplay guard: video fades in from invisible once
        enough data is loaded — no black flash on slow connections.
        motion.video: y + scale live in the same Framer Motion style object so
        they compose into one transform string (no CSS-class vs inline conflict).
        scale 1.18 → 9% safety buffer so -5% upward drift never clips the edge.
      */}
      <motion.video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center 40%", y: videoY, scale: 1.18 }}
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src="/videos/01-bean-hero.MP4" type="video/mp4" />
      </motion.video>

      {/* ── Static overlays — permanent cinematic depth ──────────────── */}
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

      {/* ── Exit curtain — dark dissolve, only in last 35 % of scroll ── */}
      {/*
        z-30: darkens the full scene (video + text) as one unit — cinematic.
        Max opacity 0.65: a dissolve, not a blackout. About section is visible
        behind it before the hero fully exits the viewport.
        pointer-events-none: buttons remain fully clickable throughout.
      */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none bg-ink"
        style={{ opacity: curtainOpacity }}
      />

      {/* ── Content + scroll indicator — parallax / exit-fade wrapper ── */}
      {/*
        Single motion wrapper applies y + opacity to everything at once.
        Children keep their own initial/animate mount animations — those work
        on separate elements so there is no opacity conflict with the parent.
      */}
      <motion.div
        className="absolute inset-0 z-20 flex items-end"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Bottom-left text block */}
        <div className="w-full px-8 md:px-16 pb-20 md:pb-24">

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

        {/* Scroll indicator — absolute inside parallax wrapper ────────── */}
        {/*
          Mount animation (initial/animate) is on this element.
          Exit fade comes from the parent motion wrapper's opacity.
          Different elements → no opacity conflict.
        */}
        <motion.div
          className="absolute right-9 bottom-9 flex flex-col items-center gap-3"
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
      </motion.div>

      {/* ── Bottom crossfade — static, blends into About section ─────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
