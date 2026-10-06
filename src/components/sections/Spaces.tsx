"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SplitTitle from "../SplitTitle";
import Parallax from "../Parallax";
import { gsap, useGSAP } from "@/lib/gsap";
import { spaces } from "@/lib/data";

const ReliefScene = dynamic(() => import("../three/ReliefScene"), { ssr: false });

const EASE = [0.69, 0, 0, 1] as const;

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export default function Spaces() {
  const root = useRef<HTMLElement>(null);
  const [[index, direction], setState] = useState<[number, number]>([3, 1]);
  const space = spaces[index];

  const go = (dir: number) => setState(([i]) => [(i + dir + spaces.length) % spaces.length, dir]);

  useGSAP(
    () => {
      const scrollTrigger = { trigger: ".spaces-track", start: "top top", end: "bottom bottom", scrub: true };
      // A small window opens until the room fills the viewport.
      gsap.fromTo(
        ".spaces-frame",
        { clipPath: "inset(24% 30% 24% 30%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { ...scrollTrigger, end: "70% bottom" } }
      );
      gsap.fromTo(".spaces-zoom", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger });
      gsap.fromTo(
        ".spaces-ui",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", scrollTrigger: { ...scrollTrigger, start: "45% bottom", end: "70% bottom" } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="dark" className="relative bg-ink text-bone">
      <div className="grid-w relative z-10 pb-10 pt-28 lg:pt-40">
        <div className="col-span-6 flex flex-col lg:col-span-9">
          <SplitTitle text="Explore" className="t-lrg" />
          <SplitTitle text="Spaces" className="t-lrg self-end text-umber lg:mr-[8vw]" delay={0.1} />
        </div>
        <Parallax amount={40} className="col-span-3 mt-10 lg:col-span-2 lg:col-start-11 lg:mt-6">
          <span className="t-h5 flex flex-col">
            <span>Not</span>
            <span className="ml-[1em]">Everything</span>
            <span>is Visible</span>
          </span>
        </Parallax>
      </div>

      <div className="spaces-track relative h-[300vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <ReliefScene className="absolute inset-0" />

          <div className="spaces-frame absolute inset-0" style={{ clipPath: "inset(24% 30% 24% 30%)" }}>
            <div className="spaces-zoom absolute inset-0">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={space.id}
                  custom={direction}
                  className="absolute inset-0"
                  variants={{
                    enter: (dir: number) => ({
                      clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
                      zIndex: 2,
                    }),
                    center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2 },
                    exit: { scale: 1.12, zIndex: 1 },
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1.1, ease: EASE }}
                >
                  <Image src={space.image} alt={`${space.name}, ${space.city}`} fill sizes="100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/30" />
          </div>

          <div className="spaces-ui grid-w absolute inset-x-0 bottom-0 items-end pb-8 opacity-0 lg:pb-10">
            <div className="col-span-6 lg:col-span-5">
              <p className="t-label mb-3 opacity-70">
                {space.type} — {space.city}, {space.year}
              </p>
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3
                    key={space.id}
                    className="t-h1"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.55, ease: [0.2, 0.75, 0.35, 1] }}
                  >
                    {space.name}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <p className="col-span-6 mt-4 max-w-sm text-sm opacity-80 lg:col-span-3 lg:col-start-7 lg:mt-0">{space.blurb}</p>
            <nav className="col-span-6 mt-6 flex items-center gap-3 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:justify-end" aria-label="Spaces">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous space"
                className="flex h-11 w-11 items-center justify-center border border-current transition-colors duration-500 hover:bg-bone hover:text-ink"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next space"
                className="flex h-11 w-11 items-center justify-center border border-current transition-colors duration-500 hover:bg-bone hover:text-ink"
              >
                <Arrow />
              </button>
              <span className="t-h5 ml-3 tabular-nums" aria-live="polite">
                {index + 1}
                <span className="opacity-50">/{spaces.length}</span>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
