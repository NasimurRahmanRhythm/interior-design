import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { button, ghost, input } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { mediaUrl } from "@/lib/db/media";
import { LANDING_PROJECTS } from "@/lib/db/queries";
import { PAGE_SIZE, paginate, withQuery } from "@/lib/paginate";

export const metadata: Metadata = { title: "Projects" };

type Search = { q?: string; division?: string; landing?: string; page?: string };

export default async function Projects({ searchParams }: { searchParams: Promise<Search> }) {
  const { supabase } = await requireAdmin();
  const { q, division, landing, page } = await searchParams;
  const match: Record<string, string> = division ? { division_id: division } : {};
  const like = q ? `%${q.replace(/[%_,()]/g, " ")}%` : null;

  // Count first, so a page past the end (e.g. after deleting) shows the last page.
  let counting = supabase.from("projects").select("id", { count: "exact", head: true }).match(match);
  if (like) counting = counting.ilike("title", like);
  if (landing) counting = counting.not("featured_order", "is", null);
  const [{ count, error: countError }, { data: divisions }, { count: onLanding }] = await Promise.all([
    counting,
    supabase.from("divisions").select("id, card_title").order("sort_order"),
    supabase.from("projects").select("id", { count: "exact", head: true }).not("featured_order", "is", null),
  ]);
  if (countError) throw new Error(countError.message);
  const total = count ?? 0;
  const paging = paginate(total, page);

  let rows = supabase
    .from("projects")
    .select("id, title, division_id, featured_order, project_images(path, sort_order)")
    .match(match);
  if (like) rows = rows.ilike("title", like);
  if (landing) rows = rows.not("featured_order", "is", null);
  const { data, error } = await rows.order("sort_order").order("title").range(paging.from, paging.from + PAGE_SIZE - 1);
  if (error) throw new Error(error.message);
  const href = (n: number) => withQuery("/admin/projects", { q, division, landing, page: n > 1 ? n : null });
  const service = new Map((divisions ?? []).map((d) => [d.id, d.card_title as string]));

  return (
    <>
      <PageTitle
        title="Projects"
        text={`${total} project${total === 1 ? "" : "s"}${total ? `, showing ${paging.from + 1}–${paging.to}` : ""}. ${onLanding ?? 0} of ${LANDING_PROJECTS} on the landing page.`}
      >
        <Link href="/admin/projects/new" className={button}>
          New project
        </Link>
      </PageTitle>

      <form className="mb-6 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
        <input name="q" defaultValue={q} placeholder="Search by title" className={input} />
        <select name="division" defaultValue={division ?? ""} className={input}>
          <option value="">Every service</option>
          {divisions?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.card_title}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 px-2 text-sm">
          <input name="landing" type="checkbox" value="1" defaultChecked={Boolean(landing)} className="h-4 w-4 accent-umber" />
          On landing page
        </label>
        <button className={button}>Filter</button>
      </form>

      <ul className="divide-y divide-ink/10 rounded-sm border border-ink/10 bg-white/70">
        {data.map((p) => {
          const cover = [...p.project_images].sort((a, b) => a.sort_order - b.sort_order)[0];
          return (
            <li key={p.id}>
              <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-bone">
                <span className="h-12 w-16 shrink-0 overflow-hidden rounded-sm bg-ink/10">
                  {cover && <img src={mediaUrl(cover.path)} alt="" className="h-full w-full object-cover" loading="lazy" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{p.title}</span>
                  <span className="block truncate text-xs text-ink/55">{service.get(p.division_id) ?? p.division_id}</span>
                </span>
                {p.featured_order != null && <span className="t-label rounded-sm bg-umber px-2 py-1 text-bone">Landing</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {paging.pages > 1 && (
        <nav className="mt-6 flex items-center justify-between gap-4" aria-label="Pages">
          {paging.page > 1 ? (
            <Link href={href(paging.page - 1)} className={ghost}>
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-ink/60">
            Page {paging.page} of {paging.pages}
          </span>
          {paging.page < paging.pages ? (
            <Link href={href(paging.page + 1)} className={ghost}>
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
