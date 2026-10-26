import ActionForm from "./ActionForm";
import ImageInput from "./ImageInput";
import RichEditor from "./RichEditor";
import { card, input, label } from "./ui";
import type { Result } from "@/lib/admin/result";

export type Writing = { id: string; title: string; body: string; image_path: string | null };

type Props = {
  action: (prev: Result, form: FormData) => Promise<Result>;
  item?: Writing;
  folder: string;
  submit: string;
  titleLabel?: string;
  extra?: React.ReactNode;
};

// Title, one image and rich text: blog posts and client appreciation.
export default function WritingForm({ action, item, folder, submit, titleLabel = "Title", extra }: Props) {
  return (
    <ActionForm action={action} submit={submit} className={card} extra={extra}>
      <div className="grid gap-5">
        <label>
          <span className={label}>{titleLabel}</span>
          <input name="title" defaultValue={item?.title} required maxLength={200} className={input} />
        </label>
        <div>
          <span className={label}>Image (one, optional)</span>
          <ImageInput name="image_path" value={item?.image_path ?? null} folder={folder} />
        </div>
        <div>
          <span className={label}>Text</span>
          <RichEditor name="body" value={item?.body} />
        </div>
      </div>
    </ActionForm>
  );
}
