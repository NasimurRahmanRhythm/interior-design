"use client";

import { useRef } from "react";
import RevealText from "../RevealText";
import { gsap, useGSAP } from "@/lib/gsap";
import { BD_PATH, BD_VIEWBOX, project } from "@/lib/bangladesh";
import type { Copy, Settings } from "@/lib/db/types";

export default function Reach({ reach, copy }: { reach: Settings["reach"]; copy: Copy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".reach-pin", {
        opacity: 0,
        scale: 0.4,
        transformOrigin: "center",
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-map", start: "top 70%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="light" className="overflow-hidden bg-bone py-24 text-ink lg:py-36">
      <div className="grid-w items-center gap-y-14">
        <div className="col-span-6 lg:col-span-5 lg:col-start-1">
          <p className="t-label mb-6 opacity-60">{copy.eyebrow}</p>
          {reach.figures.map((f, i) => (
            <div key={f.unit} className={i ? "mt-8" : ""}>
              <p className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(5rem,11vw,10rem)] leading-[0.85] tracking-[-0.045em]">{f.value}</span>
                <span className="t-h1 italic">{f.unit}</span>
              </p>
              <RevealText className="mt-3 max-w-sm text-sm leading-relaxed opacity-70">{f.text}</RevealText>
            </div>
          ))}
        </div>

        <div className="reach-map col-span-6 lg:col-span-6 lg:col-start-7">
          <svg viewBox={`0 0 ${BD_VIEWBOX.width} ${BD_VIEWBOX.height}`} className="mx-auto h-auto w-full max-w-[560px]" role="img" aria-label="Map of Bangladesh with project locations">
            <path d={BD_PATH} fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.1" strokeLinejoin="round" />

            {reach.cities.map((c) => {
              const [x, y] = project(c.lat, c.lon);
              return (
                <g key={c.name} opacity="0.4">
                  <circle cx={x} cy={y} r="2.5" fill="currentColor" />
                  <text x={x + 7} y={y + 4} fontSize="10" letterSpacing="1.5" fill="currentColor">
                    {c.name.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {reach.pins.map((pin) => {
              const [x, y] = project(pin.lat, pin.lon);
              const left = pin.name === "Savar";
              return (
                <g key={pin.name} className="reach-pin">
                  <title>{`${pin.name} — ${pin.note}`}</title>
                  {pin.major && (
                    <>
                      <circle cx={x} cy={y} r="26" fill="none" stroke="#7b5136" strokeOpacity="0.35" />
                      <circle cx={x} cy={y} r="46" fill="none" stroke="#7b5136" strokeOpacity="0.18" />
                    </>
                  )}
                  <circle cx={x} cy={y} r={pin.major ? 8 : 5} fill="#7b5136" />
                  <text
                    x={left ? x - 10 : x + 12}
                    y={pin.name === "Gazipur" ? y - 8 : pin.major ? y + 18 : y + 4}
                    textAnchor={left ? "end" : "start"}
                    fontSize="12"
                    letterSpacing="2"
                    fill="currentColor"
                  >
                    {pin.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="t-label mt-4 text-center opacity-50">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
