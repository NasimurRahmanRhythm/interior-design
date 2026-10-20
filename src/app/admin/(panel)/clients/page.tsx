import type { Metadata } from "next";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageTitle from "@/components/admin/PageTitle";
import { card, input, label } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteClient, saveClient } from "@/lib/admin/actions/catalog";

export const metadata: Metadata = { title: "Clients" };

type Client = {
  id: string;
  name: string;
  industry: string | null;
  show_in_marquee: boolean;
  marquee_row: number | null;
  marquee_order: number | null;
  sort_order: number;
};

function Fields({ c, industries }: { c?: Client; industries: string[] }) {
  return (
    <div className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_auto_5rem_5rem_5rem]">
      <label>
        <span className={label}>Name</span>
        <input name="name" defaultValue={c?.name} required className={input} />
      </label>
      <label>
        <span className={label}>Industry (group on /clients)</span>
        <input name="industry" defaultValue={c?.industry ?? ""} list="industries" className={input} />
      </label>
      <label className="flex items-center gap-2 pb-2">
        <input name="show_in_marquee" type="checkbox" defaultChecked={c?.show_in_marquee} className="h-4 w-4 accent-umber" />
        <span className="text-sm">In marquee</span>
      </label>
      <label>
        <span className={label}>Row</span>
        <select name="marquee_row" defaultValue={c?.marquee_row ?? 1} className={input}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>
      <label>
        <span className={label}>Position</span>
        <input name="marquee_order" type="number" defaultValue={c?.marquee_order ?? ""} className={input} />
      </label>
      <label>
        <span className={label}>Order</span>
        <input name="sort_order" type="number" defaultValue={c?.sort_order ?? 0} className={input} />
      </label>
      <datalist id="industries">
        {industries.map((i) => (
          <option key={i} value={i} />
        ))}
      </datalist>
    </div>
  );
}

export default async function Clients() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, industry, show_in_marquee, marquee_row, marquee_order, sort_order")
    .order("sort_order");
  if (error) throw new Error(error.message);
  const clients = data as Client[];
  const industries = [...new Set(clients.map((c) => c.industry).filter((i): i is string => Boolean(i)))];

  return (
    <>
      <PageTitle
        title="Clients"
        text="Names grouped by industry on the clients page. Ticked ones also run in the landing page marquee, in two rows."
      />
      <section className={`${card} mb-8`}>
        <h2 className="mb-4 font-serif text-2xl">Add a client</h2>
        <ActionForm action={saveClient.bind(null, null)} submit="Add client">
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
    </>
  );
}
