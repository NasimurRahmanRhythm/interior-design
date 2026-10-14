import { NextResponse, type NextRequest } from "next/server";

// HTTP basic auth in front of the whole site: every page, image and script asks
// for a username and password first. For now the credentials live here in the
// code; BASIC_AUTH_USER / BASIC_AUTH_PASSWORD in the environment override them.

const USER = process.env.BASIC_AUTH_USER || "rhythm";
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || "Pass-123456";

// Compare without stopping at the first wrong character.
function same(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export function proxy(request: NextRequest) {
  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const split = decoded.indexOf(":");
      const user = decoded.slice(0, split);
      const password = decoded.slice(split + 1);
      if (split > -1 && same(user, USER) && same(password, PASSWORD)) return NextResponse.next();
    } catch {
      // Malformed header: fall through and ask again.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Integrity 360 Degree", charset="UTF-8"' },
  });
}
