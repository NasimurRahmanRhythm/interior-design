import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import RevealText from "@/components/RevealText";
import RoomStudy from "@/components/sections/RoomStudy";
import { objects } from "@/lib/data";

export const metadata: Metadata = { title: "Objects — Umbra Atelier" };

export default function ObjectsPage() {
  return (
    <>
      <PageHero
        title="Origin"
        accent="Objects"
        label="In circulation"
        text="Furniture, lamps and vessels formed inside the rooms they were made for, then released in small editions."
      />

      <section data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
        <ul className="grid-w gap-y-16">
          {objects.map((object, i) => (
            <li key={object.id} className={`group col-span-6 sm:col-span-3 lg:col-span-3 ${i % 2 ? "lg:mt-24" : ""}`} data-cursor>
              <div className="fit aspect-[3/4] bg-ink/5">
                <Image
                  src={object.image}
                  alt={object.name}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  className="object-cover transition-[scale] duration-1000 ease-cubic group-hover:scale-105"
                />
              </div>
              <p className="t-label mt-4 opacity-50">Object {object.numeral}</p>
              <RevealText as="h2" className="t-h3 mt-1">
                {object.name}
              </RevealText>
              <dl className="mt-4 space-y-1 border-t border-ink/15 pt-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="opacity-50">Formed in</dt>
                  <dd>{object.origin}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="opacity-50">Material</dt>
                  <dd className="text-right">{object.material}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="opacity-50">Release</dt>
                  <dd>{object.edition}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <RoomStudy />
    </>
  );
}
