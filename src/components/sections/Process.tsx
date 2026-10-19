"use client";

import { useRef } from "react";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Copy, Step } from "@/lib/db/types";

export default function Process({ steps, copy }: { steps: Step[]; copy: Copy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The line fills with the scroll and each step lights up as the line reaches it.
      const fill = root.current!.querySelector<HTMLElement>(".process-fill")!;
      const dots = gsap.utils.toArray<HTMLElement>(".process-dot");
      ScrollTrigger.create({
        trigger: ".process-line",
        start: "top 80%",
        end: "bottom 45%",
        onUpdate: (self) => {
          gsap.set(fill, { scaleX: self.progress });
          dots.forEach((dot, i) => dot.classList.toggle("is-on", self.progress >= i / (dots.length - 1) - 0.001));
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
      <div className="grid-w">
        <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-12">
          <SplitTitle text={copy.title[0]} className="t-lrg" />
          <SplitTitle text={copy.title[1]} className="t-lrg font-serif italic" delay={0.1} />
        </h2>

        <div className="process-line relative col-span-6 mt-14 lg:col-span-12 lg:mt-20">
          <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-ink/20 lg:block" />
          <span className="process-fill absolute left-0 right-0 top-[5px] hidden h-px origin-left scale-x-0 bg-umber lg:block" />
          <ol className="relative grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="process-dot block h-[11px] w-[11px] rounded-full border border-ink bg-bone transition-colors duration-500 [&.is-on]:border-umber [&.is-on]:bg-umber" />
                <p className="t-label mt-5 opacity-50">0{i + 1}</p>
                <p className="t-h5 mt-1">{step.title}</p>
                <p className="mt-2 text-sm opacity-60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
