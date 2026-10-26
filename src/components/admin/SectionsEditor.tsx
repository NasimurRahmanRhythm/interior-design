import ActionForm from "./ActionForm";
import ConfirmButton from "./ConfirmButton";
import ImageInput from "./ImageInput";
import { card, input, label } from "./ui";
import { deleteSection, saveSection, type SectionKind } from "@/lib/admin/actions/sections";

type Section = { id: string; title: string; description: string; image_path: string | null };

function Fields({ s, folder }: { s?: Section; folder: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
      <div className="grid gap-4">
        <label>
          <span className={label}>Title</span>
          <input name="title" defaultValue={s?.title} required maxLength={200} className={input} />
        </label>
        <label>
          <span className={label}>Description</span>
          <textarea name="description" defaultValue={s?.description} rows={4} className={input} />
        </label>
      </div>
      <div>
        <span className={label}>Image</span>
        <ImageInput name="image_path" value={s?.image_path ?? null} folder={folder} />
      </div>
    </div>
  );
}

// Extra blocks shown on the project or service page, in this order.
export default function SectionsEditor({ kind, parentId, sections, folder }: { kind: SectionKind; parentId: string; sections: Section[]; folder: string }) {
  return (
    <section className={`${card} mt-8`}>
      <h2 className="font-serif text-2xl">Subsections</h2>
      <p className="mt-1 text-sm text-ink/60">Extra blocks on the {kind} page, each with a title, a description and an image.</p>
      <ul className="mt-6 flex flex-col gap-4">
        {sections.map((s, i) => (
          <li key={s.id} className="rounded-sm border border-ink/10 bg-bone/60 p-4">
            <p className="t-label mb-3 text-ink/40">{i + 1}</p>
            <ActionForm
              action={saveSection.bind(null, kind, parentId, s.id)}
              extra={
                <ConfirmButton action={deleteSection.bind(null, kind, s.id)} message={`Delete the subsection “${s.title}”?`}>
                  Delete
                </ConfirmButton>
              }
            >
              <Fields s={s} folder={folder} />
            </ActionForm>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-sm border border-dashed border-ink/25 p-4">
        <p className="t-label mb-3 text-ink/60">Add subsection</p>
        <ActionForm action={saveSection.bind(null, kind, parentId, null)} submit="Add subsection" clearOnSuccess>
          <Fields folder={folder} />
        </ActionForm>
      </div>
    </section>
  );
}
