"use client";

import { motion }        from "framer-motion";
import SectionReveal     from "@/components/ui/SectionReveal";
import VideoBackground   from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Three disciplines — condensed from six. The video tells the rest.
const offerings = [
  {
    n:    "01",
    title:"Specialty Coffee",
    note: "Espresso programs · Menu development · Equipment setup",
  },
  {
    n:    "02",
    title:"Hospitality Operations",
    note: "Team leadership · Service standards · Quality control",
  },
  {
    n:    "03",
    title:"Training & Culture",
    note: "Barista coaching · Workshops · Brand values",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* 03-portafilter.MP4 */}
      {/* Content sits bottom-left over a bottom gradient — bias the visible
          window upward so the portafilter subject stays in the clear zone */}
      <VideoBackground src="/videos/03-portafilter.MP4" darkness={0.32} position="center 40%" warmTint />

      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* Content — bottom-left, editorial caption */}
      <div className="relative z-30 w-full px-8 md:px-16 pb-20 md:pb-28">

        <SectionReveal>
          <div className="section-label mb-10">
            <span>02 — Services</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} blur>
          <h2
            className="section-title text-ivory mb-14 md:mb-16"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            The craft.<br />
            <em className="serif-italic text-gold not-italic">The offering.</em>
          </h2>
        </SectionReveal>

        {/* Three disciplines — vertical editorial list */}
        <div className="flex flex-col gap-8 max-w-lg">
          {offerings.map((o, i) => (
            <motion.div
              key={o.n}
              className="flex items-start gap-7 group"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, delay: 0.2 + i * 0.12, ease: EASE }}
            >
              <span className="font-accent text-4xl font-bold text-gold/10 group-hover:text-gold/20 transition-colors duration-500 leading-none mt-1 select-none">
                {o.n}
              </span>
              <div>
                <p className="font-brand font-semibold text-xl md:text-2xl text-ivory/95 leading-tight mb-1.5 text-cinematic-strong">
                  {o.title}
                </p>
                <p className="font-sans text-[11px] tracking-[0.12em] text-ivory/55 font-normal text-cinematic">
                  {o.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
