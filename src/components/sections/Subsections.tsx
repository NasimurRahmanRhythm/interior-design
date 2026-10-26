import Image from "next/image";
import RevealText from "../RevealText";
import type { Subsection } from "@/lib/db/types";

// Extra blocks added in the admin: image and text side by side, alternating sides.
export default function Subsections({ items }: { items: Subsection[] }) {
  if (!items.length) return null;
  return (
    <section data-theme="light" className="bg-bone pb-20 text-ink lg:pb-28">
      <div className="flex flex-col gap-16 lg:gap-24">
        {items.map((s, i) => (
          <div key={i} className="grid-w items-center gap-y-6">
            {s.image && (
              <div className={`fit relative col-span-6 aspect-[4/3] lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <Image src={s.image} alt="" fill sizes="(min-width:1024px) 48vw, 92vw" className="object-cover" />
              </div>
            )}
            <div className={`col-span-6 lg:col-span-5 ${s.image ? (i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8") : "lg:col-start-2"}`}>
              <h2 className="t-h3">{s.title}</h2>
              {s.description && <RevealText className="mt-4 whitespace-pre-line text-sm leading-relaxed opacity-75">{s.description}</RevealText>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
