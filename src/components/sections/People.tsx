import Image from "next/image";
import Button from "../Button";
import RevealText from "../RevealText";
import SplitTitle from "../SplitTitle";
import { people } from "@/lib/data";

export default function People({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="people" data-theme="dark" className="bg-ink py-28 text-bone lg:py-44">
      <div className="grid-w items-end gap-y-8">
        <h2 className="col-span-6 flex flex-col lg:col-span-8">
          <span className="t-h1 italic">Formed by</span>
          <SplitTitle text="People" className="t-lrg" />
        </h2>
        <div className="col-span-6 lg:col-span-3 lg:col-start-10">
          <RevealText className="text-sm opacity-70">
            The atelier is twelve people and has no plan to become more. Each room is drawn, built and lit by the
            same hands, and their involvement continues long after the door is closed.
          </RevealText>
          {showLink && (
            <Button href="/studio" className="mt-8">
              Meet the Studio
            </Button>
          )}
        </div>
      </div>

      <ul className="grid-w mt-16 gap-y-10 lg:mt-24">
        {people.map((person, i) => (
          <li key={person.name} className={`group col-span-3 lg:col-span-3 ${i % 2 ? "lg:mt-16" : ""}`} data-cursor>
            <div className="fit aspect-[3/4] bg-stone">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover grayscale transition-[filter,scale] duration-1000 ease-cubic group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <p className="t-h5 mt-3">{person.name}</p>
            <p className="t-label mt-1 opacity-50">{person.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
