"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel in percent of the element's own height. */
  amount?: number;
};

export default function Parallax({ children, className = "", amount = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { yPercent: amount },
      {
        yPercent: -amount,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
