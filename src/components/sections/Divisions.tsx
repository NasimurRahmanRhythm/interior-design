"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Button from "../Button";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { divisions } from "@/lib/data";

const STEP = 360 / divisions.length;

export default function Divisions() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = ring.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>(".div-card", el);
      // Scroll turns the ring through every division; a drag adds its own turn on top.
      const turn = { scroll: 0, drag: 0, shown: 0 };

      const render = () => {
        const angle = turn.scroll + turn.drag;
        turn.shown += (angle - turn.shown) * 0.12;
        gsap.set(el, { rotationY: -turn.shown });
        cards.forEach((card, i) => {
          // Cards fade as they turn away from the viewer.
          const rel = (((i * STEP - turn.shown) % 360) + 540) % 360 - 180;
          const facing = Math.cos((rel * Math.PI) / 180);
          card.style.opacity = String(0.25 + Math.max(0, facing) * 0.75);
        });
        const front = ((Math.round(turn.shown / STEP) % divisions.length) + divisions.length) % divisions.length;
        setActive(front);
      };
      gsap.ticker.add(render);

      ScrollTrigger.create({
        trigger: ".div-track",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (turn.scroll = self.progress * STEP * (divisions.length - 1)),
      });

      let drag: { id: number; x: number } | null = null;
      const stage = el.parentElement!;
      const down = (e: PointerEvent) => {
        drag = { id: e.pointerId, x: e.clientX };
        stage.setPointerCapture(e.pointerId);
        stage.style.cursor = "grabbing";
      };
      const move = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        turn.drag -= (e.clientX - drag.x) * 0.25;
        drag.x = e.clientX;
      };
      const up = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        drag = null;
        stage.style.cursor = "grab";
        // Settle on the nearest card.
        const angle = turn.scroll + turn.drag;
        gsap.to(turn, { drag: turn.drag + (Math.round(angle / STEP) * STEP - angle), duration: 0.6, ease: "power3.out" });
      };
      stage.addEventListener("pointerdown", down);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);

      return () => {
        gsap.ticker.remove(render);
        stage.removeEventListener("pointerdown", down);
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerup", up);
        stage.removeEventListener("pointercancel", up);
      };
    },
    { scope: root }
  );

  const current = divisions[active];

  return (
    <section ref={root} id="services" data-theme="dark" className="relative bg-ink text-bone">
      <div className="div-track relative h-[340vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24 lg:pt-28">
          <div className="px-[var(--margin)] text-center">
            <p className="t-label opacity-60">Four divisions · One partner</p>
            <h2 className="mt-3 flex flex-wrap items-baseline justify-center gap-x-[0.25em] font-display text-[clamp(2.6rem,6.4vw,6.5rem)] leading-[0.9] tracking-[-0.035em]">
              <SplitTitle text="A full" />
              <SplitTitle text="360°" className="font-serif italic" delay={0.08} />
              <SplitTitle text="of service" delay={0.16} />
            </h2>
          </div>

          <div
            className="relative flex flex-1 cursor-grab touch-pan-y items-center justify-center select-none"
            style={{ perspective: "1800px" }}
          >
            <div ref={ring} className="relative h-[40svh] w-[min(54vw,300px)] lg:h-[44svh] lg:w-[22vw]" style={{ transformStyle: "preserve-3d" }}>
              {divisions.map((item, i) => (
                <article
                  key={item.id}
                  className="div-card absolute inset-0 flex flex-col border border-bone/10 bg-stone shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
                  style={{ transform: `rotateY(${i * STEP}deg) translateZ(calc(min(54vw, 300px) * 0.85))` }}
                >
                  <div className="fit min-h-0 flex-1">
                    <Image src={item.image} alt="" fill sizes="(min-width:1024px) 22vw, 54vw" className="object-cover" draggable={false} />
                  </div>
                  <div className="p-4 lg:p-5">
                    <p className="t-label opacity-50">0{i + 1}</p>
                    <h3 className="t-h5 mt-1">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed opacity-60">{item.short}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid-w items-end pb-8 pt-6 lg:pt-10">
            <div className="col-span-6 min-h-[4.5rem] lg:col-span-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={current.id}
                  className="flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-80"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  {current.services.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-umber" />
                      {s}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
            <div className="col-span-6 mt-5 flex items-center justify-between gap-4 pr-16 lg:col-span-4 lg:mt-0 lg:justify-end lg:pr-20">
              <p className="t-label opacity-60 lg:hidden">Drag or scroll to turn</p>
              <div className="flex gap-2">
                <Button href={`/services/${current.id}`}>Explore</Button>
                <Button href="#contact">Discuss a project</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
