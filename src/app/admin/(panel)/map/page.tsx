import type { Metadata } from "next";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { card, input, label } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteMapPoint, saveMapPoint } from "@/lib/admin/actions/map";
import { saveSettings } from "@/lib/admin/actions/content";
import JsonEditor from "@/components/admin/JsonEditor";
import { BD_PATH, BD_VIEWBOX, project } from "@/lib/bangladesh";

export const metadata: Metadata = { title: "Map" };

type Point = { id: string; title: string; link: string; lat: number; lon: number };

function Fields({ p }: { p?: Point }) {
  return (
    <div className="grid gap-4">
      <label>
        <span className={label}>Title (shows on hover)</span>
        <input name="title" defaultValue={p?.title} required maxLength={200} placeholder="e.g. Office interior, Gulshan" className={input} />
      </label>
      <label>
        <span className={label}>Google Maps link</span>
        <input name="link" defaultValue={p?.link} required placeholder="https://maps.app.goo.gl/…" className={input} />
      </label>
    </div>
  );
}

export default async function MapPage() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, { data: settings }] = await Promise.all([
    supabase.from("map_points").select("id, title, link, lat, lon").order("created_at"),
    supabase.from("site_settings").select("reach").eq("id", 1).single(),
  ]);
  if (error) throw new Error(error.message);
  const points = data as Point[];

  return (
    <>
      <PageTitle
        title="Map"
        text="Places on the landing page map of Bangladesh. Paste a Google Maps link and the point goes on that spot; its title shows when someone points at it."
      />
      <div className="grid gap-8 xl:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-4">
          <section className={card}>
            <h2 className="font-serif text-2xl">Figures beside the map</h2>
            <p className="mb-5 mt-1 text-sm text-ink/60">The big numbers next to the map, e.g. 18 malls and 20+ newspapers.</p>
            <ActionForm action={saveSettings.bind(null, "reach")} submit="Save figures">
              <JsonEditor name="value" value={settings?.reach ?? { figures: [] }} hide={["pins", "cities"]} />
            </ActionForm>
          </section>
          <section className={card}>
            <h2 className="mb-4 font-serif text-2xl">Add a place</h2>
            <ActionForm action={saveMapPoint.bind(null, null)} submit="Add to map" clearOnSuccess>
              <Fields />
            </ActionForm>
          </section>
          {points.map((p, i) => (
            <section key={p.id} className={card}>
              <p className="t-label mb-3 text-ink/50">
                {i + 1} · {p.lat.toFixed(5)}, {p.lon.toFixed(5)} ·{" "}
                <a href={p.link} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  Open in Google Maps ↗
                </a>
              </p>
              <ActionForm
                action={saveMapPoint.bind(null, p.id)}
                extra={
                  <ConfirmButton action={deleteMapPoint.bind(null, p.id)} message={`Remove “${p.title}” from the map?`}>
                    Delete
                  </ConfirmButton>
                }
              >
                <Fields p={p} />
              </ActionForm>
            </section>
          ))}
        </div>

        <aside className={`${card} self-start xl:sticky xl:top-10`}>
          <p className="t-label mb-3 text-ink/50">Preview</p>
          <svg viewBox={`0 0 ${BD_VIEWBOX.width} ${BD_VIEWBOX.height}`} className="h-auto w-full" role="img" aria-label="Preview of the places on the map">
            <path d={BD_PATH} fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.1" />
            {points.map((p, i) => {
              const [x, y] = project(p.lat, p.lon);
              return (
                <g key={p.id}>
                  <title>{p.title}</title>
                  <circle cx={x} cy={y} r="11" fill="#7b5136" />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="#f1eade">
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </aside>
      </div>
    </>
  );
}
