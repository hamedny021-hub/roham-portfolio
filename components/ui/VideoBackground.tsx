"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  /** 0–1 base darkness overlay. Default 0.65 */
  darkness?: number;
  /** Subtle warm espresso tint over the footage */
  warmTint?: boolean;
  className?: string;
}

/**
 * Cinematic section video background.
 *
 * Video behavior:
 * - preload="none"  → zero network cost until section is actually in view
 * - Enter section   → always restart from frame 0 and play
 * - Video ends      → freeze on final frame (no loop)
 * - Leave section   → pause on current frame
 * - Re-enter        → restart from frame 0 and play again
 *
 * No rootMargin — fires only when element is genuinely visible (≥15% in view).
 * This prevents the video burning runtime while off-screen.
 */
export default function VideoBackground({
  src,
  darkness = 0.65,
  warmTint = false,
  className = "",
}: VideoBackgroundProps) {
  const videoRef          = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const playFromStart = () => {
      // Trigger load the very first time
      if (v.readyState === 0) {
        v.preload = "auto";
        v.load();
      }
      // Always restart from frame 0 so full clip plays on every entry
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    // No rootMargin — section must actually be in view before play starts
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playFromStart();
        } else {
          v.pause(); // freeze on whatever frame it reached
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(v);

    // canplay fires as soon as the browser can start playback —
    // earlier than canplaythrough, so the fade-in begins sooner
    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay);

    return () => {
      observer.disconnect();
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Video — no loop, freezes on final frame */}
      {/* scale-[0.88] on mobile = 12% zoom-out so more footage is visible.
          md:scale-100 restores full-size on desktop — no change there. */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover scale-[0.88] md:scale-100 transition-opacity duration-[1200ms] ease-in-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        preload="none"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Base dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: `rgba(5,5,5,${darkness})` }}
      />

      {/* Cinematic vignette — top/bottom fades + radial edge darkening */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(5,5,5,0.55) 0%,
              rgba(5,5,5,0.00) 20%,
              rgba(5,5,5,0.00) 70%,
              rgba(5,5,5,0.90) 100%
            ),
            radial-gradient(ellipse at 50% 50%,
              transparent 38%,
              rgba(5,5,5,0.40) 100%
            )
          `,
        }}
      />

      {/* Warm espresso tint — optional, mixes with footage for premium feel */}
      {warmTint && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(28,15,8,0.18)", mixBlendMode: "multiply" }}
        />
      )}
    </div>
  );
}
