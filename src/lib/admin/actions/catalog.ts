"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, json, lines, number, optional, text } from "../form";
import type { Result } from "../result";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

// Replaces the rows of a list: the new rows go in first and the old ones are
// removed only once that worked, so a failed save leaves the list as it was.
async function replaceRows(supabase: Supabase, table: string, match: Record<string, string> | null, rows: Record<string, unknown>[]) {
  let old = supabase.from(table).select("id");
  if (match) old = old.match(match);
  const { data: before, error: readError } = await old;
  if (readError) return readError;
  if (rows.length) {
    const { error } = await supabase.from(table).insert(rows);
    if (error) return error;
  }
  const ids = (before ?? []).map((r: { id: string }) => r.id);
  if (ids.length) {
    const { error } = await supabase.from(table).delete().in("id", ids);
    if (error) return error;
  }
  return null;
}

const SCENES = ["stage", "stall", "room", "brand"];

export async function saveDivision(id: string, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const row = {
    number: text(form, "number"),
    name: text(form, "name"),
    title_line1: text(form, "title_line1"),
    title_line2: text(form, "title_line2"),
    tagline: text(form, "tagline"),
    intro: text(form, "intro"),
    card_title: text(form, "card_title"),
    card_short: text(form, "card_short"),
    card_services: lines(form, "card_services"),
    cover_image: json<string | null>(form, "cover_image") || null,
    scene: SCENES.includes(text(form, "scene")) ? text(form, "scene") : "room",
    extra_title: optional(form, "extra_title"),
    extra_items: lines(form, "extra_items"),
    sort_order: number(form, "sort_order") ?? 0,
  };
  for (const key of ["number", "name", "title_line1", "title_line2", "tagline", "intro", "card_title", "card_short"] as const) {
    if (!row[key]) return { error: "Fill in every text field of the division." };
  }
  const { error } = await supabase.from("divisions").update(row).eq("id", id);
  if (error) return failed(error);

  const groups = json<{ title: string; items: string[] }[]>(form, "groups")
    .map((g) => ({ title: g.title.trim(), items: g.items.map((s) => s.trim()).filter(Boolean) }))
    .filter((g) => g.title);
  const groupError = await replaceRows(
    supabase,
    "division_service_groups",
    { division_id: id },
    groups.map((g, i) => ({ division_id: id, title: g.title, items: g.items, sort_order: i }))
  );
  if (groupError) return failed(groupError);

  const figures = json<{ value: string; label: string }[]>(form, "figures").filter((f) => f.value.trim() && f.label.trim());
  const figureError = await replaceRows(
    supabase,
    "division_figures",
    { division_id: id },
    figures.map((f, i) => ({ division_id: id, value: f.value.trim(), label: f.label.trim(), sort_order: i }))
  );
  if (figureError) return failed(figureError);

  refresh();
  return { ok: true };
}

export async function saveClient(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const marquee = form.get("show_in_marquee") === "on";
  const row = {
    name: text(form, "name"),
    industry: optional(form, "industry"),
    show_in_marquee: marquee,
    marquee_row: marquee ? (number(form, "marquee_row") === 2 ? 2 : 1) : null,
    marquee_order: marquee ? number(form, "marquee_order") ?? 0 : null,
    sort_order: number(form, "sort_order") ?? 0,
  };
  if (!row.name) return { error: "Add the client's name." };
  const { error } = id ? await supabase.from("clients").update(row).eq("id", id) : await supabase.from("clients").insert(row);
  if (error) return failed(error);
  refresh();
  return { ok: true, message: id ? "Saved." : "Client added." };
}

export async function deleteClient(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveJourney(_prev: Result, form: FormData): Promise<Result> {
  const { supabase } = await requireAdmin();
  const items = json<{ year: string; title: string; detail: string; image_path: string | null }[]>(form, "value");
  const rows = items
    .map((m, i) => ({ year: m.year.trim(), title: m.title.trim(), detail: m.detail.trim(), image_path: m.image_path || null, sort_order: i }))
    .filter((m) => m.year && m.title);
  if (rows.length < 2) return { error: "The journey needs at least two milestones." };
  const error = await replaceRows(supabase, "journey_milestones", null, rows);
  if (error) return failed(error);
  refresh();
  return { ok: true };
}
