"use client";

import { useState } from "react";
import Link from "next/link";

export interface ReviewableProduct {
  slug: string;
  name: string;
}

interface ProductReviewState {
  rating: number;
  title: string;
  body: string;
  submitting: boolean;
  done: boolean;
  error: string | null;
}

function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            disabled={disabled}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="p-0.5 disabled:cursor-not-allowed"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={active ? "currentColor" : "none"}
              className={active ? "text-editorial-accent" : "text-editorial-muted/40"}
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewForm({
  orderRef,
  products,
}: {
  orderRef: string;
  products: ReviewableProduct[];
}) {
  const [author, setAuthor] = useState("");
  const [states, setStates] = useState<Record<string, ProductReviewState>>(() =>
    Object.fromEntries(
      products.map((p) => [
        p.slug,
        { rating: 0, title: "", body: "", submitting: false, done: false, error: null },
      ]),
    ),
  );

  const update = (slug: string, patch: Partial<ProductReviewState>) =>
    setStates((s) => ({ ...s, [slug]: { ...s[slug], ...patch } }));

  async function submit(product: ReviewableProduct) {
    const st = states[product.slug];
    if (st.rating < 1) {
      update(product.slug, { error: "Please choose a star rating." });
      return;
    }
    if (st.body.trim().length < 10) {
      update(product.slug, { error: "Please write at least a sentence." });
      return;
    }
    update(product.slug, { submitting: true, error: null });
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderRef,
          productSlug: product.slug,
          productName: product.name,
          author: author.trim() || undefined,
          rating: st.rating,
          title: st.title.trim() || undefined,
          body: st.body.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        update(product.slug, { submitting: false, error: data.error || "Something went wrong." });
        return;
      }
      update(product.slug, { submitting: false, done: true });
    } catch {
      update(product.slug, { submitting: false, error: "Network error — please try again." });
    }
  }

  const allDone = products.every((p) => states[p.slug]?.done);

  if (allDone) {
    return (
      <div className="rounded-2xl border border-editorial-border bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-editorial-accent/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-editorial-accent" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl font-bold text-editorial-text">Thank you</h2>
        <p className="mt-3 text-editorial-muted">
          Your {products.length > 1 ? "reviews have" : "review has"} been submitted and will appear
          once checked. We appreciate you taking the time.
        </p>
        <Link
          href="/compounds"
          className="mt-6 inline-block rounded-full bg-editorial-accent px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse compounds
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-editorial-border bg-white p-5">
        <label className="block text-sm font-semibold text-editorial-text">
          Display name <span className="font-normal text-editorial-muted">(optional)</span>
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Dr. M. Khan, or leave blank for “Verified Researcher”"
          maxLength={80}
          className="mt-2 w-full rounded-lg border border-editorial-border px-3 py-2 text-sm text-editorial-text focus:border-editorial-accent focus:outline-none"
        />
        <p className="mt-1.5 text-xs text-editorial-muted">
          Shown publicly next to your review. Don&rsquo;t include personal contact details.
        </p>
      </div>

      {products.map((product) => {
        const st = states[product.slug];
        return (
          <div key={product.slug} className="rounded-2xl border border-editorial-border bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-lg font-bold text-editorial-text">{product.name}</h3>
              {st.done && (
                <span className="text-xs font-semibold text-editorial-accent">✓ Submitted</span>
              )}
            </div>

            {st.done ? (
              <p className="mt-2 text-sm text-editorial-muted">
                Thanks — this review is awaiting moderation.
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                <StarPicker
                  value={st.rating}
                  onChange={(n) => update(product.slug, { rating: n, error: null })}
                  disabled={st.submitting}
                />
                <input
                  type="text"
                  value={st.title}
                  onChange={(e) => update(product.slug, { title: e.target.value })}
                  placeholder="Headline (optional)"
                  maxLength={120}
                  disabled={st.submitting}
                  className="w-full rounded-lg border border-editorial-border px-3 py-2 text-sm text-editorial-text focus:border-editorial-accent focus:outline-none"
                />
                <textarea
                  value={st.body}
                  onChange={(e) => update(product.slug, { body: e.target.value, error: null })}
                  placeholder="How was the purity, packaging and service? Keep it factual and about the product."
                  rows={4}
                  maxLength={2000}
                  disabled={st.submitting}
                  className="w-full rounded-lg border border-editorial-border px-3 py-2 text-sm text-editorial-text focus:border-editorial-accent focus:outline-none"
                />
                {st.error && <p className="text-sm text-red-600">{st.error}</p>}
                <button
                  type="button"
                  onClick={() => submit(product)}
                  disabled={st.submitting}
                  className="rounded-full bg-editorial-accent px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {st.submitting ? "Submitting…" : "Submit review"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
