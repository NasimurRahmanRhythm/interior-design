import Image from "next/image";
import Button from "../Button";
import Parallax from "../Parallax";
import RevealText from "../RevealText";
import { spaces } from "@/lib/data";

export default function MapSection() {
  return (
    <section data-theme="light" className="relative overflow-hidden bg-bone py-28 text-ink lg:py-44">
      <div className="grid-w items-start gap-y-12">
        <Parallax amount={8} className="col-span-4 lg:col-span-4 lg:col-start-2">
          <div className="fit aspect-[3/4]">
            <Image src="/images/misc/map.jpg" alt="A quiet corner with a round table and plants" fill sizes="(min-width:1024px) 33vw, 66vw" className="object-cover" />
          </div>
        </Parallax>

        <div className="col-span-6 lg:col-span-5 lg:col-start-7 lg:pt-24">
          <h2 className="t-h1 flex flex-col">
            <RevealText as="span">You Won’t</RevealText>
            <RevealText as="span" className="ml-[1.2em]" delay={0.08}>
              Find Them
            </RevealText>
            <RevealText as="span" delay={0.16}>
              on a Map
            </RevealText>
          </h2>
          <RevealText className="t-caps mt-10 text-umber">These rooms aren’t broadly announced.</RevealText>
          <RevealText className="mt-5 max-w-md text-[0.95rem] leading-relaxed">
            There are {spaces.length} in operation at the moment, each established within a specific context and
            maintained with discretion. Their presence is intentional, shaped by location rather than visibility.
            Access is considered, not assumed.
          </RevealText>
          <div className="mt-12 flex items-end gap-6">
            <span className="flex flex-col text-sm leading-tight">
              <span>See if</span>
              <span>Nearby /</span>
            </span>
            <Button href="/#admission" big>
              Seek Admission
            </Button>
          </div>
        </div>

        <Parallax amount={30} className="col-span-3 col-start-4 lg:col-span-2 lg:col-start-11 lg:-mt-24">
          <div className="fit aspect-[3/4]">
            <Image src="/images/misc/vase.jpg" alt="A white ceramic vessel" fill sizes="(min-width:1024px) 17vw, 50vw" className="object-cover" />
          </div>
          <p className="t-label mt-3 opacity-60">Fig. 2 — Vessel, Ash Parlour</p>
        </Parallax>
      </div>
    </section>
  );
}
