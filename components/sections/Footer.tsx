"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-border bg-ink-mid py-14 px-8 md:px-16">
      {/* Top gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.35), transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-2.5 items-center md:items-start">
            <a href="#hero" className="font-bodoni text-2xl tracking-[0.3em] text-ivory/75 hover:text-gold transition-colors duration-300">
              ROHAM
            </a>
            <p className="font-inter text-[10px] tracking-[0.15em] text-ivory/20 text-center md:text-left">
              Barista · Hospitality Professional · Team Leader
            </p>
          </div>

          {/* Nav */}
          <nav className="flex items-center flex-wrap justify-center gap-6 md:gap-9">
            {["About","Services","Skills","Experience","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="font-inter text-[9px] tracking-[0.22em] uppercase text-ivory/22 hover:text-gold/60 transition-colors duration-300">
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 mb-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.12), transparent)" }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-ivory/15">
            © {year} Hamed Roham. All rights reserved.
          </p>
          <p className="font-inter text-[9px] tracking-[0.15em] italic text-ivory/12">
            Toronto, Canada · hamedny021@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
