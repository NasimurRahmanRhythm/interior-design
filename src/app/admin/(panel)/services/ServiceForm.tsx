import ActionForm from "@/components/admin/ActionForm";
import ImageInput from "@/components/admin/ImageInput";
import { card, input, label } from "@/components/admin/ui";
import { saveService } from "@/lib/admin/actions/services";
import { LANDING_SERVICES } from "@/lib/db/queries";

export type ServiceRow = { id: string; name: string; card_short: string; cover_image: string | null; featured_order: number | null };

export default function ServiceForm({ service: s, landingCount, extra }: { service?: ServiceRow; landingCount: number; extra?: React.ReactNode }) {
  return (
    <ActionForm action={saveService.bind(null, s?.id ?? null)} submit={s ? "Save service" : "Create service"} className={card} extra={extra}>
      <div className="grid gap-5">
        <label>
          <span className={label}>Title</span>
          <input name="title" defaultValue={s?.name} required maxLength={120} className={input} />
        </label>
        <label>
          <span className={label}>Short description</span>
          <textarea name="short" defaultValue={s?.card_short} required rows={2} maxLength={300} className={input} />
        </label>
        <div>
          <span className={label}>Cover photo</span>
          <ImageInput name="cover_image" value={s?.cover_image ?? null} folder="services" />
        </div>
        <label className="flex items-start gap-3">
          <input name="landing" type="checkbox" defaultChecked={s?.featured_order != null} className="mt-0.5 h-4 w-4 accent-umber" />
          <span className="text-sm">
            Show on the landing page
            <span className="block text-xs text-ink/55">
              {landingCount} of {LANDING_SERVICES} places on the 360° ring used.
            </span>
          </span>
        </label>
      </div>
    </ActionForm>
  );
}
