import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const PUBLISHOS_ORIGIN = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

/**
 * Thin proxy for the researcher's pause/cancel actions from the branded
 * /standing-reorder/[orderId] landing. Only forwards the two safe fields
 * (nextReorderAt + standingOrderCancelledAt) — never passes anything that
 * could change price, status, or shipping details.
 */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await ctx.params;
    const body = (await req.json()) as Record<string, string>;
    const safe: Record<string, string> = {};
    if (typeof body.nextReorderAt === "string") safe.nextReorderAt = body.nextReorderAt;
    if (typeof body.standingOrderCancelledAt === "string") safe.standingOrderCancelledAt = body.standingOrderCancelledAt;
    if (Object.keys(safe).length === 0) {
      return NextResponse.json({ error: "no_fields_to_update" }, { status: 400 });
    }
    const res = await fetch(`${PUBLISHOS_ORIGIN}/api/premio-order/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safe),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ error: data.error || `HTTP ${res.status}` }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
