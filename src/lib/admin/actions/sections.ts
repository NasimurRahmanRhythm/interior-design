"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, json, text } from "../form";
import type { Result } from "../result";

// Subsections (title, description, image) on a project or a service.
export type SectionKind = "project" | "service";
const TABLE = { project: "project_sections", service: "division_sections" } as const;
const PARENT = { project: "project_id", service: "division_id" } as const;

export async function saveSection(kind: SectionKind, parentId: string, id: string | null, _prev: Result, form: FormData): Promise<Result> {
  if (!(kind in TABLE)) return { error: "Unknown section." };
  const { supabase } = await requireAdmin();
  const row = {
    title: text(form, "title"),
    description: text(form, "description"),
    image_path: json<string | null>(form, "image_path") || null,
  };
  if (!row.title) return { error: "Add a title for the subsection." };

  if (id) {
    const { error } = await supabase.from(TABLE[kind]).update(row).eq("id", id).eq(PARENT[kind], parentId);
    if (error) return failed(error);
  } else {
    const { data: last } = await supabase
      .from(TABLE[kind])
      .select("sort_order")
      .eq(PARENT[kind], parentId)
      .order("sort_order", { ascending: false })
      .limit(1);
    const { error } = await supabase.from(TABLE[kind]).insert({ ...row, [PARENT[kind]]: parentId, sort_order: (last?.[0]?.sort_order ?? -1) + 1 });
    if (error) return failed(error);
  }
  refresh();
  return { ok: true, message: id ? "Saved." : "Subsection added." };
}

export async function deleteSection(kind: SectionKind, id: string) {
  if (!(kind in TABLE)) return;
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(TABLE[kind]).delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
