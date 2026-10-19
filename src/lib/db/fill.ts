// Fills {name} placeholders in stored copy: fill("All {count} projects", { count: 12 }).
export function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in values ? String(values[k]) : m));
}
