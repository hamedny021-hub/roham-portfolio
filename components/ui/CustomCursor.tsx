"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);
  const hovered = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const animate = () => {
      const ease = hovered.current ? 0.09 : 0.13;
      ring.current.x += (pos.current.x - ring.current.x) * ease;
      ring.current.y += (pos.current.y - ring.current.y) * ease;
      const r = ringRef.current!;
      r.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      hovered.current = true;
      ringRef.current!.style.width  = "52px";
      ringRef.current!.style.height = "52px";
      ringRef.current!.style.borderColor = "rgba(212,168,67,0.9)";
    };
    const onLeaveLink = () => {
      hovered.current = false;
      ringRef.current!.style.width  = "40px";
      ringRef.current!.style.height = "40px";
      ringRef.current!.style.borderColor = "rgba(212,168,67,0.4)";
    };

    document.addEventListener("mousemove", onMove);
    const links = document.querySelectorAll("a,button,[data-hover]");
    links.forEach(el => { el.addEventListener("mouseenter", onEnterLink); el.addEventListener("mouseleave", onLeaveLink); });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[10001] w-1.5 h-1.5 rounded-full bg-gold pointer-events-none will-change-transform" />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] w-10 h-10 rounded-full border border-gold/40 pointer-events-none will-change-transform"
        style={{ transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease" }}
      />
    </>
  );
}
