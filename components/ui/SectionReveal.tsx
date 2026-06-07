"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  /** Add blur-to-sharp reveal for heading-level elements */
  blur?: boolean;
}

// Expo-out — the luxury / Apple motion language
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 28,
  blur = false,
}: Props) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();
  const pRM      = useReducedMotion();

  useEffect(() => {
    if (pRM) {
      // Reduced-motion: snap to visible immediately, no movement or blur
      controls.set({ opacity: 1, y: 0, x: 0, ...(blur ? { filter: "blur(0px)" } : {}) });
      return;
    }
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      });
    }
  }, [inView, pRM, controls, blur]);

  // Build initial state — hidden + positioned + optionally blurred
  const initial: Record<string, string | number> = {
    opacity: pRM ? 1 : 0,
  };
  if (!pRM) {
    if (direction === "up")    { initial.y = distance; }
    if (direction === "left")  { initial.x = -distance; }
    if (direction === "right") { initial.x = distance; }
    if (blur)                  { initial.filter = "blur(8px)"; }
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={{ duration: pRM ? 0 : 1.0, delay: pRM ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
