import type { Metadata } from "next";
import PageTitle from "@/components/admin/PageTitle";
import { requireAdmin } from "@/lib/admin/auth";
import { projectOptions } from "../form-data";
import ProjectForm from "../ProjectForm";

export const metadata: Metadata = { title: "New project" };

export default async function NewProject() {
  const { supabase } = await requireAdmin();
  return (
    <>
      <PageTitle title="New project" text="Save the details first; photos can be added on the next screen." />
      <ProjectForm options={await projectOptions(supabase)} />
    </>
  );
}
