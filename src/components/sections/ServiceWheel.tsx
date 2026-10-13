"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { about } from "@/lib/pages";

// The eight services from the company profile, turning on a tilted ring around the logo.
export default function ServiceWheel() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const labels = gsap.utils.toArray<HTMLElement>(".wheel-item");
      const state = { a: 0 };
      const step = 360 / labels.length;
      const render = () => {
        state.a = (state.a + 0.08) % 360;
        const w = root.current?.offsetWidth ?? 600;
        const h = root.current?.offsetHeight ?? 300;
        const rx = w * (w < 640 ? 0.3 : 0.42);
        const ry = h * (w < 640 ? 0.36 : 0.3);
        labels.forEach((el, i) => {
          const t = ((i * step + state.a) * Math.PI) / 180;
          const depth = (Math.sin(t) + 1) / 2; // 0 back, 1 front
          gsap.set(el, {
            x: Math.cos(t) * rx,
            y: Math.sin(t) * ry,
            scale: 0.7 + depth * 0.45,
            opacity: 0.3 + depth * 0.7,
            zIndex: Math.round(depth * 10),
          });
        });
      };
      gsap.ticker.add(render);
      return () => gsap.ticker.remove(render);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative mx-auto aspect-square w-full max-w-[1000px] sm:aspect-[2/1]" aria-label="Our services" role="list">
      <span className="absolute left-1/2 top-1/2 h-[72%] w-[64%] sm:w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-current opacity-15 sm:h-[60%]" />
      <div className="absolute left-1/2 top-1/2 z-[5] w-[24%] -translate-x-1/2 -translate-y-1/2 sm:w-[16%]">
        <Image src="/images/logo-mark.png" alt="" width={512} height={512} className="h-auto w-full" />
      </div>
      {about.wheel.map((name) => (
        <span
          key={name}
          role="listitem"
          className="wheel-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(0.95rem,2.6vw,2.4rem)] tracking-[-0.02em]"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
