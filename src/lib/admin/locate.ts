import "server-only";

export type Located = { lat: number; lon: number };

const NUM = String.raw`(-?\d{1,3}(?:\.\d+)?)`;
// Most exact first: the pinned place (!3d…!4d…), then a "lat,lon" query, then the map's centre (@lat,lon).
const PATTERNS = [
  new RegExp(String.raw`!3d${NUM}!4d${NUM}`),
  new RegExp(String.raw`[?&](?:q|query|ll|sll|center|destination|daddr)=(?:loc:)?${NUM}(?:,|%2C)\s*(?:\+)?${NUM}`, "i"),
  new RegExp(String.raw`@${NUM},${NUM}`),
  new RegExp(String.raw`/place/${NUM}(?:,|%2C)\+?${NUM}`, "i"),
];

function read(text: string): Located | null {
  const plain = new RegExp(String.raw`^\s*${NUM}\s*,\s*${NUM}\s*$`).exec(text);
  if (plain) return { lat: Number(plain[1]), lon: Number(plain[2]) };
  for (const p of PATTERNS) {
    const m = p.exec(text);
    if (m) return { lat: Number(m[1]), lon: Number(m[2]) };
  }
  return null;
}

// Short share links (maps.app.goo.gl/…) only carry the place after their redirect.
async function expand(url: URL): Promise<string> {
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000), headers: { "user-agent": "Mozilla/5.0" } });
  let final = res.url;
  // Google may route through its consent page, with the real address in "continue".
  const next = new URL(final);
  if (next.hostname.startsWith("consent.")) final = next.searchParams.get("continue") ?? final;
  return decodeURIComponent(final);
}

// Reads the latitude and longitude from a Google Maps link (or a plain "lat, lon").
export async function locate(link: string): Promise<Located | null> {
  const direct = read(link) ?? read(safeDecode(link));
  if (direct) return direct;
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  if (!/(^|\.)goo\.gl$|(^|\.)google\.[a-z.]+$/.test(url.hostname)) return null;
  try {
    return read(await expand(url));
  } catch {
    return null;
  }
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// Roughly the box the map of Bangladesh covers.
export const inBangladesh = ({ lat, lon }: Located) => lat >= 20.5 && lat <= 26.8 && lon >= 88 && lon <= 92.8;
