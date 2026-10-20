import type { Metadata } from "next";
import PageTitle from "@/components/admin/PageTitle";
import { requireAdmin } from "@/lib/admin/auth";
import ServiceForm from "../ServiceForm";

export const metadata: Metadata = { title: "New service" };

export default async function NewService() {
  const { supabase } = await requireAdmin();
  const { count } = await supabase.from("divisions").select("id", { count: "exact", head: true }).not("featured_order", "is", null);
  return (
    <>
      <PageTitle title="New service" />
      <ServiceForm landingCount={count ?? 0} />
    </>
  );
}
