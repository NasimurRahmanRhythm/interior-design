import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Journey from "@/components/sections/Journey";
import Divisions from "@/components/sections/Divisions";
import BuildStudy from "@/components/sections/BuildStudy";
import Work from "@/components/sections/Work";
import Reach from "@/components/sections/Reach";
import Clients from "@/components/sections/Clients";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import { builds, finishes, processSteps } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { getFeaturedDivisions, getFeaturedProjects, getJourney, getMapPoints, getMarquee, getQuote, getSettings } from "@/lib/db/queries";

export default async function HomePage() {
  const copy = COPY.home;
  const [settings, quote, journey, divisions, work, marquee, points] = await Promise.all([
    getSettings(),
    getQuote(),
    getJourney(),
    getFeaturedDivisions(),
    getFeaturedProjects(),
    getMarquee(),
    getMapPoints(),
  ]);

  return (
    <>
      <Hero belief={settings.brand.belief} panels={settings.heroPanels} copy={copy.hero} />
      <Trust trust={settings.trust} copy={copy.trust} />
      <Journey journey={journey} copy={copy.journey} />
      {divisions.length > 0 && <Divisions divisions={divisions} copy={copy.divisions} />}
      <BuildStudy builds={builds} finishes={finishes} copy={copy.build} />
      {work.length > 0 && <Work work={work} copy={copy.work} />}
      <Reach points={points} copy={copy.reach} />
      <Clients rows={marquee} copy={copy.clients} />
      <Process steps={processSteps} copy={copy.process} />
      <Contact contact={settings.contact} quote={quote} copy={copy.contact} />
    </>
  );
}
