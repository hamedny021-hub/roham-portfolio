"use client";

import { useState }    from "react";
import { motion }      from "framer-motion";
import SectionReveal   from "@/components/ui/SectionReveal";

// Social links — placeholders ready for Instagram & Fiverr
const socials = [
  {
    label:  "Email",
    value:  "hamedny021@gmail.com",
    href:   "mailto:hamedny021@gmail.com",
    ready:  true,
  },
  {
    label:  "Dribbble",
    value:  "dribbble.com/hamedroham",
    href:   "https://dribbble.com/hamedroham",
    ready:  true,
  },
  {
    label:  "Instagram",
    value:  "Coming soon",
    href:   "#",          // ← Replace with your Instagram URL
    ready:  false,
  },
  {
    label:  "Fiverr",
    value:  "Coming soon",
    href:   "#",          // ← Replace with your Fiverr URL
    ready:  false,
  },
  {
    label:  "LinkedIn",
    value:  "Coming soon",
    href:   "#",          // ← Replace with your LinkedIn URL
    ready:  false,
  },
];

export default function ContactSection() {
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Formspree, EmailJS, or a Next.js API route
    console.log("Form submitted:", form);
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-52 bg-ink overflow-hidden">
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center bottom, rgba(212,168,67,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <SectionReveal>
          <div className="section-label mb-12">
            <span>05 — Contact</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-20 lg:gap-28">

          {/* Left */}
          <div className="flex flex-col gap-10">
            <SectionReveal delay={0.1}>
              <h2 className="font-bodoni leading-tight text-ivory"
                style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
                Let's create<br />
                something<br />
                <span className="italic text-gold">extraordinary.</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="font-inter text-[14px] leading-[1.85] text-ivory/45 font-light max-w-sm">
                Whether you're opening a café, building a beverage program, or
                looking for a dedicated hospitality professional — I'd love to
                hear what you're working on.
              </p>
            </SectionReveal>

            {/* Socials */}
            <SectionReveal delay={0.3}>
              <div className="flex flex-col gap-5 pt-2">
                {socials.map(s => (
                  <div key={s.label} className="flex items-center gap-5">
                    <span className="font-inter text-[9px] tracking-[0.3em] uppercase text-ivory/20 w-20 flex-shrink-0">
                      {s.label}
                    </span>
                    {s.ready ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer"
                        className="font-inter text-[13px] text-ivory/55 hover:text-gold transition-colors duration-300 hover-gold">
                        {s.value}
                      </a>
                    ) : (
                      <span className="font-inter text-[13px] text-ivory/18 italic">
                        {s.value}
                        <span className="font-inter text-[9px] tracking-[0.15em] uppercase text-gold/30 ml-3 not-italic">Soon</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right — form */}
          <SectionReveal delay={0.15} direction="right">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center border border-ink-border"
              >
                <div className="w-14 h-14 border border-gold/40 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <p className="font-bodoni text-2xl text-ivory italic">Message sent.</p>
                <p className="font-inter text-sm text-ivory/35">I'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {[
                  { id: "name",    label: "Name",    type: "text",  ph: "Your name"         },
                  { id: "email",   label: "Email",   type: "email", ph: "your@email.com"    },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id}
                      className={`font-inter text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${focus === f.id ? "text-gold/70" : "text-ivory/22"}`}>
                      {f.label}
                    </label>
                    <input id={f.id} type={f.type} required
                      value={(form as any)[f.id]}
                      onChange={e => setForm(fm => ({ ...fm, [f.id]: e.target.value }))}
                      onFocus={() => setFocus(f.id)}
                      onBlur={() => setFocus(null)}
                      placeholder={f.ph}
                      className="form-input" />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="message"
                    className={`font-inter text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${focus === "message" ? "text-gold/70" : "text-ivory/22"}`}>
                    Message
                  </label>
                  <textarea id="message" required rows={5}
                    value={form.message}
                    onChange={e => setForm(fm => ({ ...fm, message: e.target.value }))}
                    onFocus={() => setFocus("message")}
                    onBlur={() => setFocus(null)}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none" />
                </div>

                <button type="submit"
                  className="btn-gold font-inter text-[10px] tracking-[0.28em] uppercase px-10 py-4 self-start mt-2">
                  Send Message
                </button>
              </form>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
