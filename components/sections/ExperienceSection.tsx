"use client";

import { useRef }              from "react";
import { motion, useInView }   from "framer-motion";
import SectionReveal           from "@/components/ui/SectionReveal";

const jobs = [
  {
    role:    "Team Leader",
    company: "Naan & Kabob Restaurant",
    location:"Toronto, ON",
    period:  "2025 — Present",
    type:    "Leadership",
    color:   "text-gold",
    bullets: [
      "Lead service operations and supervise a team of 6–8 staff in a high-volume restaurant environment.",
      "Train new hires on customer service, POS systems, food safety, and cleanliness standards.",
      "Manage guest flow and resolve complaints professionally to maintain high satisfaction scores.",
      "Support team performance through clear communication and hands-on leadership.",
      "Assist with opening and closing procedures.",
    ],
  },
  {
    role:    "Barista",
    company: "Cafe Bam",
    location:"Tehran, Iran",
    period:  "2023 — 2024",
    type:    "Coffee",
    color:   "text-amber-500/70",
    bullets: [
      "Crafted high-quality espresso drinks including lattes, cappuccinos, flat whites, and pour-overs.",
      "Delivered consistent latte art and maintained beverage quality standards across all service hours.",
      "Built rapport with regulars and managed high order volumes efficiently during peak periods.",
      "Maintained full cleanliness of bar, equipment, and storage areas at all times.",
    ],
  },
  {
    role:    "Barista & Supervisor",
    company: "Hoveyzeh Hotel",
    location:"Tehran, Iran",
    period:  "2021 — 2023",
    type:    "Hotel",
    color:   "text-ivory/50",
    bullets: [
      "Prepared specialty coffee and beverage menus for hotel guests in an upscale café setting.",
      "Trained incoming barista staff on drink preparation, equipment care, and service standards.",
      "Operated POS systems for order taking, billing, and daily shift reconciliation.",
    ],
  },
  {
    role:    "Barista & Hospitality Staff",
    company: "Esteghlal Hotel",
    location:"Tehran, Iran",
    period:  "2019 — 2021",
    type:    "Hotel",
    color:   "text-ivory/50",
    bullets: [
      "Delivered café and beverage service within a prestigious luxury hotel property.",
      "Maintained professional guest communication and a welcoming café environment.",
      "Performed reliably under pressure during high-demand seasons and events.",
    ],
  },
];

function TimelineItem({ job, i }: { job: typeof jobs[0]; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-[24px_1fr] gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold mt-1.5 flex-shrink-0 transition-colors duration-400"
          style={{ animation: "dotPulse 3s ease-in-out infinite" }}
        />
        {i < jobs.length - 1 && (
          <div className="flex-1 w-px mt-3"
            style={{ background: "linear-gradient(to bottom, rgba(212,168,67,0.2), transparent)" }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-14">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className={`font-inter text-[9px] tracking-[0.25em] uppercase ${job.color}`}>{job.type}</span>
          <span className="font-inter text-[11px] text-ivory/20">{job.period}</span>
        </div>
        <h3 className="font-bodoni text-2xl md:text-3xl text-ivory group-hover:text-gold/90 transition-colors duration-400 mb-1 leading-tight">
          {job.role}
        </h3>
        <p className="font-inter text-sm text-ivory/45 mb-5">
          {job.company} <span className="text-ivory/20 mx-2">·</span> {job.location}
        </p>
        <ul className="flex flex-col gap-2.5">
          {job.bullets.map((b, bi) => (
            <li key={bi} className="flex gap-3 font-inter text-[13px] leading-[1.75] text-ivory/38 font-light">
              <span className="text-gold/30 mt-[6px] flex-shrink-0 text-[8px]">◆</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 md:py-52 bg-ink-mid overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.18), transparent)" }} />

      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <SectionReveal>
          <div className="section-label mb-12">
            <span>04 — Experience</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">

          {/* Timeline */}
          <div>
            <SectionReveal delay={0.1}>
              <h2 className="font-bodoni leading-tight text-ivory mb-20"
                style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
                Seven years of<br />
                <span className="italic text-gold">relentless craft.</span>
              </h2>
            </SectionReveal>

            <div className="flex flex-col">
              {jobs.map((job, i) => (
                <TimelineItem key={job.company} job={job} i={i} />
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-10">

            {/* Education */}
            <SectionReveal delay={0.15}>
              <div className="border border-ink-border p-8 md:p-9">
                <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-6">Education</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-ivory/20 mb-1.5">2019 — 2023</p>
                    <p className="font-bodoni text-lg text-ivory leading-snug">Associate Degree in<br />Hotel Management</p>
                    <p className="font-inter text-sm text-ivory/40 mt-1">University of Tehran</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={0.2}>
              <div className="border border-ink-border p-8 md:p-9">
                <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-7">By the numbers</p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    ["7+",  "Years of Experience"],
                    ["2",   "Countries Worked"],
                    ["4",   "Roles Held"],
                    ["6–8", "Team Members Led"],
                  ].map(([n, l]) => (
                    <div key={l} className="flex flex-col gap-1.5">
                      <span className="font-bodoni text-3xl gold-shimmer font-bold">{n}</span>
                      <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-ivory/30">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Core Values */}
            <SectionReveal delay={0.25}>
              <div className="border border-ink-border p-8 md:p-9">
                <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-6">Core Values</p>
                <div className="flex flex-col gap-3">
                  {["Precision over speed","Quality without compromise","People-first service","Continuous learning"].map(v => (
                    <div key={v} className="flex items-center gap-3">
                      <span className="text-gold/40 text-[7px]">◆</span>
                      <span className="font-inter text-[13px] text-ivory/50">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.18), transparent)" }} />
    </section>
  );
}
