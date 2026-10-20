import ActionForm from "@/components/admin/ActionForm";
import { card, input, label } from "@/components/admin/ui";
import { saveProject } from "@/lib/admin/actions/projects";

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  division_id: string;
  category: string;
  client_id: string | null;
  client_label: string | null;
  venue: string | null;
  year: string | null;
  summary: string;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
};

type Options = { divisions: { id: string; name: string }[]; clients: { id: string; name: string }[]; categories: string[] };

export default function ProjectForm({ project, options }: { project?: ProjectRow; options: Options }) {
  const p = project;
  return (
    <ActionForm action={saveProject.bind(null, p?.id ?? null)} submit={p ? "Save project" : "Create project"} className={card}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className={label}>Title</span>
          <input name="title" defaultValue={p?.title} required className={input} />
        </label>
        <label>
          <span className={label}>Slug (the web address: /projects/…)</span>
          <input name="slug" defaultValue={p?.slug} placeholder="Made from the title if empty" pattern="[a-z0-9\-]*" className={input} />
        </label>
        <label>
          <span className={label}>Status</span>
          <select name="status" defaultValue={p?.status ?? "draft"} className={input}>
            <option value="published">Published — shown on the website</option>
            <option value="draft">Draft — hidden</option>
          </select>
        </label>
        <label>
          <span className={label}>Division</span>
          <select name="division_id" defaultValue={p?.division_id ?? ""} required className={input}>
            <option value="" disabled>
              Choose
            </option>
            {options.divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={label}>Category (used as a filter)</span>
          <input name="category" defaultValue={p?.category} list="categories" required className={input} />
          <datalist id="categories">
            {options.categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <label>
          <span className={label}>Client shown on the page</span>
          <input name="client_label" defaultValue={p?.client_label ?? ""} className={input} />
        </label>
        <label>
          <span className={label}>Linked client (from the client list)</span>
          <select name="client_id" defaultValue={p?.client_id ?? ""} className={input}>
            <option value="">None</option>
            {options.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={label}>Venue</span>
          <input name="venue" defaultValue={p?.venue ?? ""} className={input} />
        </label>
        <label>
          <span className={label}>Year</span>
          <input name="year" defaultValue={p?.year ?? ""} placeholder="2024 or 2019–2020" className={input} />
        </label>
        <label className="sm:col-span-2">
          <span className={label}>Summary</span>
          <textarea name="summary" defaultValue={p?.summary} rows={4} className={input} />
        </label>
        <label>
          <span className={label}>Position in the landing page “Selected Work”</span>
          <input name="featured_order" type="number" min={1} defaultValue={p?.featured_order ?? ""} placeholder="Empty = not shown" className={input} />
        </label>
        <label>
          <span className={label}>Order in lists (lower comes first)</span>
          <input name="sort_order" type="number" defaultValue={p?.sort_order ?? 0} className={input} />
        </label>
        <label className="flex items-center gap-3 sm:col-span-2">
          <input name="is_featured" type="checkbox" defaultChecked={p?.is_featured} className="h-4 w-4 accent-umber" />
          <span className="text-sm">Show first on its division page</span>
        </label>
      </div>
    </ActionForm>
  );
}
