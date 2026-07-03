import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/dispatch-auth";
import { listOrders, type PremioOrderStatus } from "@/lib/publishos-orders";

export const runtime = "nodejs";

const VALID: PremioOrderStatus[] = ["pending", "verified", "paid", "shipped", "delivered", "cancelled"];

export async function GET(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status");
  const filter = status && VALID.includes(status as PremioOrderStatus) ? (status as PremioOrderStatus) : undefined;
  try {
    const orders = await listOrders(filter);
    // Most recent + un-dispatched first
    const ordered = [...orders].sort((a, b) => {
      const aDispatched = a.status === "shipped" || a.status === "delivered";
      const bDispatched = b.status === "shipped" || b.status === "delivered";
      if (aDispatched !== bDispatched) return aDispatched ? 1 : -1;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return NextResponse.json({ orders: ordered, total: ordered.length });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
  }
}
