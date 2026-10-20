import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { button, input } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { mediaUrl } from "@/lib/db/media";

export const metadata: Metadata = { title: "Projects" };

type Search = { q?: string; division?: string; status?: string };

export default async function Projects({ searchParams }: { searchParams: Promise<Search> }) {
  const { supabase } = await requireAdmin();
  const { q, division, status } = await searchParams;
  let query = supabase
    .from("projects")
    .select("id, slug, title, division_id, category, year, status, featured_order, project_images(path, sort_order)")
    .order("sort_order");
  if (q) query = query.ilike("title", `%${q.replace(/[%_,()]/g, " ")}%`);
  if (division) query = query.eq("division_id", division);
  if (status) query = query.eq("status", status);
  const [{ data, error }, { data: divisions }] = await Promise.all([query, supabase.from("divisions").select("id, card_title").order("sort_order")]);
  if (error) throw new Error(error.message);

  return (
    <>
      <PageTitle title="Projects" text={`${data.length} shown. Drafts are hidden from the website.`}>
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
    </>
  );
}
