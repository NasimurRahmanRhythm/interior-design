import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import ProjectBrowser from "@/components/sections/ProjectBrowser";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Integrity 360 Degree",
  description: "Events, fairs, activations, exhibition stalls, interiors, PR and media delivered by Integrity 360 Degree since 2010.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        accent="Since 2010"
        label={`${projects.length} projects`}
        text="Concerts and conferences, bank branch openings, stalls for more than sixty exhibitors, offices, cafés and law chambers — filter by division or category."
      />
      <Suspense>
        <ProjectBrowser />
      </Suspense>
      <Contact />
    </>
  );
}
