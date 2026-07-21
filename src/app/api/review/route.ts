import { NextRequest, NextResponse } from "next/server";
import { submitReview } from "@/lib/publishos-reviews";
import { getOrder } from "@/lib/publishos-orders";

export const runtime = "nodejs";

/**
 * POST /api/review — accept a review submission from the storefront form and
 * forward it to PublishOS. Kept server-side so the PublishOS origin stays
 * private. When an orderRef is supplied we re-check that the product was
 * actually in that order before forwarding, so the client can't spoof a
 * "verified" badge by tampering with the request.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rating = Number(body.rating);
    const productSlug = typeof body.productSlug === "string" ? body.productSlug.trim() : "";
    const productName = typeof body.productName === "string" ? body.productName.trim() : "";
    const text = typeof body.body === "string" ? body.body.trim() : "";
    const author = typeof body.author === "string" ? body.author.trim() : "";
    const orderRef = typeof body.orderRef === "string" ? body.orderRef.trim() : "";

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Please choose a rating between 1 and 5 stars." }, { status: 400 });
    }
    if (!productSlug) {
      return NextResponse.json({ error: "Missing product." }, { status: 400 });
    }
    if (text.length < 10) {
      return NextResponse.json({ error: "Please write at least a sentence (10+ characters)." }, { status: 400 });
    }

    // Server-side verified-buyer confirmation. Only pass orderId through when
    // the product really is on that order.
    let orderId: string | undefined;
    if (orderRef) {
      const order = await getOrder(orderRef);
      if (order && order.items.some((it) => it.name.trim() === productName || it.name.trim() === productSlug)) {
        orderId = orderRef;
      }
    }

    const result = await submitReview({
      productSlug,
      productName: productName || productSlug,
      author: author || undefined,
      rating,
      title: typeof body.title === "string" ? body.title.trim() : undefined,
      body: text,
      orderId,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error || "Could not submit review." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, verified: !!result.verified });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 },
    );
  }
}
