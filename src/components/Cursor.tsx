"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as HTMLElement | null)?.closest("a, button, [data-cursor]");
      gsap.to(el, { scale: interactive ? 3.2 : 1, duration: 0.35, overwrite: "auto" });
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] -ml-1.5 -mt-1.5 hidden h-3 w-3 rounded-full bg-bone opacity-0 mix-blend-difference [@media(pointer:fine)]:block"
    />
  );
}
