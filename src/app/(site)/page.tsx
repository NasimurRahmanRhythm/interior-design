import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Journey from "@/components/sections/Journey";
import Clients from "@/components/sections/Clients";
import Divisions from "@/components/sections/Divisions";
import DemoCta from "@/components/sections/DemoCta";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Reach from "@/components/sections/Reach";
import Appreciation from "@/components/sections/Appreciation";
import BlogPosts from "@/components/sections/BlogPosts";
import Contact from "@/components/sections/Contact";
import { about, processSteps } from "@/lib/content";
import { COPY } from "@/lib/copy";
import {
  getDivisions,
  getAppreciations,
  getFeaturedDivisions,
  getFeaturedProjects,
  getJourney,
  getMapPoints,
  getMarquee,
  getPosts,
  getQuote,
  getSettings,
} from "@/lib/db/queries";

export default async function HomePage() {
  const copy = COPY.home;
  const [settings, quote, journey, services, ring, work, marquee, points, appreciations, posts] = await Promise.all([
    getSettings(),
    getQuote(),
    getJourney(),
    getDivisions(),
    getFeaturedDivisions(),
    getFeaturedProjects(),
    getMarquee(),
    getMapPoints(),
    getAppreciations(),
    getPosts(),
  ]);
  const facebook = settings.socials.find((s) => /facebook/i.test(s.label))?.href;

  return (
    <>
      <Hero belief={settings.brand.belief} copy={copy.hero} />
      <Trust trust={settings.trust} copy={copy.trust} />
      <WhoWeAre text={about.overview} services={services} copy={copy.who} />
      <Journey journey={journey} copy={copy.journey} />
      <Clients rows={marquee} copy={copy.clients} />
      {ring.length > 0 && <Divisions divisions={ring} copy={copy.divisions} />}
      <DemoCta copy={copy.demo} />
      <Process steps={processSteps} copy={copy.process} />
      {work.length > 0 && <Work work={work} facebook={facebook} copy={copy.work} />}
      <Reach points={points} figures={settings.mapFigures} copy={copy.reach} />
      {appreciations.length > 0 && <Appreciation items={appreciations} copy={copy.appreciation} />}
      {posts.length > 0 && <BlogPosts posts={posts} copy={copy.blog} />}
      <Contact contact={settings.contact} quote={quote} copy={copy.contact} />
    </>
  );
}
