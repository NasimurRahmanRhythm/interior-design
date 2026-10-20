import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import RevealText from "@/components/RevealText";
import SplitTitle from "@/components/SplitTitle";
import Gallery from "@/components/sections/Gallery";
import { fill } from "@/lib/db/fill";
import { getCopy, getDivision, getProject, getProjects, getSettings } from "@/lib/db/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const [p, settings] = await Promise.all([getProject((await params).slug), getSettings()]);
  if (!p) return {};
  return {
    title: `${p.title}${p.client ? ` — ${p.client}` : ""} | ${settings.brand.name}`,
    description: p.summary,
    openGraph: p.images.length ? { images: [p.images[0].src] } : undefined,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [projects, copy] = await Promise.all([getProjects(), getCopy("project")]);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const text = copy.page;
  const division = (await getDivision(project.division))!;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((p) => p.division === project.division && p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const more = related.length ? related : projects.filter((p) => p.division === project.division && p.slug !== project.slug).slice(0, 3);
  const cover = project.images[0];

  const facts = [
    { label: text.labels.client, value: project.client },
    { label: text.labels.venue, value: project.venue },
    { label: text.labels.year, value: project.year },
    { label: text.labels.category, value: project.category },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <>
      <section data-theme="dark" className="relative bg-ink text-bone">
        <div className="relative h-[86svh] min-h-[520px] overflow-hidden">
          {cover && <Image src={cover.src} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-80" />}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
          <div className="grid-w absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
            <div className="col-span-6 lg:col-span-10">
              <p className="t-label mb-4 opacity-70">
                <Link href={`/services/${division.id}`} className="link-u">
                  {division.name}
                </Link>
              </p>
              <h1 className="flex flex-wrap gap-x-[0.25em] font-display text-[clamp(2.8rem,8vw,8.5rem)] leading-[0.95] tracking-[-0.04em]">
                {project.title.split(" ").map((word, i) => (
                  <SplitTitle key={i} text={word} when="ready" delay={i * 0.06} />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone py-16 text-ink lg:py-24">
        <div className="grid-w gap-y-10">
          <dl className="col-span-6 grid grid-cols-2 gap-x-[var(--gap)] gap-y-6 lg:col-span-5">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-ink/20 pt-3">
                <dt className="t-label opacity-50">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="col-span-6 lg:col-span-6 lg:col-start-7">
            <RevealText className="t-h3">{project.summary}</RevealText>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">{text.cta}</Button>
              <Button href={`/projects?division=${project.division}`}>
                {fill(text.more, { division: division.name.split(",")[0].toLowerCase() })}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone pb-20 text-ink lg:pb-28">
        <Gallery images={project.images} title={project.title} />
      </section>

      {more.length > 0 && (
        <section data-theme="light" className="bg-[#ece4d6] py-20 text-ink lg:py-28">
          <div className="grid-w gap-y-12">
            <p className="t-label col-span-6 opacity-60 lg:col-span-12">{text.related}</p>
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} className="col-span-6 sm:col-span-3 lg:col-span-4" sizes="(min-width:1024px) 31vw, 92vw" />
            ))}
          </div>
        </section>
      )}

      <section data-theme="dark" className="bg-ink text-bone">
        <Link href={`/projects/${next.slug}`} className="group grid-w items-end gap-y-6 py-20 lg:py-28">
          <div className="col-span-6 lg:col-span-8">
            <p className="t-label mb-4 opacity-60">{text.next}</p>
            <p className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[0.92] tracking-[-0.035em] transition-transform duration-700 ease-cubic group-hover:translate-x-3">
              {next.title}
            </p>
            {next.client && <p className="mt-3 text-sm opacity-60">{next.client}</p>}
          </div>
          {next.images.length > 0 && (
            <div className="fit col-span-3 aspect-[4/3] lg:col-span-3 lg:col-start-10">
              <Image src={next.images[0].src} alt="" fill sizes="25vw" className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-105" />
            </div>
          )}
        </Link>
      </section>
    </>
  );
}
