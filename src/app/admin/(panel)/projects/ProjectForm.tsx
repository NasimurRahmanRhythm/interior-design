import ActionForm from "@/components/admin/ActionForm";
import { card, input, label } from "@/components/admin/ui";
import { saveProject } from "@/lib/admin/actions/projects";
import { LANDING_PROJECTS } from "@/lib/db/queries";

export type ProjectRow = { id: string; title: string; division_id: string; summary: string; featured_order: number | null };

type Props = { project?: ProjectRow; divisions: { id: string; name: string }[]; landingCount: number };

export default function ProjectForm({ project: p, divisions, landingCount }: Props) {
  return (
    <ActionForm action={saveProject.bind(null, p?.id ?? null)} submit={p ? "Save project" : "Create project"} className={card}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={label}>Title</span>
          <input name="title" defaultValue={p?.title} required maxLength={200} className={input} />
        </label>
        <label>
          <span className={label}>Service</span>
          <select name="division_id" defaultValue={p?.division_id ?? ""} required className={input}>
            <option value="" disabled>
              Choose
            </option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className={label}>Description (optional)</span>
          <textarea name="summary" defaultValue={p?.summary} rows={4} className={input} />
        </label>
        <label className="flex items-start gap-3 sm:col-span-2">
          <input name="landing" type="checkbox" defaultChecked={p?.featured_order != null} className="mt-0.5 h-4 w-4 accent-umber" />
          <span className="text-sm">
            Show on the landing page
            <span className="block text-xs text-ink/55">
              {landingCount} of {LANDING_PROJECTS} places used. A project needs at least one photo to show there.
            </span>
          </span>
        </label>
      </div>
    </ActionForm>
  );
}
