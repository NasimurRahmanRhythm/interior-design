import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import RevealText from "@/components/RevealText";
import SplitTitle from "@/components/SplitTitle";
import Journey from "@/components/sections/Journey";
import ServiceWheel from "@/components/sections/ServiceWheel";
import Trust from "@/components/sections/Trust";
import { brand } from "@/lib/data";
import { about } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About — Integrity 360 Degree",
  description: about.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About" accent="Us" label={`Since 2010 · ${brand.tagline}`} text={about.lead} />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-14">
          <RevealText className="t-h3 col-span-6 lg:col-span-7 lg:col-start-2">{about.overview}</RevealText>
          <Parallax amount={14} className="col-span-4 col-start-3 lg:col-span-3 lg:col-start-10 lg:row-span-2">
            <div className="fit aspect-[3/4]">
              <Image src="/images/projects/nexus-room/1.jpg" alt="Nexus Room with the company values on the walls" fill sizes="(min-width:1024px) 25vw, 66vw" className="object-cover" />
            </div>
            <p className="t-label mt-3 opacity-60">Nexus Room — our values, built in</p>
          </Parallax>
          <div className="col-span-6 grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-2">
            <div>
              <p className="t-label mb-3 opacity-50">Mission</p>
              <RevealText className="text-sm leading-relaxed opacity-80">{about.mission}</RevealText>
            </div>
            <div>
              <p className="t-label mb-3 opacity-50">The name</p>
              <RevealText className="text-sm leading-relaxed opacity-80">{about.name}</RevealText>
              <RevealText className="mt-4 text-sm leading-relaxed opacity-80">{about.promise}</RevealText>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-28 text-center text-bone lg:py-40">
        <p className="t-label opacity-60">Belief</p>
        <h2 className="mt-6 px-[var(--margin)] font-display text-[clamp(2.6rem,10.5vw,10rem)] leading-[0.9] tracking-[-0.035em]">
          <SplitTitle text="Nothing is" />
          <br />
          <SplitTitle text="insignificant." className="font-serif italic text-[#c9a07f]" delay={0.1} />
        </h2>
        <RevealText className="mx-auto mt-10 max-w-md px-[var(--margin)] text-sm leading-relaxed opacity-70">
          We believe in first impression — that&rsquo;s why our clients are our real marketer.
        </RevealText>
      </section>

      <section data-theme="light" className="bg-[#ece4d6] py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-12">
          <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-12">
            <SplitTitle text="Why" className="t-lrg" />
            <SplitTitle text="us" className="t-lrg font-serif italic" delay={0.1} />
          </h2>
          {about.pillars.map((p) => (
            <div key={p.title} className="col-span-6 border-t border-ink/25 pt-6 lg:col-span-4">
              <h3 className="t-h3">{p.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-70">{p.text}</p>
            </div>
          ))}
          {about.why.map((w, i) => (
            <div key={w.title} className="col-span-3 lg:col-span-3">
              <p className="t-label opacity-50">0{i + 1}</p>
              <p className="t-h5 mt-2">{w.title}</p>
              <p className="mt-2 text-sm opacity-65">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-theme="dark" className="overflow-hidden bg-ink py-24 text-bone lg:py-36">
        <div className="grid-w">
          <div className="col-span-6 text-center lg:col-span-12">
            <p className="t-label opacity-60">One partner, every side of the project</p>
            <h2 className="mt-4 flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
              <SplitTitle text="The" className="t-lrg" />
              <SplitTitle text="360°" className="t-lrg font-serif italic" delay={0.08} />
              <SplitTitle text="wheel" className="t-lrg" delay={0.16} />
            </h2>
          </div>
          <div className="col-span-6 mt-14 lg:col-span-12">
            <ServiceWheel />
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-32">
        <div className="grid-w gap-y-10">
          <p className="t-label col-span-6 opacity-60 lg:col-span-3">Our values</p>
          <ul className="col-span-6 grid grid-cols-2 gap-y-6 lg:col-span-9 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <li key={v} className="font-display text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-[-0.03em]">
                <span className={i % 2 ? "font-serif italic" : ""}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Trust />
      <Journey />

      <section data-theme="dark" className="bg-ink py-24 text-bone lg:py-32">
        <div className="grid-w items-end gap-y-8">
          <h2 className="t-h1 col-span-6 lg:col-span-8">
            Let&rsquo;s talk about your <span className="italic">next project.</span>
          </h2>
          <div className="col-span-6 flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button href="/contact" big>
              Contact us
            </Button>
            <Button href="/projects" big>
              See projects
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
