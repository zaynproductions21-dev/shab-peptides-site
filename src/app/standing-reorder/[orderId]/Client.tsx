"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";

interface Props {
  order: {
    orderId: string;
    bundleKey?: string;
    bundleLabel?: string;
    bundleDiscountPct?: number;
    items: Array<{ name: string; size: string; price: string; quantity: number }>;
    standingOrderCancelledAt?: string;
  };
}

/**
 * Client-side logic for the standing-order resupply landing. Three actions:
 *   - Resupply now: pre-populates cart with the same bundle + meta, routes to /cart
 *   - Pause one month: PATCHes nextReorderAt forward by 30d via /api/standing-order/[orderId]
 *   - Cancel: PATCHes standingOrderCancelledAt
 */
export default function StandingReorderClient({ order }: Props) {
  const { addItem, setMeta } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preAction = searchParams.get("action"); // "pause" | "cancel" from email deep-link
  const [working, setWorking] = useState<"resupply" | "pause" | "cancel" | null>(null);
  const [outcome, setOutcome] = useState<{ kind: "pause" | "cancel"; ok: boolean; error?: string } | null>(null);
  const [confirmed, setConfirmed] = useState(preAction === "cancel");

  if (order.standingOrderCancelledAt) {
    return (
      <div className="rounded-2xl border border-editorial-border bg-editorial-surface p-6">
        <p className="text-sm text-editorial-muted">
          This standing order was cancelled on {new Date(order.standingOrderCancelledAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
        </p>
        <Link href="/research-pathway" className="mt-4 inline-flex items-center text-sm font-semibold text-editorial-accent hover:underline">
          Start a new research protocol →
        </Link>
      </div>
    );
  }

  async function resupply() {
    setWorking("resupply");
    // Not fetching the live catalogue — the stored order items already carry
    // name/size/price/image enough for the cart. Image is empty-ok (cart has
    // a fallback), everything else fine.
    for (const i of order.items) {
      addItem({
        slug: slugify(i.name),
        name: i.name,
        size: i.size,
        price: i.price,
        image: "",
      });
    }
    setMeta({
      standingOrder: true,
      standingOrderInterval: "30d",
      bundleKey: order.bundleKey,
      bundleLabel: order.bundleLabel,
      bundleDiscountPct: order.bundleDiscountPct ?? 20,
    });
    setTimeout(() => router.push("/cart"), 500);
  }

  async function patchOrder(body: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch(`/api/standing-order/${encodeURIComponent(order.orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok && !!data.ok, error: data.error };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  async function pauseMonth() {
    setWorking("pause");
    const nextIso = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();
    const r = await patchOrder({ nextReorderAt: nextIso });
    setOutcome({ kind: "pause", ok: r.ok, error: r.error });
    setWorking(null);
  }

  async function cancel() {
    setWorking("cancel");
    const r = await patchOrder({ standingOrderCancelledAt: new Date().toISOString() });
    setOutcome({ kind: "cancel", ok: r.ok, error: r.error });
    setWorking(null);
  }

  if (outcome) {
    return (
      <div className={`rounded-2xl border p-6 ${outcome.ok ? "border-editorial-green/30 bg-editorial-green/5" : "border-red-300 bg-red-50"}`}>
        <p className="text-sm font-semibold">
          {outcome.ok
            ? outcome.kind === "pause"
              ? "✓ Paused for a month — we'll email you again in ~60 days."
              : "✓ Subscription cancelled. You'll receive no more automatic reminders."
            : `Something went wrong: ${outcome.error || "unknown error"}`}
        </p>
        {outcome.ok && (
          <Link href="/compounds" className="mt-4 inline-flex items-center text-sm font-semibold text-editorial-accent hover:underline">
            Browse the catalogue →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Bundle summary */}
      <div className="rounded-2xl border border-editorial-border bg-editorial-surface p-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-editorial-muted">Compounds in this standing order</p>
        <ul className="mt-3 space-y-2">
          {order.items.map((i, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span className="text-editorial-text">
                {i.name} <span className="text-editorial-muted">({i.size})</span>
              </span>
              <span className="text-editorial-muted">×{i.quantity} · {i.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={resupply}
        disabled={working !== null || confirmed}
        className="w-full rounded-lg bg-editorial-accent px-6 py-4 text-base font-bold text-white hover:bg-editorial-accent-dark transition-colors shadow-md disabled:opacity-50"
      >
        {working === "resupply" ? "Opening cart…" : "✓ Resupply the same bundle now"}
      </button>

      {/* Secondary actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={pauseMonth}
          disabled={working !== null}
          className="rounded-lg border border-editorial-border bg-white px-4 py-3 text-sm font-semibold text-editorial-text hover:border-editorial-accent/30 transition-colors disabled:opacity-50"
        >
          {working === "pause" ? "Pausing…" : "⏸ Skip this month"}
        </button>
        {confirmed ? (
          <button
            type="button"
            onClick={cancel}
            disabled={working !== null}
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {working === "cancel" ? "Cancelling…" : "✕ Confirm cancellation"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="rounded-lg border border-editorial-border bg-white px-4 py-3 text-sm text-editorial-muted hover:text-red-700 hover:border-red-200 transition-colors"
          >
            Cancel subscription…
          </button>
        )}
      </div>

      <p className="mt-6 text-xs text-editorial-muted text-center">
        Questions? Reply to the email we sent or reach us via the contact page. For research use only. Not for human consumption.
      </p>
    </div>
  );
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
