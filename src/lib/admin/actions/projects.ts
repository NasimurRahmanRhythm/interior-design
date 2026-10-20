"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth";
import { failed, number, optional, text } from "../form";
import type { Result } from "../result";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export async function saveProject(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const title = text(form, "title");
  const slug = slugify(text(form, "slug") || title);
  const featuredOrder = number(form, "featured_order");
  const row = {
    title,
    slug,
    division_id: text(form, "division_id"),
    category: text(form, "category"),
    client_id: optional(form, "client_id"),
    client_label: optional(form, "client_label"),
    venue: optional(form, "venue"),
    year: optional(form, "year"),
    summary: text(form, "summary"),
    status: text(form, "status") === "draft" ? "draft" : "published",
    is_featured: form.get("is_featured") === "on",
    featured_order: featuredOrder,
    sort_order: number(form, "sort_order") ?? 0,
  };
  if (!title) return { error: "Add a title." };
  if (!slug) return { error: "Add a slug (letters, numbers and dashes)." };
  if (!row.division_id) return { error: "Choose a division." };
  if (!row.category) return { error: "Add a category." };

  if (id) {
    const { error } = await supabase.from("projects").update(row).eq("id", id);
    if (error) return failed(error);
    refresh();
    return { ok: true };
  }
  const { data, error } = await supabase.from("projects").insert(row).select("id").single();
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
