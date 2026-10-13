"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { trust } from "@/lib/data";

export default function Trust() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Each figure counts up from zero the first time it scrolls into view.
      gsap.utils.toArray<HTMLElement>(".trust-n").forEach((el) => {
        const target = Number(el.dataset.value);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="light" className="bg-bone pb-20 pt-16 text-ink lg:pb-28 lg:pt-24">
      <div className="grid-w">
        <p className="t-label col-span-6 mb-8 opacity-60 lg:col-span-12 lg:mb-12">Proof, not promises</p>
        <ul className="col-span-6 grid grid-cols-2 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-3 lg:col-span-12 lg:grid-cols-5">
          {trust.map((item) => (
            <li key={item.label} className="border-l border-ink/15 pl-4 lg:pl-6">
              <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.04em]">
                <span className="trust-n tabular-nums" data-value={item.value}>
                  {item.value}
                </span>
                <span className="text-umber">{item.suffix}</span>
              </p>
              <p className="t-label mt-3 opacity-60">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
