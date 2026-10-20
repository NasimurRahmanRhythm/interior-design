import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { ghost } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteProject } from "@/lib/admin/actions/projects";
import { projectOptions } from "../form-data";
import ProjectForm, { type ProjectRow } from "../ProjectForm";
import ProjectImages from "./ProjectImages";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProject({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_images(id, path, width, height, alt, sort_order)")
    .eq("id", id)
    .maybeSingle();
  if (!project) notFound();
  const images = [...project.project_images].sort((a, b) => a.sort_order - b.sort_order);
  const created = Boolean((await searchParams).created);

  return (
    <>
      <PageTitle title={project.title} text={created ? "Project created. Add its photos below, then publish it." : undefined}>
        {project.status === "published" && (
          <Link href={`/projects/${project.slug}`} target="_blank" className={ghost}>
            View on site ↗
          </Link>
        )}
        <ConfirmButton action={deleteProject.bind(null, project.id)} message={`Delete “${project.title}” and its photo list?`}>
          Delete project
        </ConfirmButton>
      </PageTitle>
      <ProjectForm project={project as ProjectRow} options={await projectOptions(supabase)} />
      <ProjectImages projectId={project.id} slug={project.slug} title={project.title} images={images} />
    </>
  );
}
