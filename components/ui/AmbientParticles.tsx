"use client";

import { useEffect, useRef } from "react";

// ─── DEBUG FLAG ───────────────────────────────────────────────────────────────
// Set to true to verify the canvas is rendering.
// Particles will be large, bright, and fast — immediately visible.
// Set back to false for production luxury values.
const DEBUG = false;

// ─── Tuning ───────────────────────────────────────────────────────────────────
const CFG = DEBUG
  ? {
      dustCount:     60,
      dustSize:      [5,  12 ],
      dustOpacity:   [0.55, 0.80],
      dustSpeed:     [1.8, 3.5 ],
      dustSway:      [1.5, 3.0 ],
      bokehCount:    6,
      bokehRadius:   [80, 160 ],
      bokehOpacity:  [0.30, 0.50],
      bokehSpeed:    [0.4, 0.8 ],
      filCount:      4,
      filWidth:      [4,  8   ],
      filLength:     [150, 300],
      filOpacity:    [0.40, 0.65],
      filDrift:      [0.8, 1.8 ],
    }
  : {
      // ── PRODUCTION — genuinely visible but never distracting ──
      // These values are confirmed above the threshold of perception
      // on a dark background while remaining atmospheric.
      dustCount:     55,
      dustSize:      [1.2, 2.8 ],   // 1–3px: tiny but readable
      dustOpacity:   [0.06, 0.14],  // 6–14%: visible on dark bg
      dustSpeed:     [0.20, 0.42],  // slow drift
      dustSway:      [0.30, 0.65],
      bokehCount:    7,
      bokehRadius:   [35,  80  ],
      bokehOpacity:  [0.018, 0.048], // soft glow spheres
      bokehSpeed:    [0.018, 0.045],
      filCount:      3,
      filWidth:      [1.2, 2.2 ],
      filLength:     [100, 230 ],
      filOpacity:    [0.025, 0.058],
      filDrift:      [0.06, 0.14 ],
    };

// ─── Types ────────────────────────────────────────────────────────────────────
interface DustMote      { x:number; y:number; size:number; opacity:number; speed:number; swayAmp:number; swaySpeed:number; swayOff:number; }
interface BokehOrb      { x:number; y:number; radius:number; opacity:number; vx:number; vy:number; }
interface LightFilament { x:number; y:number; width:number; length:number; angle:number; opacity:number; drift:number; }

// ─────────────────────────────────────────────────────────────────────────────

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // willReadFrequently: false — we only write, never readback
    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    let rafId: number;
    let W = 0, H = 0, dpr = 1;
    let dust: DustMote[] = [], bokeh: BokehOrb[] = [], fils: LightFilament[] = [];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = (t: number[]) => rnd(t[0], t[1]);

    // ── Setup ─────────────────────────────────────────────────────────────
    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× — no need for 3×
      W   = window.innerWidth;
      H   = window.innerHeight;
      // Reset canvas pixel buffer
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      // CSS size stays at logical pixels
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      // Scale all draw calls so we work in logical pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── Factories ─────────────────────────────────────────────────────────
    const makeDust = (anyY = false): DustMote => ({
      x:        rnd(0, W),
      y:        anyY ? rnd(0, H) : H + rnd(0, 50),
      size:     pick(CFG.dustSize),
      opacity:  pick(CFG.dustOpacity),
      speed:    pick(CFG.dustSpeed),
      swayAmp:  pick(CFG.dustSway),
      swaySpeed:rnd(0.0003, 0.0012),
      swayOff:  rnd(0, Math.PI * 2),
    });

    const makeBokeh = (anyY = false): BokehOrb => ({
      x:       rnd(W * 0.05, W * 0.95),
      y:       anyY ? rnd(0, H) : H + rnd(0, 120),
      radius:  pick(CFG.bokehRadius),
      opacity: pick(CFG.bokehOpacity),
      vx:      rnd(-0.03, 0.03),
      vy:      -pick(CFG.bokehSpeed),
    });

    const makeFil = (anyX = false): LightFilament => ({
      x:       anyX ? rnd(-200, W + 200) : -rnd(80, 250),
      y:       rnd(H * 0.02, H * 0.90),
      width:   pick(CFG.filWidth),
      length:  pick(CFG.filLength),
      angle:   rnd(0.50, 0.90),
      opacity: pick(CFG.filOpacity),
      drift:   pick(CFG.filDrift),
    });

    const init = (seed: boolean) => {
      dust  = Array.from({ length: CFG.dustCount  }, () => makeDust(seed));
      bokeh = Array.from({ length: CFG.bokehCount  }, () => makeBokeh(seed));
      fils  = Array.from({ length: CFG.filCount    }, () => makeFil(seed));
    };

    // ── Draw loop ─────────────────────────────────────────────────────────
    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      // ── Dust ──────────────────────────────────────────────────────────
      for (const d of dust) {
        d.swayOff += d.swaySpeed;
        d.x       += Math.sin(d.swayOff) * d.swayAmp;
        d.y       -= d.speed;
        if (d.y < -10) Object.assign(d, makeDust(false));

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${d.opacity.toFixed(3)})`;
        ctx.fill();
      }

      // ── Bokeh orbs ────────────────────────────────────────────────────
      for (const b of bokeh) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -b.radius * 2) Object.assign(b, makeBokeh(false));

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0,    `rgba(212,168,67,${b.opacity.toFixed(3)})`);
        g.addColorStop(0.50, `rgba(200,148,50,${(b.opacity * 0.40).toFixed(3)})`);
        g.addColorStop(1,    "rgba(180,130,40,0)");

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Light filaments ───────────────────────────────────────────────
      for (const f of fils) {
        f.x += f.drift;
        if (f.x > W + f.length) Object.assign(f, makeFil(false));

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle);

        const lg = ctx.createLinearGradient(0, -f.length / 2, 0, f.length / 2);
        lg.addColorStop(0,    "rgba(212,168,67,0)");
        lg.addColorStop(0.30, `rgba(212,168,67,${f.opacity.toFixed(3)})`);
        lg.addColorStop(0.70, `rgba(212,168,67,${f.opacity.toFixed(3)})`);
        lg.addColorStop(1,    "rgba(212,168,67,0)");

        ctx.fillStyle = lg;
        ctx.fillRect(-f.width / 2, -f.length / 2, f.width, f.length);
        ctx.restore();
      }

      rafId = requestAnimationFrame(frame);
    };

    // ── Mobile perf — halve particle counts on touch/coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      CFG.dustCount  = Math.ceil(CFG.dustCount  / 2);
      CFG.bokehCount = Math.ceil(CFG.bokehCount / 2);
      CFG.filCount   = 1;
    }

    // ── Boot ──────────────────────────────────────────────────────────────
    setup();
    init(true);
    rafId = requestAnimationFrame(frame);

    const onResize = () => { setup(); init(true); };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      // Must be above section content (z ~30) and below grain (9998) / scroll bar (9999)
      // The grain overlay is semi-transparent so particles show through it
      style={{ zIndex: 9991 }}
      aria-hidden="true"
    />
  );
}
