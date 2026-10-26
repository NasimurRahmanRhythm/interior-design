"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Copy, Division } from "@/lib/db/types";

type Props = { text: string; services: Division[]; facebook?: string; copy: Copy };

// Who we are, with the services as a row of panels: the open one widens to show its
// photo and description (hover on desktop, tap on phones). The panels wipe up into
// place when the row scrolls into view.
export default function WhoWeAre({ text, services, facebook, copy }: Props) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      gsap.from(".who-panel", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".who-panels", start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [services] }
  );

  return (
    <section ref={root} id="who-we-are" data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
      <div className="grid-w gap-y-8">
        <div className="col-span-6 lg:col-span-7">
          <p className="t-label mb-4 opacity-60">{copy.eyebrow}</p>
          <h2 className="t-h1">
            <span className="block">
              <SplitTitle text={copy.title[0]} />
            </span>
            <span className="block">
              <SplitTitle text={copy.title[1]} className="text-umber" delay={0.1} />
            </span>
          </h2>
        </div>
        <RevealText className="col-span-6 max-w-md text-sm leading-relaxed opacity-75 lg:col-span-4 lg:col-start-9 lg:self-end">{text}</RevealText>
      </div>

      <div className="grid-w mt-14 lg:mt-20">
        <p className="t-label col-span-6 mb-4 opacity-60 lg:col-span-12">{copy.services_label}</p>
        <ul className="who-panels col-span-6 flex flex-col gap-2 lg:col-span-12 lg:h-[34rem] lg:flex-row">
          {services.map((s, i) => {
            const on = i === open;
            return (
              <li
                key={s.id}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
                className={`who-panel relative overflow-hidden bg-ink text-bone transition-[flex-grow,height] duration-700 ease-cubic lg:h-full ${
                  on ? "h-[26rem] lg:flex-[3.2]" : "h-20 lg:flex-1"
                }`}
              >
                {s.card.image && (
                  <Image
                    src={s.card.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className={`object-cover transition-[opacity,scale] duration-1000 ease-cubic ${on ? "scale-100 opacity-70" : "scale-110 opacity-25"}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={on}
                  className="relative flex h-20 w-full items-center gap-4 px-5 text-left lg:absolute lg:inset-x-0 lg:top-0 lg:h-auto lg:items-start lg:pt-6"
                >
                  <span className="t-label opacity-60">{s.number}</span>
                  <span className={`t-h5 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-80 lg:opacity-0"}`}>{s.card.title}</span>
                </button>
                {/* The closed panels on desktop show their name running up the side. */}
                <span
                  aria-hidden="true"
                  style={{ writingMode: "vertical-rl" }}
                  className={`t-h5 pointer-events-none absolute bottom-6 left-4 hidden rotate-180 whitespace-nowrap transition-opacity duration-500 lg:block ${
                    on ? "opacity-0" : "opacity-90"
                  }`}
                >
                  {s.card.title}
                </span>
                <div
                  className={`absolute inset-x-0 bottom-0 p-5 transition-[opacity,translate] duration-700 ease-cubic lg:p-8 ${
                    on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <p className="max-w-sm text-sm leading-relaxed opacity-85">{s.card.short}</p>
                  <Link href={`/services/${s.id}`} className="t-label link-u mt-4 inline-block" tabIndex={on ? 0 : -1}>
                    Explore →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        {facebook && (
          <div className="col-span-6 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-12">
            <p className="text-sm opacity-75">{copy.more}</p>
            <Button href={facebook} external big>
              {copy.more_link} ↗
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
