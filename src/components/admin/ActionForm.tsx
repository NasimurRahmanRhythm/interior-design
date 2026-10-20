"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import type { Result } from "@/lib/admin/result";
import { button } from "./ui";

type Props = {
  action: (prev: Result, form: FormData) => Promise<Result>;
  children: React.ReactNode;
  submit?: string;
  className?: string;
  // More buttons for the footer, e.g. a delete.
  extra?: React.ReactNode;
  // Clear the fields after a successful save, for "add" forms.
  clearOnSuccess?: boolean;
};

// A form for an admin server action, with its save button and the result next
// to it. Submitting through a transition keeps what was typed in the fields
// (React would otherwise reset them after the action).
export default function ActionForm({ action, children, submit = "Save", className = "", extra, clearOnSuccess }: Props) {
  const [state, run, pending] = useActionState(action, {});
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (clearOnSuccess && state.ok) form.current?.reset();
  }, [state, clearOnSuccess]);

  return (
    <form
      ref={form}
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => run(data));
      }}
    >
      {children}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className={button} disabled={pending}>
          {pending ? "Saving…" : submit}
        </button>
        {!pending && state.error && (
          <p role="alert" className="text-sm text-[#b3261e]">
            {state.error}
          </p>
        )}
        {!pending && state.ok && <p className="text-sm text-[#3d6b3f]">{state.message ?? "Saved."}</p>}
        {extra && <div className="ml-auto">{extra}</div>}
      </div>
    </form>
  );
}
