"use client";

import Image        from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-52 bg-ink overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.035) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <SectionReveal>
          <div className="section-label mb-20">
            <span>01 — About</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-16 md:gap-24 items-start">

          {/* Image col */}
          <SectionReveal direction="left">
            <div className="relative aspect-[3/4]">
              {/* Corner marks */}
              <div className="absolute -top-2.5 -left-2.5 w-12 h-12 border-t border-l border-gold/35 z-10" />
              <div className="absolute -bottom-2.5 -right-2.5 w-12 h-12 border-b border-r border-gold/35 z-10" />

              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=90"
                alt="Artisan coffee craft"
                fill
                className="object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-[800ms]"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

              {/* Floating stat */}
              <div className="absolute bottom-7 left-7 z-10">
                <p className="font-bodoni text-4xl gold-shimmer font-bold">7+</p>
                <p className="font-inter text-[10px] tracking-[0.22em] uppercase text-ivory/45 mt-1">Years of Craft</p>
              </div>
            </div>
          </SectionReveal>

          {/* Text col */}
          <div className="flex flex-col gap-8 md:pt-4">

            <SectionReveal delay={0.1}>
              <h2 className="font-bodoni font-bold leading-[1.05] text-ivory"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
                A professional shaped<br />
                by <span className="italic text-gold">precision</span>,<br />
                service &amp; artistry.
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="font-inter text-[15px] leading-[1.8] text-ivory/55 font-light">
                I'm Hamed Roham — a barista and hospitality professional with over
                seven years of experience turning everyday service moments into
                memorable experiences. My journey started in Tehran's most
                prestigious hotel properties, progressed through specialty coffee
                culture, and has brought me to Toronto where I lead teams, build
                guest relationships, and keep pushing the craft forward.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <p className="font-inter text-[15px] leading-[1.8] text-ivory/55 font-light">
                Whether I'm pulling a perfect shot, training a new barista, or
                managing the controlled chaos of a full-house service, the same
                principle drives every action: excellence in the details. Coffee
                taught me that. Hospitality gave it purpose.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-0 mt-4 border-t border-ink-border">
                {[
                  ["Location",    "Toronto, Ontario"],
                  ["Experience",  "7+ Years"],
                  ["Languages",   "English · Farsi"],
                  ["Status",      "Open to Opportunities"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 py-5 border-b border-ink-border pr-6">
                    <span className="font-inter text-[9px] tracking-[0.3em] uppercase text-ivory/25">{k}</span>
                    <span className="font-inter text-sm text-ivory/75">{v}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.5}>
              <div className="flex gap-4 mt-2">
                <a href="#experience" className="btn-gold font-inter text-[10px] tracking-[0.25em] uppercase px-8 py-3.5">
                  My Journey
                </a>
                <a href="#contact" className="font-inter text-[10px] tracking-[0.25em] uppercase text-ivory/35 hover:text-gold/70 transition-colors duration-300 flex items-center">
                  Let's Talk →
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
