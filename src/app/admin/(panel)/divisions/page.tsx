import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { mediaUrl } from "@/lib/db/media";

export const metadata: Metadata = { title: "Divisions" };

export default async function Divisions() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("divisions").select("id, number, name, tagline, cover_image").order("sort_order");
  if (error) throw new Error(error.message);
  return (
    <>
      <PageTitle title="Divisions" text="The four divisions on the 360° ring, the services page and each division page." />
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((d) => (
          <Link key={d.id} href={`/admin/divisions/${d.id}`} className={`${card} flex gap-4 transition-colors hover:border-ink/30`}>
            <span className="h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-ink/10">
              {d.cover_image && <img src={mediaUrl(d.cover_image)} alt="" className="h-full w-full object-cover" />}
            </span>
            <span>
              <span className="t-label text-ink/50">{d.number}</span>
              <span className="mt-1 block font-serif text-xl leading-tight">{d.name}</span>
              <span className="mt-1 block text-sm text-ink/60">{d.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
