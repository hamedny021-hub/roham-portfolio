"use client";

import { motion }      from "framer-motion";
import SectionReveal   from "@/components/ui/SectionReveal";
import VideoBackground from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Full timeline — all roles preserved, stripped to essential identity.
// No bullet points. The tamping video conveys the precision.
const jobs = [
  {
    role:    "Supervisor",
    company: "Naan Kabob",
    location:"Toronto, ON",
    period:  "2025 — Present",
  },
  {
    role:    "Barista",
    company: "Cafe Bam",
    location:"Tehran, Iran",
    period:  "2023 — 2024",
  },
  {
    role:    "Barista & Supervisor",
    company: "Hoveyzeh Hotel",
    location:"Tehran, Iran",
    period:  "2021 — 2023",
  },
  {
    role:    "Barista & Hospitality Staff",
    company: "Esteghlal Hotel",
    location:"Tehran, Iran",
    period:  "2019 — 2021",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* 05-tamping.MP4 */}
      {/* Heavy bottom content (timeline) — keep the tamping action high in frame */}
      <VideoBackground src="/videos/05-tamping.MP4" darkness={0.32} position="center 38%" warmTint />

      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* Content — bottom-left, like rolling credits */}
      <div className="relative z-30 w-full px-8 md:px-16 pb-20 md:pb-28">

        <SectionReveal>
          <div className="section-label mb-10">
            <span>04 — Experience</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} blur>
          <h2
            className="section-title text-ivory mb-14"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
          >
            Seven years of<br />
            <em className="serif-italic text-gold not-italic">relentless craft.</em>
          </h2>
        </SectionReveal>

        {/* Timeline — a gold line draws down through the years; each role is
            a node on it. The current position pulses quietly. */}
        <div className="relative max-w-xl mb-12 pl-7">

          {/* The line — draws top-to-bottom as the timeline enters view */}
          <motion.div
            className="absolute left-[2px] top-3 bottom-5 w-px origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(212,168,67,0.55), rgba(212,168,67,0.10))" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
          />

          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              className="relative flex items-baseline gap-6 md:gap-10 py-5 border-b border-white/5 last:border-none group cursor-default"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: 4 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, delay: 0.3 + i * 0.12, ease: EASE }}
            >
              {/* Node — current role (first entry) pulses gold */}
              <span
                className={`absolute -left-7 top-[23px] block w-[5px] h-[5px] rounded-full ${
                  i === 0 ? "bg-gold" : "bg-gold/35 group-hover:bg-gold/70"
                } transition-colors duration-400`}
                style={i === 0 ? { animation: "dotPulse 3s ease-in-out infinite" } : undefined}
              />

              {/* Period */}
              <span className="font-sans text-[9px] tracking-[0.2em] text-gold/75 group-hover:text-gold w-28 flex-shrink-0 text-cinematic transition-colors duration-400">
                {job.period}
              </span>

              {/* Role + venue */}
              <div>
                <p className="font-brand font-semibold text-base md:text-lg text-white leading-tight text-cinematic-strong">
                  {job.role}
                </p>
                <p className="font-sans text-[11px] text-ivory/80 group-hover:text-ivory font-normal mt-0.5 tracking-[0.02em] text-cinematic transition-colors duration-400">
                  {job.company} · {job.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats — one quiet line */}
        <motion.div
          className="flex items-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        >
          {[
            ["7+",  "Years"],
            ["2",   "Countries"],
            ["4",   "Roles"],
            ["6–8", "Team Size"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col gap-1">
              <span className="font-brand font-bold text-xl gold-shimmer leading-none">{n}</span>
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-ivory/60 text-cinematic">{l}</span>
            </div>
          ))}

          {/* Education — inline, minimal */}
          <div className="hidden md:flex flex-col gap-1 ml-4 pl-8 border-l border-white/6">
            <span className="font-sans font-light text-sm text-ivory/82 leading-tight text-cinematic">
              Hotel Management
            </span>
            <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-ivory/60 text-cinematic">
              University of Tehran · 2019–2023
            </span>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
