"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth";
import { LANDING_PROJECTS } from "@/lib/db/queries";
import { failed, text } from "../form";
import { landingOrder, uniqueSlug } from "../landing";
import type { Result } from "../result";

export async function saveProject(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const title = text(form, "title");
  const division = text(form, "division_id");
  if (!title) return { error: "Add a title." };
  if (!division) return { error: "Choose a service." };

  const landing = await landingOrder(supabase, "projects", id, form.get("landing") === "on", LANDING_PROJECTS);
  if ("error" in landing) return { error: landing.error };
  const row = { title, division_id: division, summary: text(form, "summary"), featured_order: landing.order };

  if (id) {
    const { error } = await supabase.from("projects").update(row).eq("id", id);
    if (error) return failed(error);
    refresh();
    return { ok: true };
  }

  // New projects come first in the lists.
  const { data: first } = await supabase.from("projects").select("sort_order").order("sort_order").limit(1);
  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...row,
      slug: await uniqueSlug(supabase, "projects", title),
      status: "published",
      sort_order: (first?.[0]?.sort_order ?? 1) - 1,
    })
    .select("id")
    .single();
  if (error) return failed(error);
  redirect(`/admin/projects/${data.id}?created=1`);
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/projects");
}

export type NewImage = { path: string; width: number; height: number; alt: string };

// Photos are uploaded from the browser first; this records them on the project.
export async function addProjectImages(projectId: string, images: NewImage[]): Promise<Result> {
  const { supabase } = await requireAdmin();
  const { data: last } = await supabase
    .from("project_images")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1);
  const start = (last?.[0]?.sort_order ?? -1) + 1;
  const rows = images.map((img, i) => ({
    project_id: projectId,
    path: img.path,
    width: Math.max(1, Math.round(img.width)),
    height: Math.max(1, Math.round(img.height)),
    alt: img.alt.slice(0, 300),
    sort_order: start + i,
  }));
  const { error } = await supabase.from("project_images").insert(rows);
  if (error) return failed(error);
  refresh();
  return { ok: true };
}

// Saves the photo order (the first is the cover) and their descriptions.
export async function saveProjectImages(projectId: string, images: { id: string; alt: string }[]): Promise<Result> {
  const { supabase } = await requireAdmin();
  for (const [i, img] of images.entries()) {
    const { error } = await supabase
      .from("project_images")
      .update({ sort_order: i, alt: img.alt.slice(0, 300) })
      .eq("id", img.id)
      .eq("project_id", projectId);
    if (error) return failed(error);
  }
  refresh();
  return { ok: true, message: "Photos saved." };
}

// Removes a photo from the project. The file stays in storage, since the same
// image can also be used as a hero or division cover.
export async function deleteProjectImage(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
