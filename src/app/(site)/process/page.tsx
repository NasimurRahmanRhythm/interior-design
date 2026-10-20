import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/RevealText";
import SplitTitle from "@/components/SplitTitle";
import BuildStudy from "@/components/sections/BuildStudy";
import Contact from "@/components/sections/Contact";
import { builds, finishes, processDetail } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { getDivisions, getQuote, getSettings } from "@/lib/db/queries";
import type { Division } from "@/lib/db/types";

export const metadata: Metadata = { title: COPY.process.meta.title, description: COPY.process.meta.description };

export default async function ProcessPage() {
  const copy = COPY.process;
  const home = COPY.home;
  const [settings, quote, divisions] = await Promise.all([getSettings(), getQuote(), getDivisions()]);
  const shown = copy.divisions.divisions
    .map((id) => divisions.find((d) => d.id === id))
    .filter((d): d is Division => Boolean(d));

  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={copy.hero.label} text={copy.hero.text} />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <ol className="grid-w gap-y-0">
          {processDetail.map((step, i) => (
            <li key={step.title} className="col-span-6 grid grid-cols-6 items-baseline gap-x-[var(--gap)] gap-y-3 border-t border-ink/20 py-8 lg:col-span-12 lg:grid-cols-12 lg:py-10">
              <span className="t-label col-span-1 opacity-50">0{i + 1}</span>
              <h2 className="col-span-5 font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-none tracking-[-0.035em] lg:col-span-5">
                <SplitTitle text={step.title} />
              </h2>
              <RevealText className="col-span-5 col-start-2 max-w-md text-sm leading-relaxed opacity-75 lg:col-span-5 lg:col-start-8">
                {step.text}
              </RevealText>
            </li>
          ))}
        </ol>
      </section>

      <BuildStudy builds={builds} finishes={finishes} copy={home.build} />

      <section data-theme="light" className="bg-[#ece4d6] py-24 text-ink lg:py-36">
        <div className="grid-w gap-y-12">
          {shown.map((d) => (
            <div key={d.id} className="col-span-6 lg:col-span-6">
              <p className="t-label opacity-50">{d.name}</p>
              <ul className="mt-6 flex flex-col">
                {d.groups.slice(0, 3).map((g) => (
                  <li key={g.title} className="border-t border-ink/20 py-5">
                    <p className="t-h5">{g.title}</p>
                    <p className="mt-2 text-sm opacity-70">{g.items.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Contact contact={settings.contact} quote={quote} copy={home.contact} />
    </>
  );
}
