import type { Metadata } from "next";
import Link from "next/link";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import ImageInput from "@/components/admin/ImageInput";
import PageTitle from "@/components/admin/PageTitle";
import { card, ghost, input, label } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteClient, saveClient } from "@/lib/admin/actions/catalog";
import { paginate, withQuery } from "@/lib/paginate";

export const metadata: Metadata = { title: "Clients" };

const PER_PAGE = 30;

type Client = { id: string; name: string; industry: string | null; logo_path: string | null };

function Fields({ c, industries }: { c?: Client; industries: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr]">
      <label>
        <span className={label}>Name</span>
        <input name="name" defaultValue={c?.name} required className={input} />
      </label>
      <label>
        <span className={label}>Industry (group on /clients)</span>
        <input name="industry" defaultValue={c?.industry ?? ""} list="industries" className={input} />
      </label>
      <div className="sm:col-span-2 lg:col-span-1">
        <span className={label}>Logo (optional, PNG with a transparent background works best)</span>
        <ImageInput name="logo_path" value={c?.logo_path ?? null} folder="clients" contain />
      </div>
    </div>
  );
}

export default async function Clients({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { supabase } = await requireAdmin();
  const { count, error: countError } = await supabase.from("clients").select("id", { count: "exact", head: true });
  if (countError) throw new Error(countError.message);
  const paging = paginate(count ?? 0, (await searchParams).page, PER_PAGE);
  const [{ data, error }, { data: all }] = await Promise.all([
    supabase.from("clients").select("id, name, industry, logo_path").order("sort_order").range(paging.from, paging.from + PER_PAGE - 1),
    supabase.from("clients").select("industry, logo_path"),
  ]);
  if (error) throw new Error(error.message);
  const clients = data as Client[];
  const industries = [...new Set((all ?? []).map((c) => c.industry).filter((i): i is string => Boolean(i)))];
  const withLogo = (all ?? []).filter((c) => c.logo_path).length;
  const href = (n: number) => withQuery("/admin/clients", { page: n > 1 ? n : null });

  return (
    <>
      <PageTitle
        title="Clients"
        text={`${count ?? 0} clients, grouped by industry on the clients page. ${withLogo} have a logo and run in the landing page marquee; a client without a logo is not shown there.`}
      />
      <datalist id="industries">
        {industries.map((i) => (
          <option key={i} value={i} />
        ))}
      </datalist>
      <section className={`${card} mb-8`}>
        <h2 className="mb-4 font-serif text-2xl">Add a client</h2>
        <ActionForm action={saveClient.bind(null, null)} submit="Add client" clearOnSuccess>
          <Fields industries={industries} />
        </ActionForm>
      </section>
      <ul className="flex flex-col gap-3">
        {clients.map((c) => (
          <li key={c.id} className={card}>
            <ActionForm
              action={saveClient.bind(null, c.id)}
              extra={
                <ConfirmButton action={deleteClient.bind(null, c.id)} message={`Delete ${c.name}? Projects linked to it keep their client text.`}>
                  Delete
                </ConfirmButton>
              }
            >
              <Fields c={c} industries={industries} />
            </ActionForm>
          </li>
        ))}
      </ul>

      {paging.pages > 1 && (
        <nav className="mt-6 flex items-center justify-between gap-4" aria-label="Pages">
          {paging.page > 1 ? (
            <Link href={href(paging.page - 1)} className={ghost}>
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-ink/60">
            Page {paging.page} of {paging.pages}
          </span>
          {paging.page < paging.pages ? (
            <Link href={href(paging.page + 1)} className={ghost}>
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
