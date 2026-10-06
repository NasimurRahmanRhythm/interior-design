"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { objects } from "@/lib/data";

export default function Objects() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const scrollTrigger = { trigger: ".objects-track", start: "top top", end: "bottom bottom", scrub: true };

      gsap.to(".mover-l", { xPercent: -45, ease: "none", scrollTrigger });
      gsap.to(".mover-r", { xPercent: 45, ease: "none", scrollTrigger });

      // The objects pass through the gap between the two words.
      gsap.fromTo(
        strip.current,
        { x: () => window.innerWidth },
        {
          x: () => -(strip.current?.scrollWidth ?? 0),
          ease: "none",
          scrollTrigger: { ...scrollTrigger, invalidateOnRefresh: true },
        }
      );

      ScrollTrigger.create({
        ...scrollTrigger,
        scrub: false,
        onUpdate: (self) => setActive(Math.min(objects.length - 1, Math.floor(self.progress * objects.length))),
      });
    },
    { scope: root }
  );

  const current = objects[active];

  return (
    <section ref={root} data-theme="dark" className="relative bg-ink text-bone">
      <div className="objects-track relative h-[340vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="mover-l block">
              <SplitTitle text="Origin" className="t-lrg" />
            </span>
            <span className="mover-r block">
              <SplitTitle text="Objects" className="t-lrg text-umber" delay={0.1} />
            </span>
          </div>

          <div ref={strip} className="relative flex w-max items-center gap-[6vw] will-change-transform">
            {objects.map((object, i) => (
              <figure key={object.id} className={`w-[58vw] shrink-0 sm:w-[34vw] lg:w-[21vw] ${i % 2 ? "mt-[14vh]" : "-mt-[8vh]"}`}>
                <div className="fit aspect-[3/4] bg-stone">
                  <Image src={object.image} alt={object.name} fill sizes="(min-width:1024px) 21vw, 58vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="t-h5">
                    ({object.numeral}) {object.name}
                  </span>
                  <span className="t-label shrink-0 opacity-50">{object.edition}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="grid-w absolute inset-x-0 bottom-0 items-end pb-8">
            <p className="t-label col-span-4 opacity-70 lg:col-span-3">
              Formed in — {current.origin}
              <br />
              {current.material}
            </p>
            <span className="t-h5 col-span-2 justify-self-end tabular-nums lg:col-span-2 lg:col-start-11" aria-live="polite">
              {active + 1}
              <span className="opacity-50">/{objects.length}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid-w gap-y-8 pb-28 pt-10 lg:pb-40">
        <RevealText className="t-caps col-span-6 lg:col-span-3 lg:col-start-2">
          These objects are formed within the rooms themselves.
        </RevealText>
        <RevealText className="t-caps col-span-6 lg:col-span-3 lg:col-start-6" delay={0.1}>
          Each originates on site, shaped by material, process, and circumstance.
        </RevealText>
        <div className="col-span-6 lg:col-span-2 lg:col-start-10">
          <RevealText className="text-sm opacity-70" delay={0.2}>
            Once completed, they leave their point of origin and circulate independently.
          </RevealText>
          <Button href="/objects" big className="mt-8">
            Explore Objects
          </Button>
        </div>
      </div>
    </section>
  );
}
