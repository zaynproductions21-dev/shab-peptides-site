import { NextRequest, NextResponse } from "next/server";
import { kvGet } from "@/lib/kv";

/**
 * Short invoice URL: /i/{orderRef} → 302 to /api/invoice/{encodedSlug}
 * Mapping is written by /api/order at order-creation time and stored in KV
 * under "premio-invoice:{orderRef}".
 *
 * If the ref isn't in KV (KV miss, or pre-this-feature order), we fall back
 * to the long-URL invoice route with the ref as-is so legacy links still work.
 */
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ ref: string }> },
) {
  const { ref } = await ctx.params;
  const origin = req.nextUrl.origin;

  let encodedSlug: string | null = null;
  try {
    encodedSlug = await kvGet<string>(`premio-invoice:${ref}`);
  } catch {
    // KV unavailable — fall through to legacy behaviour
  }

  const target = encodedSlug
    ? `${origin}/api/invoice/${encodedSlug}`
    : `${origin}/api/invoice/${ref}`;

  return NextResponse.redirect(target, 302);
}
