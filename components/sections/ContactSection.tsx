"use client";

import { useState }    from "react";
import { motion }      from "framer-motion";
import SectionReveal   from "@/components/ui/SectionReveal";
import VideoBackground from "@/components/ui/VideoBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const socials = [
  { label: "Email",    href: "mailto:hamedny021@gmail.com" },
  { label: "Dribbble", href: "https://dribbble.com/hamedroham" },
  { label: "YouTube",  href: "https://youtube.com/@hamednycoffe?si=72n8RIrmaGQyH_M3" },
  { label: "X",        href: "https://x.com/hamedny021?s=11" },
  { label: "Fiverr",   href: "https://www.fiverr.com/s/o8bda7V" },
];

export default function ContactSection() {
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-end items-end overflow-hidden bg-ink"
    >
      {/* 06-extraction.MP4 — the extraction is the climax of the coffee story */}
      {/* Lighter overlay so the footage breathes and dominates */}
      <VideoBackground src="/videos/06-extraction.MP4" darkness={0.55} warmTint />

      <div
        className="absolute top-0 inset-x-0 h-48 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
      />

      {/* Section label — top-left, away from the panel */}
      <div className="absolute top-0 left-0 z-30 px-8 md:px-16 pt-24 md:pt-32">
        <SectionReveal>
          <div className="section-label">
            <span>05 — Contact</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>
      </div>

      {/* Glass panel — bottom-right, compact, feels like a caption */}
      <div className="relative z-30 w-full max-w-[420px] px-6 md:px-0 md:mr-14 lg:mr-20 pb-16 md:pb-20">
        <div className="glass-card p-8 md:p-9">

          <SectionReveal delay={0.1}>
            <h2
              className="section-title text-ivory mb-2"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Let's create<br />
              <em className="serif-italic text-gold not-italic">something extraordinary.</em>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="font-inter text-[12px] text-ivory/32 font-light leading-relaxed mb-7 mt-3">
              Open to café consulting, barista roles, and creative collaborations.
            </p>
          </SectionReveal>

          {/* Form */}
          <SectionReveal delay={0.2}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: EASE }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="w-10 h-10 border border-gold/35 rounded-full flex items-center justify-center">
                  <span className="text-gold text-base">✓</span>
                </div>
                <p className="font-bodoni text-lg text-ivory italic">Message sent.</p>
                <p className="font-inter text-xs text-ivory/28">I'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { id: "name",  label: "Name",  type: "text",  ph: "Your name"      },
                  { id: "email", label: "Email", type: "email", ph: "your@email.com" },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={f.id}
                      className={`font-inter text-[8px] tracking-[0.38em] uppercase transition-colors duration-300 ${
                        focus === f.id ? "text-gold/65" : "text-ivory/20"
                      }`}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id} type={f.type} required
                      value={(form as any)[f.id]}
                      onChange={e => setForm(fm => ({ ...fm, [f.id]: e.target.value }))}
                      onFocus={() => setFocus(f.id)}
                      onBlur={() => setFocus(null)}
                      placeholder={f.ph}
                      className="form-input"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className={`font-inter text-[8px] tracking-[0.38em] uppercase transition-colors duration-300 ${
                      focus === "message" ? "text-gold/65" : "text-ivory/20"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message" required rows={3}
                    value={form.message}
                    onChange={e => setForm(fm => ({ ...fm, message: e.target.value }))}
                    onFocus={() => setFocus("message")}
                    onBlur={() => setFocus(null)}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold font-inter text-[9px] tracking-[0.3em] uppercase px-7 py-3 self-start mt-1"
                >
                  Send Message
                </button>
              </form>
            )}
          </SectionReveal>

          {/* Socials — single row of tiny links */}
          <SectionReveal delay={0.3}>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-6 pt-6 border-t border-white/5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[8px] tracking-[0.22em] uppercase text-ivory/22 hover:text-gold/55 transition-colors duration-400"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-32 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050505)" }}
      />
    </section>
  );
}
