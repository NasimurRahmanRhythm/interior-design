import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import ProjectBrowser from "@/components/sections/ProjectBrowser";
import { fill } from "@/lib/db/fill";
import { getCopy, getProjects, getSettings } from "@/lib/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCopy("projects");
  return { title: meta.title, description: meta.description };
}

type Search = { division?: string; category?: string; page?: string };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { division, category, page } = await searchParams;
  const [settings, copy, home, projects] = await Promise.all([getSettings(), getCopy("projects"), getCopy("home"), getProjects()]);

  return (
    <>
      <PageHero
        title={copy.hero.title}
        accent={copy.hero.accent}
        label={fill(copy.hero.label, { count: projects.length })}
        text={copy.hero.text}
      />
      <ProjectBrowser projects={projects} copy={copy.filters} division={division} category={category} page={page} />
      <Contact contact={settings.contact} quote={settings.quote} copy={home.contact} />
    </>
  );
}
