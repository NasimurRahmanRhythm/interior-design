"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Parallax from "../Parallax";
import SplitTitle from "../SplitTitle";
import { updates } from "@/lib/data";

const EASE = [0.69, 0, 0, 1] as const;
const wrap = (i: number) => (i + updates.length) % updates.length;

function Slide({ index, sizes }: { index: number; sizes: string }) {
  const item = updates[index];
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={index}
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0% 0% 0%)", zIndex: 2 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", zIndex: 2 }}
        exit={{ scale: 1.1, zIndex: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Image src={item.image} alt={item.title} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Updates() {
  const [index, setIndex] = useState(1);
  const item = updates[index];

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-stone py-28 text-bone lg:py-40">
      <div className="grid-w items-end">
        <div className="col-span-6 lg:col-span-8">
          <SplitTitle text="Updates" className="t-lrg" />
        </div>
        <Parallax amount={40} className="col-span-6 mt-4 lg:col-span-2 lg:col-start-11 lg:mt-0">
          <span className="t-h5 italic">Now Forming</span>
        </Parallax>
      </div>

      <div className="grid-w mt-16 items-center lg:mt-24">
        <button
          type="button"
          onClick={() => setIndex(wrap(index - 1))}
          aria-label="Previous update"
          className="fit group col-span-1 aspect-[3/4] opacity-50 transition-opacity duration-700 hover:opacity-100 lg:col-span-2 lg:col-start-2"
        >
          <Slide index={wrap(index - 1)} sizes="17vw" />
        </button>

        <div className="fit col-span-4 aspect-[4/5] lg:col-span-4 lg:col-start-5">
          <Slide index={index} sizes="(min-width:1024px) 34vw, 66vw" />
        </div>

        <button
          type="button"
          onClick={() => setIndex(wrap(index + 1))}
          aria-label="Next update"
          className="fit group col-span-1 aspect-[3/4] opacity-50 transition-opacity duration-700 hover:opacity-100 lg:col-span-2 lg:col-start-10"
        >
          <Slide index={wrap(index + 1)} sizes="17vw" />
        </button>
      </div>

      <div className="mt-10 flex flex-col items-center gap-6 px-[var(--margin)] text-center">
        <div className="h-[4.6rem] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.75, 0.35, 1] }}
            >
              <p className="t-label mb-2 text-sage">{item.kind}</p>
              <p className="t-h3">{item.title}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <ol className="flex gap-1" aria-label="Choose update">
          {updates.map((entry, i) => (
            <li key={entry.title}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                aria-label={`Update ${i + 1}`}
                className={`h-9 w-9 border t-label tabular-nums transition-colors duration-500 ${
                  i === index ? "border-bone bg-bone text-ink" : "border-bone/20 hover:border-bone/70"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
