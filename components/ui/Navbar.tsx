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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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
        <a href="#hero" className="font-cormorant font-semibold text-[22px] tracking-[0.28em] text-ivory hover:text-gold transition-colors duration-300">
          ROHAM
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="font-grotesk text-[10px] tracking-[0.22em] uppercase text-ivory/50 hover:text-gold/90 transition-colors duration-300 hover-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <button className="md:hidden flex flex-col gap-[5px]" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-px bg-ivory/60 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(false)}
                className="font-cormorant font-semibold text-5xl text-ivory hover:text-gold transition-colors duration-300">
                {l.label}
              </motion.a>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="font-inter text-[10px] tracking-[0.3em] uppercase text-ivory/20 mt-8">
              hamedny021@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
