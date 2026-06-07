"use client";

import { useRef } from "react";
import { motion, useInView }  from "framer-motion";
import SectionReveal           from "@/components/ui/SectionReveal";

const skillGroups = [
  {
    category: "Coffee Craft",
    skills: [
      { name: "Espresso Extraction",  pct: 97 },
      { name: "Latte Art",            pct: 92 },
      { name: "Milk Texturing",       pct: 95 },
      { name: "Pour-Over & Brewing",  pct: 88 },
      { name: "Beverage Quality",     pct: 94 },
    ],
  },
  {
    category: "Hospitality & Service",
    skills: [
      { name: "Guest Experience",     pct: 96 },
      { name: "Team Leadership",      pct: 90 },
      { name: "Staff Training",       pct: 88 },
      { name: "POS Systems",          pct: 85 },
      { name: "Complaint Resolution", pct: 92 },
    ],
  },
  {
    category: "Operations",
    skills: [
      { name: "High-Volume Service",  pct: 95 },
      { name: "Food Safety",          pct: 90 },
      { name: "Opening & Closing",    pct: 93 },
      { name: "Shift Management",     pct: 88 },
      { name: "Cleanliness Standards",pct: 96 },
    ],
  },
];

const tags = [
  "Espresso", "Latte Art", "Cappuccino", "Flat White", "Pour-Over",
  "Team Leadership", "Customer Service", "POS Systems", "Food Safety",
  "Barista Training", "Beverage Presentation", "Time Management",
  "Adaptability", "Communication", "Problem Solving", "Teamwork",
  "Fast-Paced Environments", "Hotel Management", "Menu Development",
];

function Bar({ pct, delay }: { pct: number; delay: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="h-px bg-ink-border2 relative overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{ background: "linear-gradient(90deg, rgba(212,168,67,0.4), rgba(212,168,67,0.9))" }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 md:py-52 bg-ink overflow-hidden">

      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <SectionReveal>
          <div className="section-label mb-12">
            <span>03 — Skills</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-bodoni leading-tight text-ivory mb-20"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
            The <span className="italic text-gold">skills</span> behind<br />
            every interaction.
          </h2>
        </SectionReveal>

        {/* Skill bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
          {skillGroups.map((g, gi) => (
            <SectionReveal key={g.category} delay={gi * 0.1}>
              <div className="flex flex-col gap-8">
                <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-gold/55">{g.category}</p>
                <div className="flex flex-col gap-6">
                  {g.skills.map((s, si) => (
                    <div key={s.name} className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-inter text-[13px] text-ivory/70">{s.name}</span>
                        <span className="font-inter text-[11px] text-ivory/30">{s.pct}%</span>
                      </div>
                      <Bar pct={s.pct} delay={0.3 + gi * 0.1 + si * 0.06} />
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Tag cloud */}
        <SectionReveal delay={0.2}>
          <div className="border-t border-ink-border pt-14">
            <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-ivory/20 mb-7">All Skills</p>
            <div className="flex flex-wrap gap-2.5">
              {tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  className="skill-tag"
                  data-hover
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
