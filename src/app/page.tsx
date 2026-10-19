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
import { getContent, getCopy, getDivisions, getFeaturedProjects, getJourney, getMarquee, getSettings } from "@/lib/db/queries";

export default async function HomePage() {
  const [settings, copy, content, journey, divisions, work, marquee] = await Promise.all([
    getSettings(),
    getCopy("home"),
    getContent(),
    getJourney(),
    getDivisions(),
    getFeaturedProjects(),
    getMarquee(),
  ]);

  return (
    <>
      <Hero belief={settings.brand.belief} panels={settings.heroPanels} copy={copy.hero} />
      <Trust trust={settings.trust} copy={copy.trust} />
      <Journey journey={journey} copy={copy.journey} />
      <Divisions divisions={divisions} copy={copy.divisions} />
      <BuildStudy builds={content.builds} finishes={content.finishes} copy={copy.build} />
      <Work work={work} copy={copy.work} />
      <Reach reach={settings.reach} copy={copy.reach} />
      <Clients rows={marquee} copy={copy.clients} />
      <Process steps={content.processSteps} copy={copy.process} />
      <Contact contact={settings.contact} quote={settings.quote} copy={copy.contact} />
    </>
  );
}
