import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { ghost } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteService } from "@/lib/admin/actions/services";
import ServiceForm, { type ServiceRow } from "../ServiceForm";
import SectionsEditor from "@/components/admin/SectionsEditor";

export const metadata: Metadata = { title: "Edit service" };

export default async function EditService({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: s }, { count }, { data: sections }] = await Promise.all([
    supabase.from("divisions").select("id, name, card_short, cover_image, featured_order").eq("id", id).maybeSingle(),
    supabase.from("divisions").select("id", { count: "exact", head: true }).not("featured_order", "is", null),
    supabase.from("division_sections").select("id, title, description, image_path").eq("division_id", id).order("sort_order"),
  ]);
  if (!s) notFound();

  return (
    <>
      <PageTitle title={s.name} text={(await searchParams).created ? "Service created." : undefined}>
        <Link href={`/services/${s.id}`} target="_blank" className={ghost}>
          View on site ↗
        </Link>
      </PageTitle>
      <ServiceForm
        service={s as ServiceRow}
        landingCount={count ?? 0}
        extra={
          <ConfirmButton action={deleteService.bind(null, s.id)} message={`Delete the service “${s.name}”?`}>
            Delete service
          </ConfirmButton>
        }
      />
      <SectionsEditor kind="service" parentId={s.id} sections={sections ?? []} folder={`services/${s.id}`} />
    </>
  );
}
