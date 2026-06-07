"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  driftAmplitude: number;
  driftSpeed: number;
  driftOffset: number;
}

/**
 * Fixed canvas overlay with nearly-invisible drifting golden dust.
 *
 * Always present regardless of video state — keeps every section
 * visually alive even after footage freezes on its final frame.
 *
 * Opacity range: 0.018 – 0.065  (barely perceptible, never distracting)
 * Count: 55 particles
 * Motion: slow upward drift with gentle sinusoidal sway
 */
export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 55;
    let rafId: number;
    let particles: Particle[] = [];
    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };

    const makeParticle = (randomY = false): Particle => ({
      x:             Math.random() * W,
      y:             randomY ? Math.random() * H : H + Math.random() * 60,
      size:          0.5 + Math.random() * 1.1,
      opacity:       0.018 + Math.random() * 0.047,
      speed:         0.10 + Math.random() * 0.18,
      driftAmplitude:0.25 + Math.random() * 0.45,
      driftSpeed:    0.0004 + Math.random() * 0.0009,
      driftOffset:   Math.random() * Math.PI * 2,
    });

    const init = (fillScreen: boolean) => {
      particles = Array.from({ length: COUNT }, () => makeParticle(fillScreen));
    };

    const draw = () => {
      // Clear with full transparency — no fill, just erase
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.driftOffset += p.driftSpeed;
        p.x += Math.sin(p.driftOffset) * p.driftAmplitude;
        p.y -= p.speed;

        // Recycle when particle exits top
        if (p.y < -8) {
          const fresh = makeParticle(false);
          p.x            = fresh.x;
          p.y            = H + Math.random() * 30;
          p.size         = fresh.size;
          p.opacity      = fresh.opacity;
          p.speed        = fresh.speed;
          p.driftAmplitude = fresh.driftAmplitude;
          p.driftSpeed   = fresh.driftSpeed;
          p.driftOffset  = fresh.driftOffset;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Warm gold — very low alpha so it reads as atmosphere, not UI
        ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    init(true); // seed with particles already distributed across screen
    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      init(true);
    };
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
      style={{ zIndex: 9990 }}
      aria-hidden="true"
    />
  );
}
