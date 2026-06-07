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
      <VideoBackground src="/videos/05-tamping.MP4" darkness={0.38} warmTint />

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

        <SectionReveal delay={0.1}>
          <h2
            className="section-title text-ivory mb-14"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
          >
            Seven years of<br />
            <em className="serif-italic text-gold not-italic">relentless craft.</em>
          </h2>
        </SectionReveal>

        {/* Timeline — minimal chronological list, no bullets */}
        <div className="flex flex-col gap-0 max-w-xl mb-12">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              className="flex items-baseline gap-6 md:gap-10 py-5 border-b border-white/5 last:border-none"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, delay: 0.15 + i * 0.1, ease: EASE }}
            >
              {/* Period */}
              <span className="font-inter text-[9px] tracking-[0.2em] text-ivory/22 w-28 flex-shrink-0">
                {job.period}
              </span>

              {/* Role + venue */}
              <div>
                <p className="font-cormorant font-semibold text-base md:text-lg text-ivory/85 leading-tight">
                  {job.role}
                </p>
                <p className="font-inter text-[11px] text-ivory/35 font-light mt-0.5 tracking-[0.02em]">
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
              <span className="font-cormorant font-bold text-xl gold-shimmer leading-none">{n}</span>
              <span className="font-inter text-[8px] tracking-[0.3em] uppercase text-ivory/25">{l}</span>
            </div>
          ))}

          {/* Education — inline, minimal */}
          <div className="hidden md:flex flex-col gap-1 ml-4 pl-8 border-l border-white/6">
            <span className="font-cormorant text-sm text-ivory/55 leading-tight italic">
              Hotel Management
            </span>
            <span className="font-inter text-[8px] tracking-[0.2em] uppercase text-ivory/22">
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
