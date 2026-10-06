import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import RevealText from "@/components/RevealText";
import Admission from "@/components/sections/Admission";
import { spaces } from "@/lib/data";

export const metadata: Metadata = { title: "Spaces — Umbra Atelier" };

export default function SpacesPage() {
  return (
    <>
      <PageHero
        title="Seven"
        accent="Spaces"
        label="Index of rooms"
        text="Each room is established within a specific context and maintained with discretion. Cities are listed; addresses are not."
      />

      <section data-theme="dark" className="bg-ink pb-28 text-bone lg:pb-44">
        <ul>
          {spaces.map((space, i) => (
            <li key={space.id} className="grid-w items-center gap-y-6 border-t border-bone/15 py-12 lg:py-20">
              <span className="t-label col-span-6 opacity-50 lg:col-span-1">0{i + 1}</span>
              <div className={`col-span-6 lg:col-span-5 ${i % 2 ? "lg:order-3 lg:col-start-8" : "lg:col-start-2"}`}>
                <div className="fit aspect-[4/3]">
                  <Parallax amount={8} className="absolute -inset-y-[10%] inset-x-0">
                    <Image src={space.image} alt={`${space.name}, ${space.city}`} fill sizes="(min-width:1024px) 42vw, 100vw" loading={i === 0 ? "eager" : "lazy"} className="object-cover" />
                  </Parallax>
                </div>
              </div>
              <div className={`col-span-6 lg:col-span-4 ${i % 2 ? "lg:col-start-3" : "lg:col-start-8"}`}>
                <RevealText as="h2" className="t-h1">
                  {space.name}
                </RevealText>
                <RevealText className="mt-5 max-w-sm text-sm opacity-70">{space.blurb}</RevealText>
                <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-bone/15 pt-6">
                  {[
                    ["City", space.city],
                    ["Year", space.year],
                    ["Type", space.type],
                    ["Area", space.area],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="t-label opacity-50">{term}</dt>
                      <dd className="t-h5 mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Admission />
    </>
  );
}
