"use client";

import { useState } from "react";
import Image from "next/image";
import SplitTitle from "../SplitTitle";
import type { Appreciation as Item, Copy } from "@/lib/db/types";

// What clients say: a row of cards that scrolls sideways; long notes open in place.
export default function Appreciation({ items, copy }: { items: Item[]; copy: Copy }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="appreciation" data-theme="light" className="overflow-hidden bg-[#ece4d6] py-24 text-ink lg:py-36">
      <div className="grid-w">
        <div className="col-span-6 lg:col-span-12">
          <p className="t-eyebrow mb-4 opacity-60">{copy.eyebrow}</p>
          <h2 className="t-h1">
            <SplitTitle text={copy.title[0]} />
            <SplitTitle text={copy.title[1]} className="text-umber" delay={0.1} />
          </h2>
        </div>
      </div>

      <ul
        data-lenis-prevent-horizontal
        className="mt-12 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-[var(--margin)] pb-4 lg:mt-16 lg:gap-6 [scrollbar-width:thin]"
      >
        {items.map((a) => {
          const expanded = open === a.id;
          return (
            <li key={a.id} className="w-[82vw] shrink-0 snap-start bg-bone sm:w-[22rem] lg:w-[26rem]">
              {a.image && (
                <div className="relative aspect-[16/10] bg-white">
                  <Image src={a.image} alt="" fill sizes="(min-width:1024px) 26rem, 82vw" className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="t-h5">{a.title}</h3>
                <div
                  className={`rich-text relative mt-3 overflow-hidden text-sm opacity-80 ${expanded ? "" : "max-h-40"}`}
                  dangerouslySetInnerHTML={{ __html: a.body }}
                />
                <button type="button" onClick={() => setOpen(expanded ? null : a.id)} className="t-label link-u mt-4 cursor-pointer">
                  {expanded ? copy.less : copy.more}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
