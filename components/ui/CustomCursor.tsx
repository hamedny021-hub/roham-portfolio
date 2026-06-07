"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Premium ring cursor — desktop / pointer devices only.
 *
 * Architecture (why it cannot cause a missing cursor):
 * ─────────────────────────────────────────────────────
 * The native cursor is NEVER hidden anywhere in the codebase.
 * This component is a purely additive overlay. If it fails to mount,
 * errors, or is slow to hydrate, the native cursor is unaffected.
 *
 * Design: thin gold ring (40px) that follows the mouse with lerp lag,
 * expanding to 52px on interactive elements. Coexists with the native
 * cursor — the ring orbits around it, giving an editorial ring-cursor
 * effect seen on luxury fashion / Awwwards-level sites.
 *
 * Mobile / touch (pointer:coarse): renders null — zero overhead.
 *
 * Performance: single rAF loop, only GPU-composited transform3d writes,
 * no DOM reads inside the loop, event delegation on document (works with
 * dynamically added elements).
 */
export default function CustomCursor() {
  // Two-div pattern:
  //   posDiv  — position wrapper, only transform changes per frame (GPU composited)
  //   ringDiv — visual ring, width/height/color transitions via CSS
  const posRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Raw cursor position (updated on every mousemove)
  const target  = useRef({ x: -200, y: -200 });
  // Interpolated position (updated in RAF)
  const lerped  = useRef({ x: -200, y: -200 });
  const rafId   = useRef<number>(0);
  const hovered = useRef(false);

  // show: true only after confirming this is a pointer device (client-side only)
  const [show, setShow] = useState(false);

  // Phase 1 — device detection after mount
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setShow(true);
    }
  }, []);

  // Phase 2 — RAF + event listeners, only when confirmed pointer device
  useEffect(() => {
    if (!show) return;
    const pos  = posRef.current;
    const ring = ringRef.current;
    if (!pos || !ring) return;

    // ── Hover state changes (width/color transition handled by CSS) ──
    const applyHover = (on: boolean) => {
      ring.style.width       = on ? "52px"                   : "40px";
      ring.style.height      = on ? "52px"                   : "40px";
      ring.style.borderColor = on ? "rgba(212,168,67,0.65)" : "rgba(212,168,67,0.28)";
      ring.style.boxShadow   = on
        ? "0 0 28px rgba(212,168,67,0.15), inset 0 0 10px rgba(212,168,67,0.04)"
        : "0 0 14px rgba(212,168,67,0.07)";
    };

    // ── Mouse tracking ────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    // ── Event delegation — works with dynamic/future DOM additions ────
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("a, button, [data-hover]") && !hovered.current) {
        hovered.current = true;
        applyHover(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!hovered.current) return;
      const to = e.relatedTarget as Element | null;
      if (!to?.closest?.("a, button, [data-hover]")) {
        hovered.current = false;
        applyHover(false);
      }
    };

    // ── RAF loop — lerp then write transform (no DOM reads) ───────────
    const tick = () => {
      const ease = hovered.current ? 0.10 : 0.14;
      lerped.current.x += (target.current.x - lerped.current.x) * ease;
      lerped.current.y += (target.current.y - lerped.current.y) * ease;
      // translate3d keeps the update on the compositor thread
      pos.style.transform = `translate3d(${lerped.current.x}px,${lerped.current.y}px,0)`;
      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover",  onOver, { passive: true });
    document.addEventListener("mouseout",   onOut,  { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [show]);

  // Render nothing on touch / stylus devices
  if (!show) return null;

  return (
    /*
     * Outer div — position only. No CSS transition here so the rAF
     * transform writes are instant (no fighting a transition).
     *
     * Inner div — the ring. All visual transitions (size, glow) happen
     * here via CSS transition. translate(-50%,-50%) always centers the
     * ring on the cursor position regardless of ring size, so expanding
     * from 40→52px stays perfectly centered.
     */
    <div
      ref={posRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[10000] pointer-events-none"
      style={{
        transform:  "translate3d(-200px,-200px,0)", // off-screen before first move
        willChange: "transform",
      }}
    >
      <div
        ref={ringRef}
        className="rounded-full"
        style={{
          width:      "40px",
          height:     "40px",
          // translate(-50%,-50%) centers ring on cursor position.
          // CSS transition on width/height adjusts the offset proportionally,
          // so hover-expand stays centered without extra JS math.
          transform:  "translate(-50%, -50%)",
          border:     "1px solid rgba(212,168,67,0.28)",
          boxShadow:  "0 0 14px rgba(212,168,67,0.07)",
          transition: [
            "width 0.38s cubic-bezier(0.16,1,0.3,1)",
            "height 0.38s cubic-bezier(0.16,1,0.3,1)",
            "border-color 0.30s ease",
            "box-shadow 0.30s ease",
          ].join(", "),
        }}
      />
    </div>
  );
}
