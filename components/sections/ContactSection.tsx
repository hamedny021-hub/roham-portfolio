"use client";

import { motion }      from "framer-motion";
import SectionReveal   from "@/components/ui/SectionReveal";
import VideoBackground from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Inline platform icons — no external dependency ─────────────────── */

function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function IconFiverr() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {/* Fiverr: f-letterform crossbar + dot */}
      <path d="M13.5 2c-3.03 0-5.5 2.47-5.5 5.5V9H6v4h2v9h4v-9h2.5l.5-4H12V7.5c0-.83.67-1.5 1.5-1.5H15V2h-1.5z" />
      <circle cx="19" cy="18.5" r="1.5" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconDribbble() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.19-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z" />
    </svg>
  );
}

const socials = [
  { label: "Email",    href: "mailto:hamedny021@gmail.com",                             Icon: IconEmail    },
  { label: "Fiverr",   href: "https://www.fiverr.com/s/o8bda7V",                       Icon: IconFiverr   },
  { label: "YouTube",  href: "https://youtube.com/@hamednycoffe?si=72n8RIrmaGQyH_M3", Icon: IconYouTube  },
  { label: "X",        href: "https://x.com/hamedny021?s=11",                          Icon: IconX        },
  { label: "Dribbble", href: "https://dribbble.com/hamedroham",                        Icon: IconDribbble },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* 06-extraction.MP4 — the climax of the coffee story.
          darkness 0.48: lighter than before so the extraction footage dominates. */}
      <VideoBackground src="/videos/06-extraction.MP4" darkness={0.25} warmTint />

      {/* Top crossfade from Experience */}
      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* Section label — top-left, consistent with all sections */}
      <div className="absolute top-0 left-0 z-30 px-8 md:px-16 pt-24 md:pt-32">
        <SectionReveal>
          <div className="section-label">
            <span>05 — Contact</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>
      </div>

      {/* ── Content — bottom-center, no glass, no panel.
          Text floats directly over the footage like Services / Experience.
          Video is the hero element of this section.
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative z-30 w-full px-8 md:px-16 pb-20 md:pb-28 flex flex-col items-center text-center">

        <SectionReveal>
          <h2
            className="section-title text-ivory mb-2"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Let's create
            <br />
            <em className="serif-italic text-gold not-italic">something extraordinary.</em>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-inter text-[9px] tracking-[0.42em] uppercase text-ivory/28 mt-3 mb-10 md:mb-14">
            Open to café consulting · barista roles · creative collaborations
          </p>
        </SectionReveal>

        {/* Social icons — horizontal editorial row on desktop, wraps on mobile */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 group"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              {/* Icon: ivory/40 at rest → gold on hover */}
              <span className="text-ivory/40 group-hover:text-gold transition-colors duration-400">
                <s.Icon />
              </span>
              {/* Platform label */}
              <span className="font-inter text-[8px] tracking-[0.38em] uppercase text-ivory/22 group-hover:text-gold/55 transition-colors duration-400">
                {s.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom crossfade to footer */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
