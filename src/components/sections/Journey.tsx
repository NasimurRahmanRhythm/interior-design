"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Copy, Milestone } from "@/lib/db/types";

// An Archimedean spiral (r = A + B·θ) drawn from the centre outward and squashed
// vertically so it reads as a disc seen at an angle.
const W = 1300;
const H = 1000;
const CX = W / 2;
const CY = H / 2;
const A = 30;
const B = 26.5;
const TURNS = 2.5;
const SQUASH = 0.8;
const SAMPLES = 1200;

function useSpiral() {
  return useMemo(() => {
    const pts: [number, number, number][] = []; // x, y, angle
    const T = TURNS * Math.PI * 2;
    for (let i = 0; i <= SAMPLES; i++) {
      const t = (i / SAMPLES) * T;
      const r = A + B * t;
      const ang = t - Math.PI / 2;
      pts.push([CX + r * Math.cos(ang), CY + r * Math.sin(ang) * SQUASH, ang]);
    }
    const lengths = [0];
    for (let i = 1; i < pts.length; i++) {
      lengths.push(lengths[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    const total = lengths[lengths.length - 1];
    const at = (f: number) => {
      const target = f * total;
      let lo = 0;
      let hi = lengths.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (lengths[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      return pts[lo];
    };
    const d = "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");
    return { d, total, at };
  }, []);
}

// Milestones sit at even steps along the line, with a little room at each end.
const stopAt = (i: number, count: number) => 0.04 + (i / Math.max(1, count - 1)) * 0.945;

export default function Journey({ journey, copy }: { journey: Milestone[]; copy: Copy }) {
  const root = useRef<HTMLElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const spiral = useSpiral();

  useGSAP(
    () => {
      const update = (p: number) => {
        trail.current?.setAttribute("stroke-dashoffset", String(spiral.total * (1 - p)));
        const [x, y] = spiral.at(Math.max(p, 0.001));
        dot.current?.setAttribute("transform", `translate(${x} ${y})`);
        let current = 0;
        journey.forEach((_, i) => {
          if (p >= stopAt(i, journey.length) - 0.01) current = i;
        });
        setActive(current);
      };
      update(0);

      ScrollTrigger.create({
        trigger: ".journey-track",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => update(self.progress),
      });

      // The disc leans toward the pointer.
      const el = tilt.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3" });
      const move = (e: PointerEvent) => {
        rx(26 - (e.clientY / window.innerHeight) * 14);
        ry(((e.clientX / window.innerWidth) * 2 - 1) * 8);
      };
      gsap.set(el, { rotationX: 20, transformPerspective: 1600 });
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root, dependencies: [spiral, journey] }
  );

  const item = journey[active];

  return (
    <section ref={root} id="journey" data-theme="light" className="relative bg-[#ece4d6] text-ink">
      <div className="grid-w pb-6 pt-24 lg:pt-36">
        <div className="col-span-6 lg:col-span-7">
          <p className="t-label mb-4 opacity-60">{copy.eyebrow}</p>
          <h2 className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <SplitTitle text={copy.title[0]} className="t-lrg" />
            <SplitTitle text={copy.title[1]} className="t-lrg font-serif italic" delay={0.1} />
          </h2>
        </div>
        <p className="col-span-6 mt-6 max-w-sm text-sm leading-relaxed opacity-70 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
          {copy.text}
        </p>
      </div>

      <div className="journey-track relative h-[420vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden lg:flex-row lg:items-center">
          <div className="relative flex flex-1 items-center justify-center px-[var(--margin)] pt-16 lg:order-2 lg:pt-0">
            <div ref={tilt} className="w-[135%] max-w-none shrink-0 will-change-transform sm:w-full sm:max-w-[1100px]">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label="Company timeline">
                <path d={spiral.d} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.4" />
                <path
                  ref={trail}
                  d={spiral.d}
                  fill="none"
                  stroke="var(--color-leaf)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray={`${spiral.total} ${spiral.total}`}
                  strokeDashoffset={spiral.total}
                />

                {journey.map((stop, i) => {
                  const [x, y, ang] = spiral.at(stopAt(i, journey.length));
                  const ux = Math.cos(ang);
                  const uy = Math.sin(ang);
                  const anchor = ux > 0.25 ? "start" : ux < -0.25 ? "end" : "middle";
                  const lx = x + ux * 30;
                  const ly = y + uy * 30 * SQUASH + (anchor === "middle" ? (uy > 0 ? 18 : -26) : 0);
                  const on = i === active;
                  const done = i < active;
                  return (
                    <g key={stop.year} className="transition-opacity duration-700" opacity={on ? 1 : done ? 0.75 : 0.35}>
                      <line x1={x} y1={y} x2={x + ux * 22} y2={y + uy * 22 * SQUASH} stroke="currentColor" strokeOpacity="0.4" />
                      <circle
                        cx={x}
                        cy={y}
                        r={on ? 8 : 4.5}
                        className="transition-all duration-500"
                        fill={on || done ? "var(--color-leaf)" : "#ece4d6"}
                        stroke={on || done ? "var(--color-leaf)" : "currentColor"}
                      />
                      <g className="hidden sm:inline">
                        <text
                          x={lx}
                          y={ly}
                          textAnchor={anchor}
                          className="font-display transition-all duration-500"
                          fontSize={on ? 40 : 28}
                          fill="currentColor"
                        >
                          {stop.year}{" "}
                          <tspan className="font-serif italic">{stop.title}</tspan>
                        </text>
                      </g>
                    </g>
                  );
                })}

                <g ref={dot}>
                  <circle r="20" fill="none" stroke="var(--color-leaf)" strokeOpacity="0.45" />
                  <circle r="34" fill="none" stroke="var(--color-leaf)" strokeOpacity="0.2" />
                  <circle r="6" fill="var(--color-leaf)" />
                </g>
              </svg>
            </div>
          </div>

          <div className="relative z-10 shrink-0 px-[var(--margin)] pb-8 lg:order-1 lg:w-[30vw] lg:pb-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.2, 0.75, 0.35, 1] }}
              >
                <p className="t-label opacity-60">
                  {String(active + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.04em]">{item.year}</p>
                <p className="t-h3 mt-2 italic">{item.title}</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-75">{item.detail}</p>
                {item.image && (
                  <div className="fit mt-5 hidden aspect-[4/3] w-full max-w-xs lg:block">
                    <Image src={item.image} alt={item.title} fill sizes="22vw" className="object-cover" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
