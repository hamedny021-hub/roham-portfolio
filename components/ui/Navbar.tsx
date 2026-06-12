"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About",      href: "#about"      },
  { label: "Services",   href: "#services"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Scroll-spy — gold-marks the section currently in view ───────────
  // One observer, fires when a section crosses the middle band of the
  // viewport (-45% margins) so the active state flips at the natural
  // "I am now reading this section" moment, not at first pixel overlap.
  useEffect(() => {
    const sections = links
      .map(l => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => s !== null);

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach(s => observer.observe(s));

    // Hero in view = no link active
    const hero = document.querySelector("#hero");
    if (hero) {
      const heroObs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(""); },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      heroObs.observe(hero);
      return () => { observer.disconnect(); heroObs.disconnect(); };
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-8 md:px-14 py-5 transition-all duration-700 ${
          scrolled ? "glass-nav" : ""
        }`}
      >
        <a href="#hero" className="font-brand font-bold text-[18px] tracking-[0.28em] text-ivory hover:text-gold transition-colors duration-300">
          ROHAM
        </a>

        {/* Desktop — scroll-spy: active link turns gold with a persistent underline */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map(l => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`font-accent text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 hover-gold ${
                    isActive ? "text-gold" : "text-ivory/60 hover:text-gold/90"
                  }`}
                >
                  {l.label}
                </a>
                {/* Active indicator — slides between links via layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #D4A843, transparent)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Burger */}
        <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(v => !v)} aria-label="Menu" aria-expanded={open}>
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile menu — editorial: numbered entries, staggered reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { delay: (links.length - i) * 0.03 } }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(false)}
                className={`flex items-baseline gap-4 group ${
                  active === l.href ? "text-gold" : "text-ivory"
                }`}>
                <span className="font-accent text-[10px] tracking-[0.2em] text-gold/45 group-hover:text-gold transition-colors duration-300">
                  0{i + 1}
                </span>
                <span className="font-brand font-bold text-4xl group-hover:text-gold transition-colors duration-300">
                  {l.label}
                </span>
              </motion.a>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.4 }}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/35 mt-8">
              hamedny021@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
