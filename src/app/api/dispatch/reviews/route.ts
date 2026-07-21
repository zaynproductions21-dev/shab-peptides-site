import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/dispatch-auth";
import { listReviewsForModeration, type ReviewStatus } from "@/lib/publishos-reviews";

export const runtime = "nodejs";

const VALID: (ReviewStatus | "all")[] = ["pending", "approved", "rejected", "all"];

/** GET /api/dispatch/reviews?status=pending — moderation queue (dispatch-authed). */
export async function GET(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const statusParam = req.nextUrl.searchParams.get("status");
  const status = statusParam && VALID.includes(statusParam as ReviewStatus | "all")
    ? (statusParam as ReviewStatus | "all")
    : "pending";
  try {
    const reviews = await listReviewsForModeration(status);
    return NextResponse.json({ reviews, total: reviews.length });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
  }
}
