"use client";

import { motion }      from "framer-motion";
import SectionReveal   from "@/components/ui/SectionReveal";
import VideoBackground from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Three disciplines — no bars, no percentages. The hands tell the story.
const disciplines = [
  {
    cat:   "Coffee Craft",
    items: ["Espresso Extraction", "Latte Art", "Milk Texturing", "Pour-Over & Brewing"],
  },
  {
    cat:   "Hospitality",
    items: ["Guest Experience", "Team Leadership", "Staff Training", "Complaint Resolution"],
  },
  {
    cat:   "Operations",
    items: ["High-Volume Service", "Food Safety", "Shift Management", "Quality Standards"],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-end md:items-center overflow-hidden bg-ink"
    >
      {/* 04-portafilter hand.MP4 — space in filename encoded as %20 */}
      <VideoBackground src="/videos/04-portafilter%20hand.MP4" darkness={0.28} position="center 40%" warmTint />

      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* Glass panel — left side, stays out of the footage subject area.
          On mobile: anchored to bottom (items-end on section), reduced padding. */}
      <div className="relative z-30 w-full px-5 md:px-16 py-8 md:py-0">
        <div className="glass-card-warm p-5 md:p-11 max-w-xs md:max-w-sm">

          <SectionReveal blur>
            <div className="section-label mb-5 md:mb-9">
              <span>03 — Skills</span>
              <div className="gold-line" />
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-5 md:gap-9">
            {disciplines.map((d, di) => (
              <div key={d.cat}>
                {/* Category label + expanding gold rule */}
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8, delay: 0.1 + di * 0.12, ease: EASE }}
                >
                  <p className="font-sans text-[8px] tracking-[0.45em] uppercase text-gold/85 text-cinematic">
                    {d.cat}
                  </p>
                  <motion.span
                    className="block h-px flex-1 max-w-[40px] origin-left"
                    style={{ background: "linear-gradient(90deg, rgba(212,168,67,0.4), transparent)" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.9, delay: 0.25 + di * 0.12, ease: EASE }}
                  />
                </motion.div>

                {/* Skills — each item lands on its own beat, dash extends on hover */}
                <div className="flex flex-col gap-2.5">
                  {d.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3 group cursor-default"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.7, delay: 0.18 + di * 0.12 + ii * 0.07, ease: EASE }}
                    >
                      <span className="block h-px w-3 flex-shrink-0 bg-gold/45 group-hover:w-5 group-hover:bg-gold transition-all duration-400" />
                      <p className="font-sans text-[12px] text-ivory/95 group-hover:text-white font-normal tracking-[0.02em] text-cinematic transition-colors duration-400">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
