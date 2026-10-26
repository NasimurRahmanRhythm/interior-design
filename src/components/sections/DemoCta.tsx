import Button from "../Button";
import SplitTitle from "../SplitTitle";
import type { Copy } from "@/lib/db/types";

// Points to the 3D demo page, where the build study now lives.
export default function DemoCta({ copy }: { copy: Copy }) {
  return (
    <section data-theme="light" className="bg-bone py-24 text-ink lg:py-32">
      <div className="grid-w items-end gap-y-8">
        <div className="col-span-6 lg:col-span-8">
          <p className="t-label mb-4 opacity-60">{copy.eyebrow}</p>
          <h2 className="t-h1">
            <span className="block">
              <SplitTitle text={copy.title[0]} />
            </span>
            <span className="block">
              <SplitTitle text={copy.title[1]} className="text-umber" delay={0.1} />
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-75">{copy.text}</p>
        </div>
        <div className="col-span-6 lg:col-span-4 lg:justify-self-end">
          <Button href="/demo" big>
            {copy.cta} →
          </Button>
        </div>
      </div>
    </section>
  );
}
