import type { Result } from "./result";

// Reading fields from admin forms.
export const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
export const optional = (form: FormData, key: string) => text(form, key) || null;
export const number = (form: FormData, key: string) => {
  const v = text(form, key);
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
};
export const lines = (form: FormData, key: string) =>
  text(form, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export function json<T = unknown>(form: FormData, key: string): T {
  return JSON.parse(String(form.get(key) ?? "null")) as T;
}

export function failed(error: { message: string; code?: string }): Result {
  if (error.code === "23505") return { error: "That is already used by another entry." };
  if (error.code === "42501") return { error: "You do not have permission to change this." };
  return { error: error.message };
}
