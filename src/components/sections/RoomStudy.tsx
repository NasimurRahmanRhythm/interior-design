"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { finishes, roomSteps } from "@/lib/data";

const RoomScene = dynamic(() => import("../three/RoomScene"), { ssr: false });

// Scroll thresholds at which each step of the 3D room begins.
const STEP_STARTS = [0, 0.26, 0.43, 0.75];

export default function RoomStudy() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);
  const [night, setNight] = useState(false);
  const [finish, setFinish] = useState(0);

  useGSAP(
    () => {
      const trigger = ".room-track";

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current = self.progress;
          setStep(STEP_STARTS.reduce((acc, start, i) => (self.progress >= start ? i : acc), 0));
          setNight(self.progress > 0.9);
        },
      });

      gsap.to(".room-bar", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: true },
      });

      // Daylight fades at the end of the scroll and the section follows it.
      gsap.fromTo(
        ".room-stage",
        { backgroundColor: "#f1eade", color: "#151415" },
        {
          backgroundColor: "#151415",
          color: "#f1eade",
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger, start: "84% bottom", end: "97% bottom", scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme={night ? "dark" : "light"} className="relative bg-bone">
      <div className="room-track relative h-[460vh]">
        <div className="room-stage sticky top-0 h-svh overflow-hidden bg-bone text-ink">
          <RoomScene
            progress={progress}
            finish={finishes[finish]}
            className="absolute inset-x-0 top-[9svh] h-[52svh] lg:inset-y-0 lg:left-[34%] lg:right-0 lg:top-0 lg:h-auto"
          />

          <div className="grid-w pointer-events-none absolute inset-0 content-end pb-8 lg:content-center lg:pb-0">
            <div className="pointer-events-auto col-span-6 lg:col-span-4">
              <p className="t-label mb-4 opacity-60">3D Study — Scroll to assemble</p>
              <h2 className="t-h1">
                A Room,
                <br />
                <span className="ml-[0.8em] italic">Assembled</span>
              </h2>

              <ol className="relative mt-8 flex flex-col gap-4 pl-6 lg:mt-12 lg:gap-6">
                <span className="absolute bottom-1 left-0 top-1 w-px bg-current opacity-15" />
                <span className="room-bar absolute bottom-1 left-0 top-1 w-px origin-top scale-y-0 bg-current" />
                {roomSteps.map((item, i) => (
                  <li
                    key={item.title}
                    className={`transition-opacity duration-700 ease-cubic ${i === step ? "opacity-100" : "opacity-30"}`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="t-label tabular-nums">0{i + 1}</span>
                      <span className="t-h5">{item.title}</span>
                    </span>
                    <span
                      className={`grid text-sm transition-[grid-template-rows] duration-700 ease-cubic ${
                        i === step ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="max-w-xs overflow-hidden">
                        <span className="block pt-2">{item.text}</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pointer-events-auto col-span-6 mt-6 lg:absolute lg:bottom-10 lg:right-[var(--margin)] lg:mt-0">
              <p className="t-label mb-3 opacity-60 lg:text-right">Finish</p>
              <div className="flex flex-wrap gap-2">
                {finishes.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setFinish(i)}
                    aria-pressed={i === finish}
                    className={`flex items-center gap-2 border px-3 py-2 t-label transition-colors duration-500 ${
                      i === finish ? "border-current" : "border-current/20 hover:border-current/60"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full border border-current/30" style={{ background: item.floor }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
