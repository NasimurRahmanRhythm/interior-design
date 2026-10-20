import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import SplitTitle from "@/components/SplitTitle";
import Clients from "@/components/sections/Clients";
import { fill } from "@/lib/db/fill";
import { COPY } from "@/lib/copy";
import { getClientGroups, getMarquee, getProjects } from "@/lib/db/queries";
import type { Project } from "@/lib/db/types";

export const metadata: Metadata = { title: COPY.clients.meta.title, description: COPY.clients.meta.description };

export default async function ClientsPage() {
  const copy = COPY.clients;
  const home = COPY.home;
  const [groups, marquee, projects] = await Promise.all([
    getClientGroups(),
    getMarquee(),
    getProjects(),
  ]);
  const total = groups.reduce((n, g) => n + g.names.length, 0);
  // Programmes run for the same client more than once.
  const repeat = copy.repeat.projects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <>
      <PageHero
        title={copy.hero.title}
        accent={copy.hero.accent}
        label={fill(copy.hero.label, { count: total })}
        text={copy.hero.text}
      />

      <Clients rows={marquee} copy={home.clients} />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-14">
          {groups.map((g) => (
            <div key={g.title} className="col-span-6 border-t border-ink/20 pt-6 sm:col-span-3 lg:col-span-4">
              <h2 className="t-h3">{g.title}</h2>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {g.names.map((n) => (
                  <li key={n} className="opacity-80">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="t-label col-span-6 opacity-50 lg:col-span-12">{copy.list.note}</p>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-24 text-bone lg:py-36">
        <div className="grid-w items-end gap-y-6">
          <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-9">
            <SplitTitle text={copy.repeat.title[0]} className="t-lrg" />
            <SplitTitle text={copy.repeat.title[1]} className="t-lrg font-serif italic" delay={0.1} />
          </h2>
          <p className="col-span-6 text-sm opacity-70 lg:col-span-3">{copy.repeat.text}</p>
        </div>
        <div className="grid-w mt-14 gap-y-14">
          {repeat.map((p) => (
            <ProjectCard key={p.slug} project={p} className="col-span-6 sm:col-span-3 lg:col-span-4" sizes="(min-width:1024px) 31vw, 92vw" />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Button href={copy.repeat.cta.href} big>
            {copy.repeat.cta.label}
          </Button>
        </div>
      </section>
    </>
  );
}
