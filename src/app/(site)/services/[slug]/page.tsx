import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import RevealText from "@/components/RevealText";
import SplitTitle from "@/components/SplitTitle";
import Contact from "@/components/sections/Contact";
import Process from "@/components/sections/Process";
import DivisionScene from "@/components/three/DivisionScene";
import { fill } from "@/lib/db/fill";
import { finishes, processSteps } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { getDivisions, getProjects, getQuote, getSettings } from "@/lib/db/queries";

type Params = { params: Promise<{ slug: string }> };

const HERO_ART = "absolute inset-x-0 top-[12svh] h-[46svh] lg:inset-y-0 lg:left-[46%] lg:right-0 lg:top-0 lg:h-auto";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [divisions, settings] = await Promise.all([getDivisions(), getSettings()]);
  const page = divisions.find((d) => d.id === slug);
  return page ? { title: `${page.name} — ${settings.brand.name}`, description: page.intro } : {};
}

export default async function DivisionPage({ params }: Params) {
  const { slug } = await params;
  const copy = COPY.division;
  const home = COPY.home;
  const [settings, quote, divisions, projects] = await Promise.all([getSettings(), getQuote(), getDivisions(), getProjects()]);
  const index = divisions.findIndex((d) => d.id === slug);
  if (index < 0) notFound();
  const page = divisions[index];
  const text = copy.page;

  const all = projects.filter((p) => p.division === page.id);
  const work = [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(0, 6);
  const others = divisions.filter((d) => d.id !== page.id);

  return (
    <>
      <section data-theme="dark" className="relative overflow-hidden bg-ink text-bone">
        <div className="grain relative min-h-svh">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,81,54,0.24), transparent 60%)" }}
          />
          {page.scene ? (
            <DivisionScene kind={page.scene} finish={finishes[0]} className={HERO_ART} />
          ) : (
            page.card.image && (
              <div className={`${HERO_ART} lg:my-[14svh] lg:mr-[var(--margin)]`}>
                <Image src={page.card.image} alt="" fill priority sizes="(min-width:1024px) 54vw, 100vw" className="object-cover opacity-85" />
              </div>
            )
          )}

          <div className="grid-w pointer-events-none relative min-h-svh content-end pb-10 pt-[62svh] lg:content-center lg:pb-0 lg:pt-28">
            <div className="pointer-events-auto col-span-6 lg:col-span-5">
              <p className="t-label mb-4 opacity-60">
                {fill(page.scene ? text.eyebrow : text.eyebrow_photo, { number: page.number })}
              </p>
              <h1 className="flex flex-col font-display text-[clamp(3.2rem,6.6vw,7rem)] leading-[0.9] tracking-[-0.035em]">
                <SplitTitle text={page.title[0]} when="ready" />
                {page.title[1] && <SplitTitle text={page.title[1]} className="ml-[0.4em] font-serif italic text-[#c9a07f]" when="ready" delay={0.1} />}
              </h1>
              {page.line && <p className="t-h5 mt-8 max-w-md italic">{page.line}</p>}
              <RevealText className="mt-4 max-w-md text-sm leading-relaxed opacity-75">{page.intro}</RevealText>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#contact" big>
                  {text.cta}
                </Button>
                <Button href={`/projects?division=${page.id}`} big>
                  {text.projects_cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {page.figures.length > 0 && (
        <section data-theme="light" className="bg-bone pb-20 pt-16 text-ink lg:pb-28 lg:pt-24">
          <ul className="grid-w gap-y-10">
            {page.figures.map((f) => (
              <li key={f.label} className="col-span-3 border-l border-ink/15 pl-4 lg:col-span-3 lg:pl-6">
                <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.04em]">{f.value}</p>
                <p className="t-label mt-3 max-w-[14rem] opacity-60">{f.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(page.groups.length > 0 || page.extra) && (
        <section data-theme="light" className="bg-[#ece4d6] py-24 text-ink lg:py-36">
          <div className="grid-w gap-y-14">
            <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-12">
              <SplitTitle text={text.what_title[0]} className="t-lrg" />
              <SplitTitle text={text.what_title[1]} className="t-lrg font-serif italic" delay={0.1} />
            </h2>
            {page.groups.map((g, i) => (
              <div key={g.title} className="col-span-6 border-t border-ink/20 pt-6 sm:col-span-3 lg:col-span-4">
                <p className="t-label opacity-50">0{i + 1}</p>
                <h3 className="t-h3 mt-2">{g.title}</h3>
                <ul className="mt-5 flex flex-col gap-1.5 text-sm">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 opacity-80">
                      <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-umber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {page.extra && (
              <div className="col-span-6 border-t border-ink/20 pt-6 lg:col-span-12">
                <h3 className="t-h3">{page.extra.title}</h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {page.extra.items.map((item) => (
                    <li key={item} className="t-label border border-ink/25 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {all.length > 0 && (
        <section data-theme="dark" className="bg-ink py-24 text-bone lg:py-36">
          <div className="grid-w items-end gap-y-6">
            <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-9">
              <SplitTitle text={text.projects_title[0]} className="t-lrg" />
              <SplitTitle text={text.projects_title[1]} className="t-lrg font-serif italic" delay={0.1} />
            </h2>
            <div className="col-span-6 lg:col-span-3 lg:justify-self-end">
              <Button href={`/projects?division=${page.id}`}>{fill(text.all_projects, { count: all.length })}</Button>
            </div>
          </div>
          <div className="grid-w mt-14 gap-y-14 lg:mt-20">
            {work.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                className={`col-span-6 sm:col-span-3 lg:col-span-4 ${i % 3 === 1 ? "lg:mt-16" : ""}`}
                sizes="(min-width:1024px) 31vw, (min-width:640px) 48vw, 92vw"
              />
            ))}
          </div>
        </section>
      )}

      <Process steps={processSteps} copy={home.process} />

      <section data-theme="light" className="bg-[#ece4d6] py-16 text-ink">
        <div className="grid-w items-center gap-y-6">
          <p className="t-label col-span-6 opacity-60 lg:col-span-3">{text.others}</p>
          <ul className="col-span-6 flex flex-col gap-2 lg:col-span-9 lg:flex-row lg:justify-end lg:gap-[var(--gap)]">
            {others.map((d) => (
              <li key={d.id}>
                <Button href={`/services/${d.id}`}>{d.name}</Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact contact={settings.contact} quote={quote} copy={home.contact} division={page.card.title} />
    </>
  );
}
