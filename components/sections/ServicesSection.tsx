"use client";

import SectionReveal from "@/components/ui/SectionReveal";

const services = [
  {
    n: "01",
    title: "Specialty Coffee Consulting",
    desc: "From espresso program design to equipment selection and workflow optimization. I help cafés, restaurants, and hotels build a coffee offering that matches their brand and guest expectations.",
    tags: ["Espresso Programs", "Menu Development", "Equipment Setup"],
  },
  {
    n: "02",
    title: "Barista Training & Coaching",
    desc: "Hands-on training programs for front-of-house staff — covering extraction technique, milk texturing, latte art, and the mindset behind consistent, high-quality service.",
    tags: ["One-on-One Coaching", "Team Workshops", "Service Standards"],
  },
  {
    n: "03",
    title: "Hospitality Operations",
    desc: "Drawing from leadership roles across high-volume restaurants and luxury hotel beverage outlets, I help teams run tighter, smoother, and more guest-focused operations.",
    tags: ["Team Leadership", "SOP Development", "Quality Control"],
  },
  {
    n: "04",
    title: "Guest Experience Design",
    desc: "Mapping and refining the guest journey — from first impression to final goodbye. Every touchpoint is an opportunity to create loyalty. I help you find and own those moments.",
    tags: ["Journey Mapping", "Service Design", "Complaint Resolution"],
  },
  {
    n: "05",
    title: "Beverage Menu Curation",
    desc: "Seasonal menu development for cafés, hotel F&B outlets, and restaurant programs. Balancing trend awareness with operational practicality and brand coherence.",
    tags: ["Seasonal Menus", "Signature Drinks", "Cost Optimization"],
  },
  {
    n: "06",
    title: "Brand Culture Development",
    desc: "Coffee culture is an identity. I help hospitality businesses articulate and live the values that set them apart — through their product, their team, and their space.",
    tags: ["Brand Values", "Staff Culture", "Identity Alignment"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 md:py-52 bg-ink-mid overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.18), transparent)" }} />

      <div className="max-w-7xl mx-auto px-8 md:px-16">

        <SectionReveal>
          <div className="section-label mb-12">
            <span>02 — Services</span>
            <div className="gold-line" />
          </div>
        </SectionReveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <SectionReveal delay={0.1}>
            <h2 className="font-bodoni leading-tight text-ivory"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
              What I bring<br />
              to the <span className="italic text-gold">table.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-ivory/25 max-w-xs">
              Built from 7+ years of real-world experience
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-border">
          {services.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.07}>
              <div className="group bg-ink-mid p-9 md:p-10 card-hover relative overflow-hidden h-full">
                {/* Bottom gold reveal */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />

                <p className="font-bodoni text-5xl font-bold text-ink-border2 group-hover:text-gold/15 transition-colors duration-500 mb-5 leading-none">
                  {s.n}
                </p>
                <h3 className="font-bodoni text-xl md:text-2xl text-ivory/90 group-hover:text-gold transition-colors duration-400 mb-4 leading-snug">
                  {s.title}
                </h3>
                <p className="font-inter text-[13px] leading-[1.8] text-ivory/38 font-light mb-7">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.18), transparent)" }} />
    </section>
  );
}
