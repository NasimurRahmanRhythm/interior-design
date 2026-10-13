import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import SplitTitle from "@/components/SplitTitle";
import Clients from "@/components/sections/Clients";
import { clientGroups } from "@/lib/pages";
import { getProject, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Clients — Integrity 360 Degree",
  description: "Banks, pharma, FMCG, telecom, automotive, development agencies and universities we have worked with since 2010.",
};

// Programmes run for the same client more than once.
const repeat = ["big-bangla-run-2015", "shahjalal-branch-openings", "national-premix-summit"]
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));

export default function ClientsPage() {
  const total = clientGroups.reduce((n, g) => n + g.names.length, 0);
  return (
    <>
      <PageHero
        title="Clients"
        accent="& partners"
        label={`${total}+ names from our profiles`}
        text="Multinationals, banks, pharma, telecom and development partners — many of them for more than one programme."
      />

      <Clients />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-14">
          {clientGroups.map((g) => (
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
          <p className="t-label col-span-6 opacity-50 lg:col-span-12">Logos are shown only with each client&rsquo;s permission.</p>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-24 text-bone lg:py-36">
        <div className="grid-w items-end gap-y-6">
          <h2 className="col-span-6 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-9">
            <SplitTitle text="Clients who" className="t-lrg" />
            <SplitTitle text="came back" className="t-lrg font-serif italic" delay={0.1} />
          </h2>
          <p className="col-span-6 text-sm opacity-70 lg:col-span-3">
            Novo Nordisk trusted us with marathons, summits, roadshows and their PR; Shahjalal Islami Bank with AGMs, conferences and 23 branch openings.
          </p>
        </div>
        <div className="grid-w mt-14 gap-y-14">
          {repeat.map((p) => (
            <ProjectCard key={p.slug} project={p} className="col-span-6 sm:col-span-3 lg:col-span-4" sizes="(min-width:1024px) 31vw, 92vw" />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Button href="/projects" big>
            All projects
          </Button>
        </div>
      </section>
    </>
  );
}
