import type { PremioReview, AggregateRating } from "@/lib/publishos-reviews";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={value >= n ? "currentColor" : "none"}
          className={value >= n ? "text-editorial-accent" : "text-editorial-muted/30"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso.slice(0, 10);
  }
}

export default function ProductReviews({
  productName,
  reviews,
  aggregate,
}: {
  productName: string;
  reviews: PremioReview[];
  aggregate: AggregateRating;
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <h2 className="font-serif text-2xl font-bold text-editorial-text">
          {productName} Reviews
        </h2>
        <div className="flex items-center gap-3">
          <Stars value={Math.round(aggregate.ratingValue)} />
          <span className="text-sm text-editorial-text">
            <span className="font-bold">{aggregate.ratingValue.toFixed(1)}</span>
            <span className="text-editorial-muted"> / 5 · {aggregate.reviewCount} verified {aggregate.reviewCount === 1 ? "review" : "reviews"}</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-xl border border-editorial-border bg-editorial-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <Stars value={r.rating} />
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-editorial-green">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified buyer
                </span>
              )}
            </div>
            {r.title && <h3 className="mt-2 font-serif text-base font-bold text-editorial-text">{r.title}</h3>}
            <p className="mt-1.5 text-sm text-editorial-muted leading-relaxed">{r.body}</p>
            <p className="mt-3 text-xs text-editorial-muted/80">
              {r.author} · {formatDate(r.createdAt)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
