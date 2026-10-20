import type { Metadata } from "next";
import Link from "next/link";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteRequest } from "@/lib/admin/actions/requests";
import StatusSelect from "./StatusSelect";

export const metadata: Metadata = { title: "Quote requests" };

const FILTERS = ["all", "new", "contacted", "closed"];

export default async function Requests({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { supabase } = await requireAdmin();
  const status = (await searchParams).status;
  let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false }).limit(200);
  if (status && status !== "all") query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (
    <>
      <PageTitle title="Quote requests" text="Sent from the quote form on the website. Mark each one as you follow up." />
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/requests" : `/admin/requests?status=${f}`}
            className={`t-label rounded-sm border px-3 py-2 ${(status ?? "all") === f ? "border-ink bg-ink text-bone" : "border-ink/20"}`}
          >
            {f}
          </Link>
        ))}
      </div>
      {data.length === 0 && <p className="text-sm text-ink/60">No requests here.</p>}
      <ul className="flex flex-col gap-4">
        {data.map((r) => (
          <li key={r.id} className={card}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl leading-tight">{r.name}</p>
                <p className="mt-1 text-xs text-ink/50">
                  {new Date(r.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" })}
                  {r.source_page ? ` · from ${r.source_page}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusSelect id={r.id} status={r.status} />
                <ConfirmButton action={deleteRequest.bind(null, r.id)} message={`Delete the request from ${r.name}?`}>
                  Delete
                </ConfirmButton>
              </div>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Phone", r.phone && <a href={`tel:${r.phone}`} className="underline underline-offset-2">{r.phone}</a>],
                ["Email", r.email && <a href={`mailto:${r.email}`} className="break-all underline underline-offset-2">{r.email}</a>],
                ["Division", r.division],
                ["Budget", r.budget],
                ["Timeline", r.timeline],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="t-label text-ink/50">{k}</dt>
                  <dd className="mt-0.5">{v || "—"}</dd>
                </div>
              ))}
            </dl>
            {r.message && <p className="mt-4 whitespace-pre-line border-t border-ink/10 pt-4 text-sm">{r.message}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
