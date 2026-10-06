import Link from "next/link";
import SplitTitle from "./SplitTitle";
import { brand, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink pb-8 pt-16 text-bone lg:pt-24">
      <div className="grid-w gap-y-12">
        <div className="col-span-6 lg:col-span-4">
          <p className="t-label mb-4 opacity-50">Index</p>
          <ul className="t-h3 flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link-u">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 lg:col-span-2 lg:col-start-7">
          <p className="t-label mb-4 opacity-50">Practice</p>
          <p className="text-sm opacity-70">Independent practice operating across seven rooms.</p>
        </div>

        <div className="col-span-3 lg:col-span-2">
          <p className="t-label mb-4 opacity-50">Reach</p>
          <p className="text-sm opacity-70">No social media.</p>
          <a href={`mailto:${brand.email}`} className="link-u mt-2 inline-block break-all text-sm">
            {brand.email}
          </a>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <p className="t-label mb-4 opacity-50">Note</p>
          <p className="text-sm opacity-70">
            Demo website with placeholder content. Names, places and people are fictional.
          </p>
        </div>
      </div>

      <div className="mt-14 px-[var(--margin)] lg:mt-20">
        <div className="flex items-end justify-between gap-x-[0.2em] whitespace-nowrap font-display text-[15.2vw] leading-[0.8] tracking-[-0.04em]">
          <SplitTitle text="Umbra" />
          <SplitTitle text="Atelier" className="text-umber" delay={0.15} />
        </div>
      </div>

      <div className="grid-w mt-10 border-t border-bone/15 pt-5">
        <span className="t-label col-span-3 opacity-50 lg:col-span-6">© 2026</span>
        <Link href="/#admission" className="t-label link-u col-span-3 w-fit justify-self-end lg:col-span-6">
          Seek Admission
        </Link>
      </div>
    </footer>
  );
}
