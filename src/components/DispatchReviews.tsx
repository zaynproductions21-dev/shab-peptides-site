"use client";

import { useCallback, useEffect, useState } from "react";

interface Review {
  id: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  orderId?: string;
  verified: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

type Filter = "pending" | "approved" | "rejected" | "all";

const s: Record<string, React.CSSProperties> = {
  card: { background: "#FFFFFF", border: "1px solid #EFEAE0", borderRadius: 14, padding: 18 },
  cardTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#2D2926" },
  empty: { padding: 24, textAlign: "center", color: "#8A8580", fontSize: 13 },
  filters: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" },
  filterBtn: { padding: "6px 12px", borderRadius: 999, border: "1px solid #EFEAE0", background: "#FFFFFF", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#6B655E" },
  filterOn: { background: "#0F7B84", color: "#FFFFFF", borderColor: "#0F7B84" },
  item: { border: "1px solid #EFEAE0", borderRadius: 12, padding: 14, marginBottom: 10 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" },
  stars: { color: "#0F7B84", fontSize: 15, letterSpacing: 1 },
  prod: { fontSize: 13, fontWeight: 700, color: "#2D2926" },
  meta: { fontSize: 12, color: "#8A8580", marginTop: 2 },
  body: { fontSize: 13, color: "#2D2926", marginTop: 8, lineHeight: 1.5 },
  title: { fontSize: 14, fontWeight: 700, color: "#2D2926", marginTop: 6 },
  actions: { display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" },
  approve: { padding: "7px 12px", background: "#0F7B33", color: "#FFFFFF", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" },
  reject: { padding: "7px 12px", background: "#FFFFFF", color: "#B91C1C", border: "1px solid #FCA5A5", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" },
  del: { padding: "7px 12px", background: "transparent", color: "#8A8580", border: "1px solid #EFEAE0", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" },
  pill: { fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.5 },
  verified: { fontSize: 11, fontWeight: 700, color: "#0F7B33" },
  errBanner: { marginBottom: 12, padding: 12, background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 10, fontSize: 13, color: "#7F1D1D" },
  secondary: { padding: "8px 12px", background: "#FFFFFF", color: "#2D2926", border: "1px solid #EFEAE0", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer" },
};

function statusPill(status: Review["status"]): React.CSSProperties {
  if (status === "approved") return { ...s.pill, background: "#DCFCE7", color: "#0F7B33" };
  if (status === "rejected") return { ...s.pill, background: "#FEE2E2", color: "#B91C1C" };
  return { ...s.pill, background: "#FFF3E0", color: "#B87700" };
}

export default function DispatchReviews() {
  const [filter, setFilter] = useState<Filter>("pending");
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async (f: Filter) => {
    setErr(null);
    try {
      const res = await fetch(`/api/dispatch/reviews?status=${f}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reviews: Review[] };
      setReviews(data.reviews);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setReviews([]);
    }
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);

  async function moderate(id: string, status: "approved" | "rejected") {
    setBusy(id);
    try {
      const res = await fetch(`/api/dispatch/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load(filter);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this review permanently?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/dispatch/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load(filter);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  }

  return (
    <section style={s.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={s.cardTitle}>Reviews {reviews ? `(${reviews.length})` : ""}</h2>
        <button style={s.secondary} onClick={() => load(filter)}>↻ Refresh</button>
      </div>

      <div style={s.filters}>
        {(["pending", "approved", "rejected", "all"] as Filter[]).map((f) => (
          <button
            key={f}
            style={filter === f ? { ...s.filterBtn, ...s.filterOn } : s.filterBtn}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {err && <div style={s.errBanner}>Failed: {err}</div>}

      {!reviews ? (
        <div style={s.empty}>Loading…</div>
      ) : reviews.length === 0 ? (
        <div style={s.empty}>No {filter === "all" ? "" : filter} reviews.</div>
      ) : (
        reviews.map((r) => (
          <div key={r.id} style={s.item}>
            <div style={s.row}>
              <span style={s.stars} aria-label={`${r.rating} of 5`}>
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </span>
              <span style={statusPill(r.status)}>{r.status}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={s.prod}>{r.productName}</span>
              {r.verified && <span style={{ ...s.verified, marginLeft: 8 }}>✓ Verified buyer</span>}
            </div>
            {r.title && <div style={s.title}>{r.title}</div>}
            <div style={s.body}>{r.body}</div>
            <div style={s.meta}>
              {r.author}
              {r.orderId ? ` · order ${r.orderId}` : " · no order ref"}
              {" · "}{new Date(r.createdAt).toLocaleDateString("en-GB")}
            </div>
            <div style={s.actions}>
              {r.status !== "approved" && (
                <button style={s.approve} disabled={busy === r.id} onClick={() => moderate(r.id, "approved")}>
                  {busy === r.id ? "…" : "✓ Approve"}
                </button>
              )}
              {r.status !== "rejected" && (
                <button style={s.reject} disabled={busy === r.id} onClick={() => moderate(r.id, "rejected")}>
                  Reject
                </button>
              )}
              <button style={s.del} disabled={busy === r.id} onClick={() => remove(r.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
