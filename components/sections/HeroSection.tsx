"use client";

import { useEffect, useRef, useState }                          from "react";
import { motion, useScroll, useTransform, useReducedMotion }    from "framer-motion";

// Expo-out easing — the luxury / Apple motion language
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Hero section — IntersectionObserver video lifecycle + cinematic entrance + scroll parallax.
 *
 * Video: IntersectionObserver restarts from frame 0 on every viewport entry.
 *        No autoPlay — observer fires immediately on mount (Hero is above fold)
 *        and again on every scroll-back, so the video always replays cleanly.
 *        No loop — freezes on final frame until next entry.
 *        Matches VideoBackground behavior used by all other sections.
 * Font: Plus Jakarta Sans ExtraBold for ROHAM — modern premium studio feel (Framer/Linear/Apple).
 * Overlays: lighter so coffee-bean detail is visible.
 * Animations: staggered, blur-to-sharp on tagline, respects prefers-reduced-motion.
 * Scroll: late-activating parallax (effects only when user is leaving section).
 */
export default function HeroSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Respects the OS / browser "reduce motion" accessibility setting.
  // When true: all y/blur animations are skipped; only opacity fades remain,
  // and durations are near-instant so the page still feels responsive.
  const pRM = useReducedMotion();

  // ── Scroll progress ─────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // ── Parallax (late-activating — only fire when user is leaving) ─────
  const videoY         = useTransform(scrollYProgress, [0, 1],          ["0%", "-4%"]);
  const contentY       = useTransform(scrollYProgress, [0.4, 1],        ["0%", "-5%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.60, 0.95], [1, 1, 0]);
  const curtainOpacity = useTransform(scrollYProgress, [0.60, 0.95],    [0, 0.65]);

  // ── Video lifecycle — same pattern as VideoBackground ───────────────
  // IntersectionObserver restarts playback from frame 0 every time the
  // Hero section enters the viewport. This fixes the "frozen last frame
  // on scroll-back" bug: autoPlay only fires once on mount; without an
  // observer the video stays stuck when the user returns to the top.
  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;

    // Fade video in as soon as the browser can render a frame
    const onCanPlay = () => setReady(true);
    if (v.readyState >= 3) {
      setReady(true);
    } else {
      v.addEventListener("canplay", onCanPlay);
    }

    // Restart from frame 0 on every section entry — mirrors VideoBackground
    const playFromStart = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playFromStart();
        } else {
          v.pause();
          v.currentTime = 0; // pre-cue so replay starts cleanly
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(s);

    return () => {
      observer.disconnect();
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-ink"
    >

      {/* ── VIDEO ──────────────────────────────────────────────────────── */}
      {/* IntersectionObserver (above) handles play/pause/restart.
          No autoPlay — observer fires on mount since Hero is above fold,
          and restarts on every re-entry so scroll-back always replays.
          scale 1.08 = minimum overscan for the -4% parallax shift.
          (Was 1.18 — an extra 18% zoom that cropped the bean footage hard.) */}
      <motion.video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center 40%", y: videoY, scale: 1.08 }}
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/01-bean-hero.MP4" type="video/mp4" />
      </motion.video>

      {/* ── OVERLAYS (significantly lighter than before) ────────────────
          Previous: base tint 0.38, bottom gradient 0.95 — crushed all detail.
          Now:      base tint 0.16, bottom gradient 0.80 — video detail visible
          while the text area remains dark enough for perfect readability.
      ─────────────────────────────────────────────────────────────────── */}

      {/* Warm espresso base tint — just a whisper of colour temperature */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "rgba(8,5,3,0.16)" }}
      />

      {/* Vignette edges + top/bottom gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 55% 45%,
              transparent 30%,
              rgba(5,5,5,0.25) 100%
            ),
            linear-gradient(to bottom,
              rgba(5,5,5,0.16) 0%,
              transparent      22%,
              transparent      50%,
              rgba(5,5,5,0.80) 100%
            )
          `,
        }}
      />

      {/* Exit curtain — cinematic dissolve, only last 35 % of scroll */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none bg-ink"
        style={{ opacity: curtainOpacity }}
      />

      {/* ── CONTENT + SCROLL INDICATOR ─────────────────────────────────
          Outer wrapper handles scroll parallax + exit fade.
          Inner children run their own entrance animations independently
          — different DOM elements, so no opacity conflict with the parent.
      ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-20 flex items-end"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full px-8 md:px-16 pb-20 md:pb-24">

          {/* Location — quiet gold label, appears first */}
          <motion.p
            className="font-sans text-[9px] tracking-[0.55em] uppercase text-gold/55 mb-5"
            initial={{ opacity: pRM ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: pRM ? 0 : 0.25, ease: EASE }}
          >
            Toronto, Canada
          </motion.p>

          {/* ── ROHAM — primary brand mark ──────────────────────────────
              Plus Jakarta Sans ExtraBold: modern geometric sans-serif.
              Premium studio at display sizes — Framer / Linear / Apple energy.
              Wide tracking + ExtraBold weight = strong, clean, confident.
              Clipped container mask for the cinematic slide-up reveal.
          ─────────────────────────────────────────────────────────────── */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-brand font-extrabold leading-[0.90]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", letterSpacing: "0.22em" }}
              initial={{ opacity: pRM ? 1 : 0, y: pRM ? 0 : "108%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.35, delay: pRM ? 0 : 0.55, ease: EASE }}
            >
              <span className="gold-shimmer">ROHAM</span>
            </motion.h1>
          </div>

          {/* Roles — individual staggered slide-in from the left */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
            {["Barista", "Hospitality Professional", "Team Leader"].map((role, i) => (
              <motion.span
                key={role}
                className="flex items-center gap-4"
                initial={{ opacity: pRM ? 1 : 0, x: pRM ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: pRM ? 0 : 1.15 + i * 0.13, ease: EASE }}
              >
                <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-ivory/55 font-light">
                  {role}
                </span>
                {i < 2 && <span className="text-gold/30 text-[6px]">·</span>}
              </motion.span>
            ))}
          </div>

          {/* Tagline — blur-to-sharp reveal, Inter Light for clean modern feel */}
          <motion.p
            className="font-sans font-light text-base md:text-lg text-ivory/45 tracking-[0.04em] mb-10"
            initial={{
              opacity: pRM ? 1 : 0,
              filter:  pRM ? "blur(0px)" : "blur(10px)",
            }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: pRM ? 0 : 1.65, ease: EASE }}
          >
            Where coffee craft meets creative direction.
          </motion.p>

          {/* CTAs — fade up together */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: pRM ? 1 : 0, y: pRM ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: pRM ? 0 : 2.1, ease: EASE }}
          >
            <a
              href="#experience"
              className="btn-gold font-sans text-[10px] tracking-[0.28em] uppercase px-8 py-3.5"
            >
              View Experience
            </a>
            <a
              href="#contact"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-ivory/60 hover:text-gold transition-colors duration-500 hover-gold"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator — fades in last, fades out with content on scroll */}
        <motion.div
          className="absolute right-9 bottom-9 flex flex-col items-center gap-3"
          initial={{ opacity: pRM ? 1 : 0, y: pRM ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: pRM ? 0 : 2.55, ease: EASE }}
        >
          <div
            className="w-px h-12 origin-top"
            style={{
              background: "linear-gradient(to bottom, rgba(212,168,67,0.40), transparent)",
              animation: "scrollPulse 2.8s ease-in-out infinite",
            }}
          />
          <span className="font-sans text-[7px] tracking-[0.45em] uppercase text-ivory/20">
            Scroll
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom crossfade — static, blends hero into About section */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
