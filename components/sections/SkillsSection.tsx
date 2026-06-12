"use client";

import SectionReveal   from "@/components/ui/SectionReveal";
import VideoBackground from "@/components/ui/VideoBackground";

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
              <SectionReveal key={d.cat} delay={0.1 + di * 0.1}>
                <div>
                  <p className="font-sans text-[8px] tracking-[0.45em] uppercase text-gold/85 mb-4 text-cinematic">
                    {d.cat}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {d.items.map(item => (
                      <p
                        key={item}
                        className="font-sans text-[12px] text-ivory/95 font-normal tracking-[0.02em] text-cinematic"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </SectionReveal>
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
