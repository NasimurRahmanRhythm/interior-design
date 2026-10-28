"use client";

import { useEffect, useRef, useState } from "react";
import RevealText from "../RevealText";
import { gsap, useGSAP } from "@/lib/gsap";
import { BD_PATH, BD_VIEWBOX, CITIES, project } from "@/lib/bangladesh";
import type { Copy, MapPoint, Settings } from "@/lib/db/types";

type Props = { points: MapPoint[]; figures: Settings["mapFigures"]; copy: Copy };

export default function Reach({ points, figures, copy }: Props) {
  const root = useRef<HTMLElement>(null);
  // The point whose title is showing: hovered, focused or tapped.
  // A click opens the place in Google Maps; on touch screens the first tap shows the title.
  const [open, setOpen] = useState<string | null>(null);
  const pointer = useRef("mouse");

  // A tap anywhere else closes the title on touch screens.
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".reach-pin")) setOpen(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useGSAP(
    () => {
      gsap.from(".reach-pin", {
        opacity: 0,
        scale: 0.4,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-map", start: "top 70%", once: true },
      });
    },
    { scope: root, dependencies: [points] }
  );

  return (
    <section ref={root} data-theme="light" className="overflow-hidden bg-bone py-24 text-ink lg:py-36">
      <div className="grid-w items-center gap-y-14">
        <div className="col-span-6 lg:col-span-5 lg:col-start-1">
          <p className="t-eyebrow mb-6 opacity-60">{copy.eyebrow}</p>
          {figures.map((f, i) => (
            <div key={`${f.value}${f.unit}`} className={i ? "mt-8" : ""}>
              <p className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(5rem,11vw,10rem)] leading-[0.85] tracking-[-0.045em]">{f.value}</span>
                <span className="t-h1">{f.unit}</span>
              </p>
              <RevealText className="mt-3 max-w-sm text-sm leading-relaxed opacity-70">{f.text}</RevealText>
            </div>
          ))}
        </div>

        <div className="reach-map col-span-6 lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto w-full max-w-[560px]" onMouseLeave={() => setOpen(null)}>
            <svg viewBox={`0 0 ${BD_VIEWBOX.width} ${BD_VIEWBOX.height}`} className="block h-auto w-full" role="img" aria-label="Map of Bangladesh">
              <path d={BD_PATH} fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.1" strokeLinejoin="round" />
              {CITIES.map((c) => {
                const [x, y] = project(c.lat, c.lon);
                return (
                  <g key={c.name} opacity="0.35">
                    <circle cx={x} cy={y} r="2.5" fill="currentColor" />
                    <text x={x + 7} y={y + 4} fontSize="10" letterSpacing="1.5" fill="currentColor">
                      {c.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>

            <ul aria-label="Where we have worked">
              {points.map((p) => {
                const [x, y] = project(p.lat, p.lon);
                const left = (x / BD_VIEWBOX.width) * 100;
                const top = (y / BD_VIEWBOX.height) * 100;
                const shown = open === p.id;
                return (
                  <li key={p.id} className="absolute" style={{ left: `${left}%`, top: `${top}%`, zIndex: shown ? 20 : 10 }}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} — open in Google Maps`}
                      onPointerDown={(e) => (pointer.current = e.pointerType)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(p.id)}
                      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(p.id)}
                      onBlur={() => setOpen((o) => (o === p.id ? null : o))}
                      onClick={(e) => {
                        if (pointer.current !== "mouse" && open !== p.id) {
                          e.preventDefault();
                          setOpen(p.id);
                        }
                      }}
                      className="reach-pin group absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                    >
                      <span className={`absolute h-full w-full rounded-full bg-umber/20 transition-transform duration-500 ${shown ? "scale-150" : "scale-100"}`} />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-umber ring-2 ring-bone" />
                    </a>
                    <span
                      role="tooltip"
                      className={`pointer-events-none absolute bottom-4 w-max max-w-[min(16rem,60vw)] rounded-sm bg-ink px-3 py-2 text-xs leading-snug text-bone shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-[opacity,translate] duration-300 ${
                        left > 60 ? "right-0 translate-x-3" : left < 40 ? "left-0 -translate-x-3" : "left-1/2 -translate-x-1/2"
                      } ${shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                    >
                      {p.title}
                      <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.06em] text-bone/60">Click to open the map ↗</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="t-label mt-4 text-center opacity-50">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
