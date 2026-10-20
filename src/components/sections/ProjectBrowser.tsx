import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { paginate, pageList, withQuery } from "@/lib/paginate";
import type { Copy, Project } from "@/lib/db/types";

type Props = { projects: Project[]; copy: Copy; division?: string; category?: string; page?: string };

// Division tabs, category links and a paged grid. Filtering and paging happen
// on the server from the URL, so every state has its own link.
export default function ProjectBrowser({ projects, copy, division, category, page }: Props) {
  const FILTERS: { id: string; label: string }[] = [
    { id: "all", label: copy.all },
    ...Object.entries(copy.divisions as Record<string, string>).map(([id, label]) => ({ id, label })),
  ];
  const active = FILTERS.some((f) => f.id === division) ? division! : "all";
  const inDivision = active === "all" ? projects : projects.filter((p) => p.division === active);
  const categories = [...new Set(inDivision.map((p) => p.category))];
  const cat = category && categories.includes(category) ? category : undefined;
  const filtered = cat ? inDivision.filter((p) => p.category === cat) : inDivision;
  const paging = paginate(filtered.length, page);
  const shown = filtered.slice(paging.from, paging.to);

  const href = (d: string, c?: string, p?: number) =>
    withQuery("/projects", { division: d === "all" ? null : d, category: c, page: p && p > 1 ? p : null });

  return (
    <section id="browse" data-theme="light" className="scroll-mt-20 bg-bone pb-28 pt-12 text-ink lg:pb-40 lg:pt-16">
      <div className="grid-w gap-y-6">
        <nav className="col-span-6 flex flex-wrap gap-2 lg:col-span-12" aria-label="Filter by division">
          {FILTERS.map((f) => {
            const on = f.id === active;
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.division === f.id).length;
            return (
              <Link
                key={f.id}
                href={href(f.id)}
                scroll={false}
                aria-current={on ? "page" : undefined}
                className={`t-label border px-4 py-2.5 transition-colors duration-500 ${
                  on ? "border-ink bg-ink text-bone" : "border-ink/25 hover:border-ink/70"
                }`}
              >
                {f.label} <span className="opacity-50">{count}</span>
              </Link>
            );
          })}
        </nav>
        <nav className="col-span-6 flex flex-wrap gap-x-4 gap-y-2 text-sm lg:col-span-12" aria-label="Filter by category">
          <Link href={href(active)} scroll={false} className={cat ? "opacity-50 hover:opacity-100" : "underline underline-offset-4"}>
            {copy.every_category}
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={href(active, c)}
              scroll={false}
              className={c === cat ? "underline underline-offset-4" : "opacity-50 hover:opacity-100"}
            >
              {c}
            </Link>
          ))}
        </nav>
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

      {paging.pages > 1 && (
        <nav className="grid-w mt-20" aria-label="Pages">
          <div className="col-span-6 flex flex-wrap items-center justify-center gap-2 lg:col-span-12">
            <PageLink href={href(active, cat, paging.page - 1)} disabled={paging.page === 1} label="Previous page">
              ←
            </PageLink>
            {pageList(paging.page, paging.pages).map((n, i) =>
              n === null ? (
                <span key={`gap${i}`} className="t-label px-2 opacity-40">
                  …
                </span>
              ) : (
                <PageLink key={n} href={href(active, cat, n)} current={n === paging.page} label={`Page ${n}`}>
                  {n}
                </PageLink>
              )
            )}
            <PageLink href={href(active, cat, paging.page + 1)} disabled={paging.page === paging.pages} label="Next page">
              →
            </PageLink>
          </div>
        </nav>
      )}
    </section>
  );
}

function PageLink({ href, children, current, disabled, label }: { href: string; children: React.ReactNode; current?: boolean; disabled?: boolean; label: string }) {
  const cls = "t-label flex h-11 min-w-11 items-center justify-center border px-3 transition-colors duration-500";
  if (disabled) return <span className={`${cls} border-ink/10 opacity-30`} aria-hidden="true">{children}</span>;
  return (
    <Link
      href={`${href}#browse`}
      aria-label={label}
      aria-current={current ? "page" : undefined}
      className={`${cls} ${current ? "border-ink bg-ink text-bone" : "border-ink/25 hover:border-ink/70"}`}
    >
      {children}
    </Link>
  );
}
