import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Contact from "@/components/sections/Contact";
import Divisions from "@/components/sections/Divisions";
import Process from "@/components/sections/Process";
import { getContent, getCopy, getDivisions, getProjects, getSettings } from "@/lib/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCopy("services");
  return { title: meta.title, description: meta.description };
}

export default async function ServicesPage() {
  const [settings, copy, home, content, divisions, projects] = await Promise.all([
    getSettings(),
    getCopy("services"),
    getCopy("home"),
    getContent(),
    getDivisions(),
    getProjects(),
  ]);

  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={copy.hero.label} text={copy.hero.text} />

      <Divisions divisions={divisions} copy={home.divisions} />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <ul className="grid-w gap-y-0">
          {divisions.map((page) => {
            const count = projects.filter((p) => p.division === page.id).length;
            return (
              <li key={page.id} className="col-span-6 border-t border-ink/20 lg:col-span-12">
                <Link href={`/services/${page.id}`} className="group grid grid-cols-6 items-center gap-x-[var(--gap)] gap-y-6 py-10 lg:grid-cols-12 lg:py-14">
                  <span className="t-label col-span-1 opacity-50">{page.number}</span>
                  <div className="col-span-5 lg:col-span-5">
                    <h2 className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.035em] transition-transform duration-700 ease-cubic group-hover:translate-x-3">
                      {page.name}
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">{page.intro}</p>
                    <p className="t-label mt-6">
                      <span className="link-u">
                        {count} {copy.list.explore}
                      </span>
                    </p>
                  </div>
                  <div className="fit col-span-6 aspect-[16/10] lg:col-span-5 lg:col-start-8">
                    <Image
                      src={page.card.image}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-105"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <Process steps={content.processSteps} copy={home.process} />
      <Contact contact={settings.contact} quote={settings.quote} copy={home.contact} />
    </>
  );
}
