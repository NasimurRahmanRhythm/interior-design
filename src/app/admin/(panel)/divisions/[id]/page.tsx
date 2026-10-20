import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionForm from "@/components/admin/ActionForm";
import ImageInput from "@/components/admin/ImageInput";
import JsonEditor from "@/components/admin/JsonEditor";
import PageTitle from "@/components/admin/PageTitle";
import { card, ghost, input, label } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { saveDivision } from "@/lib/admin/actions/catalog";

export const metadata: Metadata = { title: "Edit division" };

const SCENES = [
  { id: "stage", label: "Event stage" },
  { id: "stall", label: "Expo stall" },
  { id: "room", label: "Office room" },
  { id: "brand", label: "Print & promo items" },
];

export default async function EditDivision({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: d } = await supabase
    .from("divisions")
    .select("*, division_service_groups(title, items, sort_order), division_figures(value, label, sort_order)")
    .eq("id", id)
    .maybeSingle();
  if (!d) notFound();
  const bySort = (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order;
  const groups = [...d.division_service_groups].sort(bySort).map((g) => ({ title: g.title, items: g.items }));
  const figures = [...d.division_figures].sort(bySort).map((f) => ({ value: f.value, label: f.label }));

  const field = (name: string, title: string, long = false) => (
    <label className={long ? "sm:col-span-2" : ""}>
      <span className={label}>{title}</span>
      {long ? <textarea name={name} defaultValue={d[name] ?? ""} rows={3} className={input} /> : <input name={name} defaultValue={d[name] ?? ""} className={input} />}
    </label>
  );

  return (
    <>
      <PageTitle title={d.name}>
        <Link href={`/services/${d.id}`} target="_blank" className={ghost}>
          View on site ↗
        </Link>
      </PageTitle>
      <ActionForm action={saveDivision.bind(null, d.id)} submit="Save division" className="flex flex-col gap-8">
        <section className={card}>
          <h2 className="mb-5 font-serif text-2xl">Division page</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name")}
            {field("number", "Number")}
            {field("title_line1", "Heading, first line")}
            {field("title_line2", "Heading, second line (italic)")}
            {field("tagline", "Tagline", true)}
            {field("intro", "Introduction", true)}
            <label>
              <span className={label}>3D scene</span>
              <select name="scene" defaultValue={d.scene} className={input}>
                {SCENES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={label}>Order (lower comes first)</span>
              <input name="sort_order" type="number" defaultValue={d.sort_order} className={input} />
            </label>
          </div>
        </section>

        <section className={card}>
          <h2 className="mb-5 font-serif text-2xl">Card on the 360° ring</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("card_title", "Short name")}
            {field("card_short", "One line")}
            <label className="sm:col-span-2">
              <span className={label}>Services under the ring, one per line</span>
              <textarea name="card_services" defaultValue={d.card_services.join("\n")} rows={6} className={input} />
            </label>
            <div className="sm:col-span-2">
              <span className={label}>Cover photo</span>
              <ImageInput name="cover_image" value={d.cover_image} folder="divisions" />
            </div>
          </div>
        </section>

        <section className={card}>
          <h2 className="mb-1 font-serif text-2xl">What we do</h2>
          <p className="mb-5 text-sm text-ink/60">Service groups on the division page.</p>
          <JsonEditor name="groups" value={groups} />
        </section>

        <section className={card}>
          <h2 className="mb-5 font-serif text-2xl">Figures</h2>
          <JsonEditor name="figures" value={figures} />
        </section>

        <section className={card}>
          <h2 className="mb-1 font-serif text-2xl">Extra list</h2>
          <p className="mb-5 text-sm text-ink/60">Optional, e.g. the expos we build for. Leave the title empty to hide it.</p>
          <div className="grid gap-5">
            {field("extra_title", "Title")}
            <label>
              <span className={label}>Items, one per line</span>
              <textarea name="extra_items" defaultValue={d.extra_items.join("\n")} rows={6} className={input} />
            </label>
          </div>
        </section>
      </ActionForm>
    </>
  );
}
