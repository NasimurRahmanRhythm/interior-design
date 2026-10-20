import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export default async function Overview() {
  const { supabase } = await requireAdmin();
  const count = async (table: string, filter?: [string, string]) => {
    let q = supabase.from(table).select("*", { count: "exact", head: true });
    if (filter) q = q.eq(...filter);
    return (await q).count ?? 0;
  };
  const [fresh, published, onLanding, clients, latest] = await Promise.all([
    count("quote_requests", ["status", "new"]),
    count("projects", ["status", "published"]),
    (async () => (await supabase.from("projects").select("*", { count: "exact", head: true }).not("featured_order", "is", null)).count ?? 0)(),
    count("clients"),
    supabase.from("quote_requests").select("id, name, division, created_at, status").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "New quote requests", value: fresh, href: "/admin/requests?status=new" },
    { label: "Projects", value: published, href: "/admin/projects" },
    { label: "Projects on the landing page", value: onLanding, href: "/admin/projects?landing=1" },
    { label: "Clients", value: clients, href: "/admin/clients" },
  ];

  return (
    <>
      <PageTitle title="Overview" text="Changes you save here show on the website straight away." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${card} transition-colors hover:border-ink/30`}>
            <p className="font-display text-5xl leading-none">{s.value}</p>
            <p className="t-label mt-3 text-ink/60">{s.label}</p>
          </Link>
        ))}
      </div>

      <section className={`${card} mt-8`}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Latest requests</h2>
          <Link href="/admin/requests" className="t-label underline underline-offset-4">
            All requests
          </Link>
        </div>
        {latest.data?.length ? (
          <ul className="mt-4 divide-y divide-ink/10">
            {latest.data.map((r) => (
              <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm">
                <span>
                  <strong className="font-medium">{r.name}</strong>
                  <span className="text-ink/60"> — {r.division || "No division"}</span>
                </span>
                <span className="text-xs text-ink/50">
                  {new Date(r.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" })} · {r.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink/60">No requests yet.</p>
        )}
      </section>
    </>
  );
}
