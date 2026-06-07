"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink overflow-hidden">

      {/* Hairline gold rule — the last trace of warmth before silence */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.22), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Brand */}
          <a
            href="#hero"
            className="font-cormorant font-semibold text-[22px] tracking-[0.35em] text-ivory/45 hover:text-gold/70 transition-colors duration-500"
          >
            ROHAM
          </a>

          <p className="font-inter text-[8px] tracking-[0.28em] uppercase text-ivory/15">
            Barista · Hospitality · Creative Direction
          </p>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {["About", "Services", "Skills", "Experience", "Contact"].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-grotesk text-[8px] tracking-[0.25em] uppercase text-ivory/15 hover:text-gold/40 transition-colors duration-400"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Thin divider */}
          <div
            className="w-12 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)" }}
          />

          {/* Copyright */}
          <p className="font-inter text-[8px] tracking-[0.2em] uppercase text-ivory/10">
            © {year} Hamed Roham · Toronto, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
