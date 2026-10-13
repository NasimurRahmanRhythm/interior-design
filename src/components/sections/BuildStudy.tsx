"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { builds, finishes, type BuildKind } from "@/lib/data";

const RoomScene = dynamic(() => import("../three/RoomScene"), { ssr: false });
const StallScene = dynamic(() => import("../three/StallScene"), { ssr: false });
const StageScene = dynamic(() => import("../three/StageScene"), { ssr: false });

// Scroll thresholds at which each step of a scene begins.
const STEP_STARTS: Record<BuildKind, number[]> = {
  stall: [0, 0.26, 0.5, 0.75],
  office: [0, 0.26, 0.43, 0.75],
  stage: [0, 0.26, 0.5, 0.75],
};

const SCENE_CLASS = "absolute inset-x-0 top-[9svh] h-[50svh] lg:inset-y-0 lg:left-[34%] lg:right-0 lg:top-0 lg:h-auto";

export default function BuildStudy({ initial = "stall" }: { initial?: BuildKind }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [kind, setKind] = useState<BuildKind>(initial);
  const [step, setStep] = useState(0);
  const [night, setNight] = useState(false);
  const starts = useRef(STEP_STARTS[initial]);
  const build = builds.find((b) => b.id === kind)!;

  const choose = (next: BuildKind) => {
    starts.current = STEP_STARTS[next];
    setKind(next);
    setStep(STEP_STARTS[next].reduce((acc, start, i) => (progress.current >= start ? i : acc), 0));
  };

  useGSAP(
    () => {
      const trigger = ".build-track";

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current = self.progress;
          setStep(starts.current.reduce((acc, start, i) => (self.progress >= start ? i : acc), 0));
          setNight(self.progress > 0.9);
        },
      });

      gsap.to(".build-bar", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: true },
      });

      // Daylight fades at the end of the scroll and the section follows it.
      gsap.fromTo(
        ".build-stage",
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
      <div className="build-track relative h-[460vh]">
        <div className="build-stage sticky top-0 h-svh overflow-hidden bg-bone text-ink">
          {kind === "stall" && <StallScene progress={progress} className={SCENE_CLASS} />}
          {kind === "office" && <RoomScene progress={progress} finish={finishes[0]} className={SCENE_CLASS} />}
          {kind === "stage" && <StageScene progress={progress} className={SCENE_CLASS} />}

          <div className="grid-w pointer-events-none absolute inset-0 content-end pb-8 lg:content-center lg:pb-0">
            <div className="pointer-events-auto col-span-6 lg:col-span-4">
              <p className="t-label mb-4 opacity-60">3D Study — Scroll to build, drag to rotate</p>
              <h2 className="t-h1">
                {build.title[0]}
                <br />
                <span className="ml-[0.8em] italic">{build.title[1]}</span>
              </h2>

              <ol className="relative mt-6 flex flex-col gap-3 pl-6 lg:mt-12 lg:gap-6">
                <span className="absolute bottom-1 left-0 top-1 w-px bg-current opacity-15" />
                <span className="build-bar absolute bottom-1 left-0 top-1 w-px origin-top scale-y-0 bg-current" />
                {build.steps.map((item, i) => (
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

              <div className="mt-6 flex flex-wrap gap-2 lg:mt-10" role="tablist" aria-label="Choose what to build">
                {builds.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={item.id === kind}
                    onClick={() => choose(item.id)}
                    className={`border px-3 py-2 t-label transition-colors duration-500 ${
                      item.id === kind
                        ? "border-current bg-current [&>span]:text-[var(--bg)]"
                        : "border-current/25 hover:border-current/70"
                    }`}
                    data-tone={night ? "dark" : "light"}
                  >
                    <span>{item.label}</span>
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
