"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { LANDING_SERVICES } from "@/lib/db/queries";
import { requireAdmin } from "../auth";
import { failed, json, text } from "../form";
import { landingOrder, uniqueSlug } from "../landing";
import type { Result } from "../result";

// The two heading lines on the service page: the first word, then the rest.
const headingLines = (title: string) => {
  const [first, ...rest] = title.split(/\s+/);
  return { title_line1: first, title_line2: rest.join(" ") };
};

export async function saveService(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const title = text(form, "title");
  const short = text(form, "short");
  if (!title) return { error: "Add a title." };
  if (!short) return { error: "Add a short description." };

  const landing = await landingOrder(supabase, "divisions", id, form.get("landing") === "on", LANDING_SERVICES);
  if ("error" in landing) return { error: landing.error };
  const cover = json<string | null>(form, "cover_image") || null;

  if (id) {
    const { data: old, error: readError } = await supabase.from("divisions").select("name, card_short, intro").eq("id", id).single();
    if (readError) return failed(readError);
    const row: Record<string, unknown> = { name: title, card_title: title, card_short: short, cover_image: cover, featured_order: landing.order };
    // The heading follows the title only when the title changes, so the original services keep theirs.
    if (old.name !== title) Object.assign(row, headingLines(title));
    // Services added here use the short description as their introduction too.
    if (old.intro === old.card_short) row.intro = short;
    const { error } = await supabase.from("divisions").update(row).eq("id", id);
    if (error) return failed(error);
    refresh();
    return { ok: true };
  }

  const { data: last } = await supabase.from("divisions").select("sort_order").order("sort_order", { ascending: false }).limit(1);
  const { count } = await supabase.from("divisions").select("id", { count: "exact", head: true });
  const newId = await uniqueSlug(supabase, "divisions", title);
  const { error } = await supabase.from("divisions").insert({
    id: newId,
    number: String((count ?? 0) + 1).padStart(2, "0"),
    name: title,
    card_title: title,
    card_short: short,
    intro: short,
    ...headingLines(title),
    cover_image: cover,
    featured_order: landing.order,
    sort_order: (last?.[0]?.sort_order ?? -1) + 1,
  });
  if (error) return failed(error);
  redirect(`/admin/services/${newId}?created=1`);
}

export async function deleteService(id: string): Promise<Result> {
  const { supabase } = await requireAdmin();
  const { count } = await supabase.from("projects").select("id", { count: "exact", head: true }).eq("division_id", id);
  if (count) return { error: `This service has ${count} project${count === 1 ? "" : "s"}. Move them to another service or delete them first.` };
  const { error } = await supabase.from("divisions").delete().eq("id", id);
  if (error) return failed(error);
  redirect("/admin/services");
}
