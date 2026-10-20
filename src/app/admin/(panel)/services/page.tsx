import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/admin/PageTitle";
import { button, card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { mediaUrl } from "@/lib/db/media";
import { LANDING_SERVICES } from "@/lib/db/queries";

export const metadata: Metadata = { title: "Services" };

export default async function Services() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("divisions").select("id, name, card_short, cover_image, featured_order").order("sort_order");
  if (error) throw new Error(error.message);
  const onLanding = data.filter((d) => d.featured_order != null).length;

  return (
    <>
      <PageTitle title="Services" text={`${onLanding} of ${LANDING_SERVICES} on the landing page ring.`}>
        <Link href="/admin/services/new" className={button}>
          New service
        </Link>
      </PageTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((d) => (
          <Link key={d.id} href={`/admin/services/${d.id}`} className={`${card} flex gap-4 transition-colors hover:border-ink/30`}>
            <span className="h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-ink/10">
              {d.cover_image && <img src={mediaUrl(d.cover_image)} alt="" className="h-full w-full object-cover" />}
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-xl leading-tight">{d.name}</span>
              <span className="mt-1 block text-sm text-ink/60">{d.card_short}</span>
              {d.featured_order != null && <span className="t-label mt-2 inline-block rounded-sm bg-umber px-2 py-1 text-bone">Landing</span>}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
