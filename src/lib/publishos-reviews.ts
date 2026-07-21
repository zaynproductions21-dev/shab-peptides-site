/**
 * Thin server-side client for the PublishOS Premio-reviews API.
 * Mirrors publishos-orders.ts — every call stays server-side so the
 * moderation secret and origin never reach the browser.
 */

const BASE = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface PremioReview {
  id: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  orderId?: string;
  verified: boolean;
  status: ReviewStatus;
  createdAt: string;
  moderatedAt?: string;
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
}

export interface ReviewSubmission {
  productSlug: string;
  productName?: string;
  author?: string;
  rating: number;
  title?: string;
  body: string;
  orderId?: string;
}

/** Approved reviews + aggregate for a single product. Cached briefly. */
export async function getProductReviews(
  slug: string,
): Promise<{ reviews: PremioReview[]; aggregate: AggregateRating | null }> {
  try {
    const res = await fetch(`${BASE}/api/premio-review?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { reviews: [], aggregate: null };
    const data = (await res.json()) as { reviews?: PremioReview[]; aggregate?: AggregateRating | null };
    return { reviews: data.reviews || [], aggregate: data.aggregate ?? null };
  } catch {
    return { reviews: [], aggregate: null };
  }
}

/** Submit a review. Returns { ok, verified } or throws on network failure. */
export async function submitReview(
  submission: ReviewSubmission,
): Promise<{ ok: boolean; id?: string; verified?: boolean; error?: string }> {
  const res = await fetch(`${BASE}/api/premio-review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    id?: string;
    verified?: boolean;
    error?: string;
  };
  if (!res.ok) return { ok: false, error: data.error || `PublishOS ${res.status}` };
  return { ok: !!data.ok, id: data.id, verified: data.verified };
}

// ── Moderation (owner-only; secret held server-side) ──────────

function moderationSecret(): string {
  const s = process.env.REVIEW_MODERATION_SECRET?.trim();
  if (!s) throw new Error("REVIEW_MODERATION_SECRET not set");
  return s;
}

export async function listReviewsForModeration(
  status: ReviewStatus | "all" = "pending",
): Promise<PremioReview[]> {
  const res = await fetch(`${BASE}/api/premio-review?status=${status}`, {
    headers: { "x-review-secret": moderationSecret() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PublishOS reviews ${res.status}`);
  const data = (await res.json()) as { reviews?: PremioReview[] };
  return data.reviews || [];
}

export async function moderateReview(
  reviewId: string,
  patch: { status?: ReviewStatus; author?: string; title?: string; body?: string },
): Promise<PremioReview> {
  const res = await fetch(`${BASE}/api/premio-review/${reviewId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-review-secret": moderationSecret() },
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || `Moderation failed (${res.status})`);
  }
  const data = (await res.json()) as { review: PremioReview };
  return data.review;
}

export async function deleteReview(reviewId: string): Promise<void> {
  const res = await fetch(`${BASE}/api/premio-review/${reviewId}?confirm=DELETEREVIEW`, {
    method: "DELETE",
    headers: { "x-review-secret": moderationSecret() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
}
