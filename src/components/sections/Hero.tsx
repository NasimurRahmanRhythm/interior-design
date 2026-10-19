"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Button from "../Button";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import type { Copy, Settings } from "@/lib/db/types";

const HeroPanels = dynamic(() => import("../three/HeroPanels"), { ssr: false });

const LINE = "block font-display text-[clamp(3.6rem,9.4vw,10rem)] leading-[0.86] tracking-[-0.04em]";

type Props = { belief: string; panels: Settings["heroPanels"]; copy: Copy };

export default function Hero({ belief, panels, copy }: Props) {
  const lines: string[] = copy.lines;
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      const scroll = { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true };

      ScrollTrigger.create({ ...scroll, onUpdate: (self) => (progress.current = self.progress) });

      // The four lines drift apart while the photos spread behind them.
      gsap.to(".hero-l1", { xPercent: -14, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l2", { xPercent: 10, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l3", { xPercent: -8, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l4", { xPercent: 12, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-meta", { opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: "40% bottom" } });

      const intro = gsap.from(".hero-in", {
        y: 28,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.6,
        paused: true,
      });
      return onReady(() => intro.play());
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="dark" className="relative h-[190vh] bg-ink">
      <div className="grain sticky top-0 h-svh overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,81,54,0.26), transparent 60%)" }}
        />

        <HeroPanels panels={panels} progress={progress} className="pointer-events-none absolute inset-0" />

        <h1 className="pointer-events-none absolute inset-x-0 bottom-[22svh] z-10 px-[var(--margin)] lg:bottom-auto lg:top-[22svh]">
          <span className="hero-l1 block">
            <SplitTitle text={lines[0]} className={LINE} when="ready" />
          </span>
          <span className="hero-l2 ml-[0.5em] block lg:ml-[1.1em]">
            <SplitTitle text={lines[1]} className={`${LINE} font-serif italic`} when="ready" delay={0.1} />
          </span>
          <span className="hero-l3 block">
            <SplitTitle text={lines[2]} className={LINE} when="ready" delay={0.2} />
          </span>
          <span className="hero-l4 ml-[0.6em] block">
            <SplitTitle text={lines[3]} className={LINE} when="ready" delay={0.3} />
          </span>
        </h1>

        <div className="hero-meta absolute inset-0 z-10">
          <div className="hero-in absolute bottom-[4svh] left-[var(--margin)] right-[var(--margin)] flex items-end justify-between gap-6">
            <div>
              <p className="t-label mb-1 opacity-50">{copy.belief_label}</p>
              <p className="t-h5 italic">{belief}.</p>
            </div>
            <p className="t-label hidden opacity-70 lg:block">{copy.hint}</p>
            <div className="flex items-end gap-6 pr-16 lg:pr-20">
              <p className="t-label hidden text-right opacity-70 sm:block">
                {copy.place[0]}
                <br />
                {copy.place[1]}
              </p>
              <Button href={copy.cta.href} big>
                {copy.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
