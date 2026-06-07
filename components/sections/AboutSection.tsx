"use client";

import { motion }         from "framer-motion";
import SectionReveal      from "@/components/ui/SectionReveal";
import VideoBackground    from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-end md:items-center justify-end overflow-hidden bg-ink"
    >

      {/* ── 02-grinding.MP4 — main visual ────────────── */}
      {/* Plays once, freezes on last frame. Let the video breathe. */}
      <VideoBackground
        src="/videos/02-grinding.MP4"
        darkness={0.30}
        warmTint
      />

      {/* Top crossfade from hero */}
      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* ── Minimal glass text panel — right side ────── */}
      {/* Floats over the video without blocking the subject */}
      {/* On mobile: panel anchored to bottom (items-end on section), letting video fill top.
          On desktop: right-aligned, vertically centered — unchanged. */}
      <div className="relative z-30 w-full md:w-auto md:max-w-md lg:max-w-lg px-5 md:px-0 md:mr-16 lg:mr-24 py-8 md:py-32">

        <div className="glass-card p-5 md:p-12">

          {/* Section label */}
          <SectionReveal>
            <div className="section-label mb-8">
              <span>01 — About</span>
              <div className="gold-line" />
            </div>
          </SectionReveal>

          {/* Heading */}
          <SectionReveal delay={0.1}>
            <h2
              className="section-title text-ivory mb-4 md:mb-6"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              Shaped by<br />
              <em className="serif-italic text-gold not-italic">precision</em>,<br />
              service &amp; artistry.
            </h2>
          </SectionReveal>

          {/* Body */}
          <SectionReveal delay={0.2}>
            <p className="body-refined mb-4 md:mb-6">
              I'm Hamed Roham — a barista and hospitality professional with over
              seven years of experience turning everyday service moments into
              memorable experiences. From Tehran's finest hotel properties to
              Toronto's specialty coffee culture, the craft has always come first.
            </p>
          </SectionReveal>

          {/* Key facts — compact */}
          <SectionReveal delay={0.3}>
            <div className="flex flex-col gap-2 mb-5 border-t border-white/6 pt-4 md:gap-3 md:mb-8 md:pt-6">
              {[
                ["Location",   "Toronto, Ontario"],
                ["Experience", "7+ Years"],
                ["Languages",  "English · Farsi"],
                ["Status",     "Open to Opportunities"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-4">
                  <span className="font-sans text-[8px] tracking-[0.35em] uppercase text-ivory/22 w-24 flex-shrink-0">
                    {k}
                  </span>
                  <span className="font-sans text-[12px] text-ivory/60 font-light">{v}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* CTAs */}
          <SectionReveal delay={0.4}>
            <div className="flex items-center gap-5">
              <a
                href="#experience"
                className="btn-gold font-sans text-[10px] tracking-[0.28em] uppercase px-7 py-3"
              >
                My Journey
              </a>
              <a
                href="#contact"
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-ivory/28 hover:text-gold/60 transition-colors duration-500 hover-gold"
              >
                Let's Talk
              </a>
            </div>
          </SectionReveal>
        </div>

        {/* Floating stat — below the card. Hidden on mobile to reduce vertical bulk;
            the same data (7+ years, two countries) lives inside the key-facts grid. */}
        <motion.div
          className="hidden md:flex items-center gap-4 mt-6 pl-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
        >
          <p className="font-brand font-extrabold gold-shimmer leading-none"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>
            7+
          </p>
          <div>
            <p className="font-sans text-[8px] tracking-[0.35em] uppercase text-ivory/35">
              Years of Craft
            </p>
            <p className="font-sans text-[8px] tracking-[0.35em] uppercase text-ivory/20 mt-0.5">
              Two Countries
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom crossfade to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
