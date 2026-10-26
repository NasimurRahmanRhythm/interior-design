import Link from "next/link";
import { mediaUrl } from "@/lib/db/media";

type Item = { id: string; title: string; image_path: string | null; created_at: string };

// The list of blog posts or appreciations in the admin.
export default function WritingList({ items, base, empty }: { items: Item[]; base: string; empty: string }) {
  if (!items.length) return <p className="text-sm text-ink/60">{empty}</p>;
  return (
    <ul className="divide-y divide-ink/10 rounded-sm border border-ink/10 bg-white/70">
      {items.map((p) => (
        <li key={p.id}>
          <Link href={`${base}/${p.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-bone">
            <span className="h-12 w-16 shrink-0 overflow-hidden rounded-sm bg-ink/10">
              {p.image_path && <img src={mediaUrl(p.image_path)} alt="" className="h-full w-full object-cover" loading="lazy" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{p.title}</span>
              <span className="block text-xs text-ink/55">
                {new Date(p.created_at).toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "Asia/Dhaka" })}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
