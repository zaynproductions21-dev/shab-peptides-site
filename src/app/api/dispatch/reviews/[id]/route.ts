import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/dispatch-auth";
import { moderateReview, deleteReview, type ReviewStatus } from "@/lib/publishos-reviews";

export const runtime = "nodejs";

const VALID: ReviewStatus[] = ["pending", "approved", "rejected"];

/** PATCH /api/dispatch/reviews/[id] — approve/reject or tidy (dispatch-authed). */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const status = body.status as ReviewStatus | undefined;
  if (status && !VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  try {
    const review = await moderateReview(id, {
      status,
      author: typeof body.author === "string" ? body.author : undefined,
      title: typeof body.title === "string" ? body.title : undefined,
      body: typeof body.body === "string" ? body.body : undefined,
    });
    return NextResponse.json({ ok: true, review });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
  }
}

/** DELETE /api/dispatch/reviews/[id] — remove a review (dispatch-authed). */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    await deleteReview(id);
    return NextResponse.json({ ok: true, deleted: id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
  }
}
