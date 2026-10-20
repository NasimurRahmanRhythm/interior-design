import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { button, ghost, input } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { mediaUrl } from "@/lib/db/media";
import { PAGE_SIZE, paginate, withQuery } from "@/lib/paginate";

export const metadata: Metadata = { title: "Projects" };

type Search = { q?: string; division?: string; status?: string; page?: string };

export default async function Projects({ searchParams }: { searchParams: Promise<Search> }) {
  const { supabase } = await requireAdmin();
  const { q, division, status, page } = await searchParams;
  const match = Object.fromEntries(Object.entries({ division_id: division, status }).filter(([, v]) => v)) as Record<string, string>;
  const like = q ? `%${q.replace(/[%_,()]/g, " ")}%` : null;

  // Count first, so a page past the end (e.g. after deleting) shows the last page.
  let counting = supabase.from("projects").select("id", { count: "exact", head: true }).match(match);
  if (like) counting = counting.ilike("title", like);
  const [{ count, error: countError }, { data: divisions }] = await Promise.all([
    counting,
    supabase.from("divisions").select("id, card_title").order("sort_order"),
  ]);
  if (countError) throw new Error(countError.message);
  const total = count ?? 0;
  const paging = paginate(total, page);

  let rows = supabase
    .from("projects")
    .select("id, slug, title, division_id, category, year, status, featured_order, project_images(path, sort_order)")
    .match(match);
  if (like) rows = rows.ilike("title", like);
  const { data, error } = await rows.order("sort_order").order("title").range(paging.from, paging.from + PAGE_SIZE - 1);
  if (error) throw new Error(error.message);
  const href = (n: number) => withQuery("/admin/projects", { q, division, status, page: n > 1 ? n : null });

  return (
    <>
      <PageTitle
        title="Projects"
        text={`${total} project${total === 1 ? "" : "s"}${total ? `, showing ${paging.from + 1}–${paging.to}` : ""}. Drafts are hidden from the website.`}
      >
        <Link href="/admin/projects/new" className={button}>
          New project
        </Link>
      </PageTitle>

      <form className="mb-6 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
        <input name="q" defaultValue={q} placeholder="Search by title" className={input} />
        <select name="division" defaultValue={division ?? ""} className={input}>
          <option value="">Every division</option>
          {divisions?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.card_title}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""} className={input}>
          <option value="">Any status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
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
                  <span className="block truncate text-xs text-ink/55">
                    {p.division_id} · {p.category}
                    {p.year ? ` · ${p.year}` : ""}
                    {p.featured_order ? ` · landing #${p.featured_order}` : ""}
                  </span>
                </span>
                {p.status === "draft" && <span className="t-label rounded-sm bg-ink/10 px-2 py-1">Draft</span>}
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
