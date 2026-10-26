"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { cleanHtml, isEmptyHtml } from "@/lib/richtext";
import { requireAdmin } from "../auth";
import { failed, json, text } from "../form";
import { uniqueSlug } from "../landing";
import type { Result } from "../result";

// Blog posts and client appreciation share one shape: a title, rich text and one image.
function read(form: FormData) {
  const body = cleanHtml(String(form.get("body") ?? ""));
  return {
    title: text(form, "title"),
    body: isEmptyHtml(body) ? "" : body,
    image_path: json<string | null>(form, "image_path") || null,
  };
}

export async function savePost(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const row = read(form);
  if (!row.title) return { error: "Add a title." };
  if (!row.body) return { error: "Write the post." };
  if (id) {
    const { error } = await supabase.from("blog_posts").update(row).eq("id", id);
    if (error) return failed(error);
    refresh();
    return { ok: true };
  }
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ ...row, slug: await uniqueSlug(supabase, "blog_posts", row.title) })
    .select("id")
    .single();
  if (error) return failed(error);
  redirect(`/admin/blog/${data.id}?created=1`);
}

export async function deletePost(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/blog");
}

export async function saveAppreciation(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const row = read(form);
  if (!row.title) return { error: "Add a title, e.g. the client's name." };
  if (!row.body) return { error: "Write what the client said." };
  if (id) {
    const { error } = await supabase.from("appreciations").update(row).eq("id", id);
    if (error) return failed(error);
    refresh();
    return { ok: true };
  }
  const { data, error } = await supabase.from("appreciations").insert(row).select("id").single();
  if (error) return failed(error);
  redirect(`/admin/appreciation/${data.id}?created=1`);
}

export async function deleteAppreciation(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("appreciations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/appreciation");
}
