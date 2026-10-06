"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Props = {
  text: string;
  className?: string;
  /** "scroll" reveals when scrolled into view, "ready" right after the preloader. */
  when?: "scroll" | "ready";
  delay?: number;
};

// Large title whose characters rise out of a mask in random order.
export default function SplitTitle({ text, className = "", when = "scroll", delay = 0 }: Props) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".split-char", root.current);
      gsap.set(chars, { yPercent: 115 });

      const tween = gsap.to(chars, {
        yPercent: 0,
        duration: 1.3,
        delay,
        ease: "power4.out",
        stagger: { each: 0.045, from: "random" },
        paused: true,
      });

      if (when === "ready") return onReady(() => tween.play());

      // An observer rather than a ScrollTrigger: it can't go stale when the
      // page height changes after the trigger positions were measured.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          tween.play();
          io.disconnect();
        },
        { rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(root.current!);
      return () => io.disconnect();
    },
    { scope: root }
  );

  return (
    <span ref={root} className={`split-word ${className}`}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <span key={i} className="split-mask" aria-hidden="true">
          <span className="split-char">{char}</span>
        </span>
      ))}
    </span>
  );
}
