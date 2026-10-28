// Joins "Block I" with a non-breaking hyphen so the block letter never wraps alone.
export function addressLine(line: string) {
  return line.replace(/\bBlock[\s-]+(\w+)/gi, "Block‑$1");
}
