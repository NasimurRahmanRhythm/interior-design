"use server";

import { refresh } from "next/cache";
import { requireAdmin } from "../auth";
import { failed, text } from "../form";
import { inBangladesh, locate } from "../locate";
import type { Result } from "../result";

export async function saveMapPoint(id: string | null, _prev: Result, form: FormData): Promise<Result> {
  const title = text(form, "title");
  const link = text(form, "link");
  if (!title) return { error: "Add a title — it shows when someone points at the place." };
  if (!link) return { error: "Paste the Google Maps link of the place." };

  const place = await locate(link);
  if (!place) {
    return { error: "Could not find the location in that link. In Google Maps, open the place and copy the link from Share or the address bar." };
  }
  if (!inBangladesh(place)) return { error: `That link points to ${place.lat.toFixed(4)}, ${place.lon.toFixed(4)}, which is outside Bangladesh.` };

  const { supabase } = await requireAdmin();
  const row = { title, link, lat: place.lat, lon: place.lon };
  const { error } = id ? await supabase.from("map_points").update(row).eq("id", id) : await supabase.from("map_points").insert(row);
  if (error) return failed(error);
  refresh();
  return { ok: true, message: id ? "Saved." : "Added to the map." };
}

export async function deleteMapPoint(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("map_points").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
