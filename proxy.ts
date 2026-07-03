import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

const COOKIE_NAME = "premio_dispatch";

function verifyCookie(raw: string | undefined, secret: string): boolean {
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [v, expiresAt, providedSig] = parts;
  if (v !== "v1") return false;
  const exp = parseInt(expiresAt, 10);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = createHmac("sha256", secret).update(`${v}.${expiresAt}`).digest("base64url");
  try {
    return timingSafeEqual(Buffer.from(providedSig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public dispatch entry: the /dispatch page itself renders the PIN screen when not authed.
  // Login/logout endpoints must remain reachable.
  if (pathname === "/api/dispatch/login") return NextResponse.next();

  const gated = pathname.startsWith("/api/dispatch");
  if (!gated) return NextResponse.next();

  const secret = process.env.DISPATCH_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const raw = req.cookies.get(COOKIE_NAME)?.value;
  if (!verifyCookie(raw, secret)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/dispatch/:path*"],
};
