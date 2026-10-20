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
import { mediaUrl } from "@/lib/db/media";
import { getContent, getCopy, getJourney, getSettings } from "@/lib/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [{ meta }, { about }] = await Promise.all([getCopy("about"), getContent()]);
  return { title: meta.title, description: about.lead };
}

export default async function AboutPage() {
  const [settings, copy, home, { about }, journey] = await Promise.all([
    getSettings(),
    getCopy("about"),
    getCopy("home"),
    getContent(),
    getJourney(),
  ]);

  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={copy.hero.label} text={about.lead} />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-14">
          <RevealText className="t-h3 col-span-6 lg:col-span-7 lg:col-start-2">{about.overview}</RevealText>
          <Parallax amount={14} className="col-span-4 col-start-3 lg:col-span-3 lg:col-start-10 lg:row-span-2">
            <div className="fit aspect-[3/4]">
              <Image src={mediaUrl(copy.intro.image)} alt={copy.intro.image_alt} fill sizes="(min-width:1024px) 25vw, 66vw" className="object-cover" />
            </div>
            <p className="t-label mt-3 opacity-60">{copy.intro.caption}</p>
          </Parallax>
          <div className="col-span-6 grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-2">
            <div>
              <p className="t-label mb-3 opacity-50">{copy.intro.mission_label}</p>
              <RevealText className="text-sm leading-relaxed opacity-80">{about.mission}</RevealText>
            </div>
            <div>
              <p className="t-label mb-3 opacity-50">{copy.intro.name_label}</p>
              <RevealText className="text-sm leading-relaxed opacity-80">{about.name}</RevealText>
              <RevealText className="mt-4 text-sm leading-relaxed opacity-80">{about.promise}</RevealText>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-28 text-center text-bone lg:py-40">
        <p className="t-label opacity-60">{copy.belief.eyebrow}</p>
        <h2 className="mt-6 px-[var(--margin)] font-display text-[clamp(2.6rem,10.5vw,10rem)] leading-[0.9] tracking-[-0.035em]">
          <SplitTitle text={copy.belief.title[0]} />
          <br />
          <SplitTitle text={copy.belief.title[1]} className="font-serif italic text-[#c9a07f]" delay={0.1} />
        </h2>
        <RevealText className="mx-auto mt-10 max-w-md px-[var(--margin)] text-sm leading-relaxed opacity-70">
          {copy.belief.text}
        </RevealText>
      </section>

      <section data-theme="light" className="bg-[#ece4d6] py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-12">
          <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-12">
            <SplitTitle text={copy.why.title[0]} className="t-lrg" />
            <SplitTitle text={copy.why.title[1]} className="t-lrg font-serif italic" delay={0.1} />
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
            <p className="t-label opacity-60">{copy.wheel.eyebrow}</p>
            <h2 className="mt-4 flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
              <SplitTitle text={copy.wheel.title[0]} className="t-lrg" />
              <SplitTitle text={copy.wheel.title[1]} className="t-lrg font-serif italic" delay={0.08} />
              <SplitTitle text={copy.wheel.title[2]} className="t-lrg" delay={0.16} />
            </h2>
          </div>
          <div className="col-span-6 mt-14 lg:col-span-12">
            <ServiceWheel wheel={about.wheel} />
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-32">
        <div className="grid-w gap-y-10">
          <p className="t-label col-span-6 opacity-60 lg:col-span-3">{copy.values.eyebrow}</p>
          <ul className="col-span-6 grid grid-cols-2 gap-y-6 lg:col-span-9 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <li key={v} className="font-display text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-[-0.03em]">
                <span className={i % 2 ? "font-serif italic" : ""}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Trust trust={settings.trust} copy={home.trust} />
      <Journey journey={journey} copy={home.journey} />

      <section data-theme="dark" className="bg-ink py-24 text-bone lg:py-32">
        <div className="grid-w items-end gap-y-8">
          <h2 className="t-h1 col-span-6 lg:col-span-8">
            {copy.cta.title[0]} <span className="italic">{copy.cta.title[1]}</span>
          </h2>
          <div className="col-span-6 flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {copy.cta.buttons.map((b: { label: string; href: string }) => (
              <Button key={b.href} href={b.href} big>
                {b.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
