import "server-only";
import { cache } from "react";
import { db } from "./client";
import { mediaUrl } from "./media";
import { COPY } from "@/lib/copy";
import type { Client, Division, MapPoint, Milestone, Project, Settings } from "./types";

function check<T>({ data, error }: { data: T; error: { message: string } | null }, what: string): NonNullable<T> {
  if (error || data === null) throw new Error(`Could not load ${what}: ${error?.message ?? "no rows"}`);
  return data as NonNullable<T>;
}

export const getSettings = cache(async (): Promise<Settings> => {
  const s = check(await (await db()).from("site_settings").select("*").eq("id", 1).single(), "site settings");
  return {
    brand: s.brand,
    contact: s.contact,
    socials: s.socials,
    nav: s.nav,
    trust: s.trust_stats,
    heroPanels: s.hero_panels.map((p: { image: string; alt: string }) => ({ image: mediaUrl(p.image), alt: p.alt })),
    quote: s.quote_options,
  };
});

export const getDivisions = cache(async (): Promise<Division[]> => {
  const rows = check(
    await (await db())
      .from("divisions")
      .select("*, division_service_groups(title, items, sort_order), division_figures(value, label, sort_order)")
      .order("sort_order"),
    "divisions"
  );
  const bySort = (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order;
  return rows.map((d: any) => ({
    id: d.id,
    number: d.number,
    name: d.name,
    title: [d.title_line1, d.title_line2],
    line: d.tagline,
    intro: d.intro,
    scene: d.scene,
    card: { title: d.card_title, short: d.card_short, services: d.card_services, image: mediaUrl(d.cover_image) ?? "" },
    groups: [...d.division_service_groups].sort(bySort).map((g) => ({ title: g.title, items: g.items })),
    figures: [...d.division_figures].sort(bySort).map((f) => ({ value: f.value, label: f.label })),
    extra: d.extra_title ? { title: d.extra_title, items: d.extra_items } : undefined,
    featuredOrder: d.featured_order,
  }));
});

// Landing page limits for "Show on landing page" in the admin.
export const LANDING_SERVICES = 5;
export const LANDING_PROJECTS = 7;

// The services on the landing page ring, in their landing order.
export async function getFeaturedDivisions() {
  return (await getDivisions())
    .filter((d) => d.featuredOrder !== null)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
    .slice(0, LANDING_SERVICES);
}

export async function getDivision(id: string) {
  return (await getDivisions()).find((d) => d.id === id);
}

const PROJECT_FIELDS =
  "slug, title, division_id, category, client_label, venue, year, summary, is_featured, featured_order, project_images(path, width, height, alt, sort_order)";

function toProject(p: any): Project {
  return {
    slug: p.slug,
    title: p.title,
    division: p.division_id,
    category: p.category,
    client: p.client_label ?? undefined,
    venue: p.venue ?? undefined,
    year: p.year ?? undefined,
    summary: p.summary,
    featured: p.is_featured,
    images: [...p.project_images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => ({ src: mediaUrl(i.path), w: i.width, h: i.height, alt: i.alt })),
  };
}

// Published projects only; drafts are hidden by row level security.
export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = check(await (await db()).from("projects").select(PROJECT_FIELDS).order("sort_order"), "projects");
  return rows.map(toProject);
});

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getFeaturedProjects() {
  const rows = check(
    await (await db()).from("projects").select(PROJECT_FIELDS).not("featured_order", "is", null).order("featured_order").limit(LANDING_PROJECTS),
    "featured projects"
  );
  return rows.map(toProject);
}

export const getClients = cache(async (): Promise<(Client & { marqueeOrder: number | null })[]> => {
  const rows = check(
    await (await db()).from("clients").select("name, industry, marquee_row, marquee_order").order("sort_order"),
    "clients"
  );
  return rows.map((c: { name: string; industry: string | null; marquee_row: number | null; marquee_order: number | null }) => ({
    name: c.name,
    industry: c.industry,
    marqueeRow: c.marquee_row,
    marqueeOrder: c.marquee_order,
  }));
});

// The two marquee rows on the landing page.
export async function getMarquee(): Promise<string[][]> {
  const clients = (await getClients()).filter((c) => c.marqueeRow !== null);
  return [1, 2].map((row) =>
    clients
      .filter((c) => c.marqueeRow === row)
      .sort((a, b) => (a.marqueeOrder ?? 0) - (b.marqueeOrder ?? 0))
      .map((c) => c.name)
  );
}

// Clients grouped by industry, in their saved order.
export async function getClientGroups(): Promise<{ title: string; names: string[] }[]> {
  const groups = new Map<string, string[]>();
  for (const c of await getClients()) {
    if (!c.industry) continue;
    groups.set(c.industry, [...(groups.get(c.industry) ?? []), c.name]);
  }
  return [...groups].map(([title, names]) => ({ title, names }));
}

export const getJourney = cache(async (): Promise<Milestone[]> => {
  const rows = check(
    await (await db()).from("journey_milestones").select("year, title, detail, image_path").order("sort_order"),
    "journey"
  );
  return rows.map((m: { year: string; title: string; detail: string; image_path: string | null }) => ({
    year: m.year,
    title: m.title,
    detail: m.detail,
    image: mediaUrl(m.image_path),
  }));
});

export const getMapPoints = cache(async (): Promise<MapPoint[]> => {
  const rows = check(await (await db()).from("map_points").select("id, title, lat, lon").order("created_at"), "map points");
  return rows as MapPoint[];
});

// Choices for the quote form: the services, then budgets and timelines from settings.
export async function getQuote(): Promise<Settings["quote"]> {
  const [settings, divisions] = await Promise.all([getSettings(), getDivisions()]);
  return { ...settings.quote, divisions: [...divisions.map((d) => d.card.title), COPY.home.contact.not_sure] };
}
