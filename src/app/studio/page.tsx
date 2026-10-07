import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import RevealText from "@/components/RevealText";
import People from "@/components/sections/People";
import Admission from "@/components/sections/Admission";
import { stats } from "@/lib/data";

export const metadata: Metadata = { title: "Studio — Integrity 360 Degree" };

export default function StudioPage() {
  return (
    <>
      <PageHero
        title="The"
        accent="Studio"
        label="About the practice"
        text="An independent interior practice working slowly, on few rooms at a time, for people who intend to stay in them."
      />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-40">
        <div className="grid-w gap-y-14">
          <div className="col-span-6 lg:col-span-5 lg:col-start-2">
            <div className="fit aspect-[4/5]">
              <Parallax amount={8} className="absolute -inset-y-[10%] inset-x-0">
                <Image src="/images/misc/studio.jpg" alt="A pale living room with woven wall pieces" fill sizes="(min-width:1024px) 42vw, 100vw" loading="eager" className="object-cover" />
              </Parallax>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-4 lg:col-start-8 lg:pt-20">
            <RevealText as="h2" className="t-h1">
              Nothing is shown before it is finished.
            </RevealText>
            <RevealText className="mt-8 text-[0.95rem] leading-relaxed opacity-80">
              We begin with the empty volume and the way daylight moves across it. Furniture, joinery and lamps are
              drawn afterwards, often made on site, and modelled in 3D only to test what the room already suggests.
            </RevealText>
            <RevealText className="mt-5 text-[0.95rem] leading-relaxed opacity-80">
              We do not publish works in progress, and we do not keep social accounts. What you see here is the
              whole of what we have chosen to show.
            </RevealText>
          </div>
        </div>

        <dl className="grid-w mt-24 gap-y-10 border-t border-ink/15 pt-10 lg:mt-36">
          {stats.map((stat) => (
            <div key={stat.label} className="col-span-3">
              <dd className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-none tracking-[-0.04em]">{stat.value}</dd>
              <dt className="t-label mt-3 opacity-60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <People showLink={false} />
      <Admission />
    </>
  );
}
