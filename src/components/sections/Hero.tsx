"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "../Button";
import SplitTitle from "../SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

const StoneScene = dynamic(() => import("../three/StoneScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      const scroll = { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true };

      ScrollTrigger.create({ ...scroll, onUpdate: (self) => (progress.current = self.progress) });

      // The three words drift apart while the stone grows between them.
      gsap.to(".hero-l1", { xPercent: -18, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l2", { xPercent: 14, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l3", { xPercent: -10, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-meta", { opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: "40% bottom" } });
      gsap.fromTo(".hero-fig-a", { yPercent: 240 }, { yPercent: -20, ease: "none", scrollTrigger: scroll });
      gsap.fromTo(".hero-fig-b", { yPercent: 160 }, { yPercent: -60, ease: "none", scrollTrigger: scroll });

      const intro = gsap.from(".hero-in", {
        y: 28,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.5,
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
          style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(123,81,54,0.28), transparent 62%)" }}
        />

        <h1 className="absolute inset-0 px-[var(--margin)]">
          <span className="hero-l1 absolute left-[var(--margin)] top-[13svh] block lg:top-[11svh]">
            <SplitTitle text="Rooms" className="t-lrg" when="ready" />
          </span>
          <span className="hero-l2 absolute right-[var(--margin)] top-1/2 block -translate-y-1/2">
            <SplitTitle text="Shaped" className="t-lrg" when="ready" delay={0.12} />
          </span>
          <span className="hero-l3 absolute bottom-[19svh] left-[var(--margin)] block lg:bottom-[5svh] lg:left-[16vw]">
            <SplitTitle text="Quietly" className="t-lrg" when="ready" delay={0.24} />
          </span>
        </h1>

        <StoneScene progress={progress} className="pointer-events-none absolute inset-0" />

        <div className="hero-fig-a fit absolute left-[var(--margin)] top-[58%] hidden aspect-[3/4] w-[11vw] lg:block">
          <Image src="/images/misc/pendant.jpg" alt="Brass pendant lamps" fill sizes="12vw" loading="eager" className="object-cover" />
        </div>
        <div className="hero-fig-b fit absolute right-[18vw] top-[70%] hidden aspect-[4/3] w-[15vw] lg:block">
          <Image src="/images/misc/sofa.jpg" alt="Linen sofa with a wool throw" fill sizes="16vw" className="object-cover" />
        </div>

        <div className="hero-meta absolute inset-0">
          <p className="hero-in t-label absolute right-[var(--margin)] top-[15svh] text-right lg:right-[26vw] lg:top-[18svh] lg:text-left">
            Coordinates
            <br />
            Withheld
          </p>
          <p className="hero-in t-label absolute left-[var(--margin)] top-[39svh] lg:left-[calc(var(--margin)+25vw)] lg:top-[47svh]">
            A Private Atelier
            <br />
            for Interiors
          </p>
          <div className="hero-in absolute bottom-[4svh] left-[var(--margin)] right-[var(--margin)] flex items-end justify-between gap-6 lg:left-auto lg:justify-end">
            <span className="flex flex-col text-sm leading-tight lg:text-right">
              <span>Commitment</span>
              <span>Precedes</span>
              <span>Entry /</span>
            </span>
            <Button href="/#admission" big>
              Seek Admission
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
