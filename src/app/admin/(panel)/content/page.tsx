import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Page content" };

const PAGES: Record<string, string> = {
  global: "Header & footer",
  home: "Landing page",
  about: "About",
  services: "Services",
  division: "Division pages",
  projects: "Projects list",
  project: "Project pages",
  clients: "Clients",
  process: "Process",
  contact: "Contact",
};

const BLOCKS: Record<string, string> = {
  about: "About the company (story, pillars, values, 360° wheel)",
  process_steps: "How we work — short steps (landing, services)",
  process_detail: "Process page — the seven steps",
  builds: "3D build study — stall, office, stage steps",
  finishes: "3D finishes (colours)",
};

const human = (s: string) => (s.charAt(0).toUpperCase() + s.slice(1)).replace(/_/g, " ");

export default async function Content() {
  const { supabase } = await requireAdmin();
  const [{ data: rows, error }, { data: blocks }] = await Promise.all([
    supabase.from("page_content").select("key, page").order("sort_order"),
    supabase.from("content_blocks").select("key").order("key"),
  ]);
  if (error) throw new Error(error.message);
  const pages = Object.keys(PAGES).filter((p) => rows.some((r) => r.page === p));

  return (
    <>
      <PageTitle title="Page content" text="Headings, labels and copy for every section of the website." />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className={`${card} lg:col-span-2`}>
          <h2 className="mb-3 font-serif text-2xl">Shared content</h2>
          <ul className="divide-y divide-ink/10">
            {blocks?.map((b) => (
              <li key={b.key}>
                <Link href={`/admin/content/blocks/${b.key}`} className="block py-2.5 text-sm hover:text-umber">
                  {BLOCKS[b.key] ?? human(b.key)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {pages.map((page) => (
          <section key={page} className={card}>
            <h2 className="mb-3 font-serif text-2xl">{PAGES[page]}</h2>
            <ul className="divide-y divide-ink/10">
              {rows
                .filter((r) => r.page === page)
                .map((r) => (
                  <li key={r.key}>
                    <Link href={`/admin/content/${r.key}`} className="block py-2.5 text-sm hover:text-umber">
                      {r.key.endsWith(".meta") ? "Search title & description" : human(r.key.split(".").slice(1).join(" "))}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
