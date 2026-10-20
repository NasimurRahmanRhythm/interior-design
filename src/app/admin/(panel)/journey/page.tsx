import type { Metadata } from "next";
import ActionForm from "@/components/admin/ActionForm";
import JsonEditor from "@/components/admin/JsonEditor";
import PageTitle from "@/components/admin/PageTitle";
import { card } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { saveJourney } from "@/lib/admin/actions/catalog";

export const metadata: Metadata = { title: "Journey" };

export default async function Journey() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("journey_milestones").select("year, title, detail, image_path").order("sort_order");
  if (error) throw new Error(error.message);
  return (
    <>
      <PageTitle title="Journey" text="The milestones on the spiral, from the centre (first) outward (last). A photo shows beside the milestone on large screens." />
      <ActionForm action={saveJourney} submit="Save journey" className={card}>
        <JsonEditor name="value" value={data} folder="journey" />
      </ActionForm>
    </>
  );
}
