"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
}

export default function SectionReveal({ children, className = "", delay = 0, direction = "up", distance = 28 }: Props) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  const initial: Record<string, string | number> = { opacity: 0 };
  if (direction === "up")    { initial.y = distance; }
  if (direction === "left")  { initial.x = -distance; }
  if (direction === "right") { initial.x = distance; }

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, x: 0 });
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
