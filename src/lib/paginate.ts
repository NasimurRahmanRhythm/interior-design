export const PAGE_SIZE = 15;

// Which slice of `total` items page `requested` shows; out-of-range pages
// fall back to the nearest real one.
export function paginate(total: number, requested: unknown, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(total / size));
  const n = Number.parseInt(String(requested ?? "1"), 10);
  const page = Number.isFinite(n) ? Math.min(Math.max(n, 1), pages) : 1;
  const from = (page - 1) * size;
  return { page, pages, from, to: Math.min(from + size, total) };
}

// Page numbers to show, with gaps: 1 … 4 5 6 … 9
export function pageList(page: number, pages: number): (number | null)[] {
  const keep = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const list: (number | null)[] = [];
  let last = 0;
  for (const p of [...keep].sort((a, b) => a - b)) {
    if (p - last > 1) list.push(p - last === 2 ? last + 1 : null);
    list.push(p);
    last = p;
  }
  return list;
}

// A URL with the given query values set (empty ones removed).
export function withQuery(path: string, query: Record<string, string | number | undefined | null>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  return q.size ? `${path}?${q}` : path;
}
