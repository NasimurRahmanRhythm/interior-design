import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BuildStudy from "@/components/sections/BuildStudy";
import { builds, finishes } from "@/lib/content";
import { COPY } from "@/lib/copy";

export const metadata: Metadata = { title: COPY.demo.meta.title, description: COPY.demo.meta.description };

export default function DemoPage() {
  const copy = COPY.demo;
  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={copy.hero.label} text={copy.hero.text} />
      <BuildStudy builds={builds} finishes={finishes} copy={COPY.home.build} />
    </>
  );
}
