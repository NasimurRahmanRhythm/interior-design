"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProjectCard from "../ProjectCard";
import { projects, type DivisionId } from "@/lib/projects";

const FILTERS: { id: DivisionId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "events", label: "Events & Fairs" },
  { id: "exhibition", label: "Exhibition" },
  { id: "interior", label: "Interior" },
  { id: "brand", label: "Brand, PR & Digital" },
];

export default function ProjectBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("division");
  const active = FILTERS.some((f) => f.id === raw) ? (raw as DivisionId) : "all";
  const category = params.get("category");

  const inDivision = useMemo(() => (active === "all" ? projects : projects.filter((p) => p.division === active)), [active]);
  const categories = useMemo(() => [...new Set(inDivision.map((p) => p.category))], [inDivision]);
  const shown = category ? inDivision.filter((p) => p.category === category) : inDivision;

  const go = (division: string, cat?: string) => {
    const q = new URLSearchParams();
    if (division !== "all") q.set("division", division);
    if (cat) q.set("category", cat);
    router.replace(q.size ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  return (
    <section data-theme="light" className="bg-bone pb-28 pt-12 text-ink lg:pb-40 lg:pt-16">
      <div className="grid-w gap-y-6">
        <div className="col-span-6 flex flex-wrap gap-2 lg:col-span-12" role="tablist" aria-label="Filter by division">
          {FILTERS.map((f) => {
            const on = f.id === active;
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.division === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => go(f.id)}
                className={`t-label border px-4 py-2.5 transition-colors duration-500 ${
                  on ? "border-ink bg-ink text-bone" : "border-ink/25 hover:border-ink/70"
                }`}
              >
                {f.label} <span className="opacity-50">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="col-span-6 flex flex-wrap gap-x-4 gap-y-2 text-sm lg:col-span-12">
          <button type="button" onClick={() => go(active)} className={category ? "opacity-50 hover:opacity-100" : "underline underline-offset-4"}>
            Every category
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => go(active, c)}
              className={c === category ? "underline underline-offset-4" : "opacity-50 hover:opacity-100"}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-w mt-14 gap-y-14">
        {shown.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            className="col-span-6 sm:col-span-3 lg:col-span-4"
            sizes="(min-width:1024px) 31vw, (min-width:640px) 48vw, 92vw"
          />
        ))}
      </div>
    </section>
  );
}
