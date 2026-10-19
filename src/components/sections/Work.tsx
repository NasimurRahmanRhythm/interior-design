"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import SplitTitle from "../SplitTitle";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Copy, Project } from "@/lib/db/types";

export default function Work({ work, copy }: { work: Project[]; copy: Copy }) {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = strip.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { x: () => window.innerWidth * 0.1 },
        {
          x: () => -(el.scrollWidth - window.innerWidth * 0.9),
          ease: "none",
          scrollTrigger: { trigger: ".work-track", start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
        }
      );

      // Cards bend around an imaginary cylinder: the further from the centre, the more they turn away.
      const cards = gsap.utils.toArray<HTMLElement>(".work-card", el);
      const bend = () => {
        const mid = window.innerWidth / 2;
        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          const n = gsap.utils.clamp(-1.4, 1.4, (r.left + r.width / 2 - mid) / mid);
          gsap.set(card, { rotationY: -n * 22, z: -Math.abs(n) * 140, transformPerspective: 1400 });
        });
      };
      gsap.ticker.add(bend);
      return () => gsap.ticker.remove(bend);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" data-theme="dark" className="relative bg-ink text-bone">
      <div className="work-track relative h-[420vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24 lg:pt-28">
          <div className="grid-w relative z-10 items-end">
            <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] font-display text-[clamp(3.4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] lg:col-span-9">
              <SplitTitle text={copy.title[0]} />
              <SplitTitle text={copy.title[1]} className="font-serif italic" delay={0.1} />
            </h2>
            <div className="col-span-6 mt-4 lg:col-span-3 lg:mt-0 lg:justify-self-end">
              <Button href={copy.cta.href}>{copy.cta.label}</Button>
            </div>
          </div>

          <div ref={strip} className="relative mt-10 flex w-max items-start gap-[3vw] will-change-transform lg:mt-8">
            {work.filter((item) => item.images.length).map((item, i) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className={`work-card group block w-[62vw] shrink-0 sm:w-[38vw] lg:w-[21vw] ${i % 2 ? "mt-[5svh]" : ""}`}
              >
                <div className="fit aspect-[4/5] bg-stone shadow-[0_30px_50px_rgba(0,0,0,0.35)]">
                  <Image
                    src={item.images[0].src}
                    alt={`${item.title}${item.client ? `, ${item.client}` : ""}`}
                    fill
                    sizes="(min-width:1024px) 21vw, 62vw"
                    className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-105"
                  />
                </div>
                <p className="t-label mt-4 opacity-55">
                  {item.category}
                  {item.year ? ` · ${item.year}` : ""}
                  {item.client ? ` — ${item.client}` : ""}
                </p>
                <p className="t-h5 mt-1">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
