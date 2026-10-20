import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import ProjectBrowser from "@/components/sections/ProjectBrowser";
import { fill } from "@/lib/db/fill";
import { COPY } from "@/lib/copy";
import { getDivisions, getProjects, getQuote, getSettings } from "@/lib/db/queries";

export const metadata: Metadata = { title: COPY.projects.meta.title, description: COPY.projects.meta.description };

type Search = { division?: string; category?: string; page?: string };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { division, category, page } = await searchParams;
  const copy = COPY.projects;
  const [settings, quote, projects, divisions] = await Promise.all([getSettings(), getQuote(), getProjects(), getDivisions()]);
  const services = divisions.map((d) => ({ id: d.id, title: d.card.title }));

  return (
    <>
      <PageHero
        title={copy.hero.title}
        accent={copy.hero.accent}
        label={fill(copy.hero.label, { count: projects.length })}
        text={copy.hero.text}
      />
      <ProjectBrowser projects={projects} services={services} copy={copy.filters} division={division} category={category} page={page} />
      <Contact contact={settings.contact} quote={quote} copy={COPY.home.contact} />
    </>
  );
}
