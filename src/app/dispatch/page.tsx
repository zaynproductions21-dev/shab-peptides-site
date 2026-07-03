"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{ name: string; size: string; quantity: number; price: string }>;
  total: string;
  status: string;
  createdAt: string;
  deliveryAddress?: { line1: string; line2?: string; city: string; postcode: string; countryName: string };
  royalMailTracking?: string;
  dispatchedAt?: string;
  trackingEmailSentAt?: string;
}

type SendResult =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; tracking: string; brandedUrl: string; emailSent: boolean; emailError?: string }
  | { kind: "error"; error: string };

export default function DispatchPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [pinErr, setPinErr] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tracking, setTracking] = useState("");
  const [sendResult, setSendResult] = useState<SendResult>({ kind: "idle" });
  const [hideDispatched, setHideDispatched] = useState(true);

  const loadOrders = useCallback(async () => {
    setLoadErr(null);
    try {
      const res = await fetch("/api/dispatch/orders", { cache: "no-store" });
      if (res.status === 401) { setAuthed(false); return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { orders: Order[] };
      setOrders(data.orders);
      setAuthed(true);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  async function submitPin(e: React.FormEvent) {
    e.preventDefault();
    setPinErr(null);
    try {
      const res = await fetch("/api/dispatch/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setPinErr(d.error || `Login failed (${res.status})`);
        return;
      }
      setPin("");
      await loadOrders();
    } catch (e) {
      setPinErr(e instanceof Error ? e.message : String(e));
    }
  }

  async function logout() {
    await fetch("/api/dispatch/login", { method: "DELETE" });
    setAuthed(false);
    setOrders(null);
    setSelectedId(null);
    setTracking("");
    setSendResult({ kind: "idle" });
  }

  async function sendTracking(orderId: string) {
    if (!tracking.trim()) return;
    setSendResult({ kind: "sending" });
    try {
      const res = await fetch("/api/dispatch/send-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, tracking: tracking.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSendResult({ kind: "error", error: data.error || `HTTP ${res.status}` });
        return;
      }
      setSendResult({
        kind: "ok",
        tracking: data.savedTracking,
        brandedUrl: data.brandedUrl,
        emailSent: !!data.emailSent,
        emailError: data.emailError,
      });
      setTracking("");
      await loadOrders();
    } catch (e) {
      setSendResult({ kind: "error", error: e instanceof Error ? e.message : String(e) });
    }
  }

  const filtered = useMemo(() => {
    if (!orders) return [];
    const term = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (hideDispatched && (o.status === "shipped" || o.status === "delivered")) return false;
      if (!term) return true;
      return (
        o.orderId.toLowerCase().includes(term) ||
        (o.customerName || "").toLowerCase().includes(term) ||
        (o.customerEmail || "").toLowerCase().includes(term) ||
        (o.customerPhone || "").toLowerCase().includes(term)
      );
    });
  }, [orders, q, hideDispatched]);

  const selected = orders?.find((o) => o.orderId === selectedId) || null;

  // ── PIN screen ───────────────────────────
  if (authed === false) {
    return (
      <div style={styles.wrap}>
        <div style={styles.pinCard}>
          <div style={styles.pinBrand}>Premio Peptides · Dispatch</div>
          <h1 style={styles.pinTitle}>Enter PIN</h1>
          <p style={styles.pinSub}>This area is for the dispatch operator.</p>
          <form onSubmit={submitPin}>
            <input
              autoFocus
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="••••••"
              style={styles.pinInput}
            />
            {pinErr && <div style={styles.pinErr}>{pinErr}</div>}
            <button type="submit" disabled={pin.length < 4} style={styles.primary}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (authed === null) {
    return <div style={{ ...styles.wrap, textAlign: "center" as const, paddingTop: 80 }}>Loading…</div>;
  }

  // ── Signed-in dashboard ─────────────────
  return (
    <div style={styles.wrap}>
      <header style={styles.head}>
        <div>
          <div style={styles.brand}>Premio Peptides · Dispatch</div>
          <h1 style={styles.title}>Royal Mail tracking</h1>
        </div>
        <button onClick={logout} style={styles.ghost}>Sign out</button>
      </header>

      <div style={styles.controls}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by order ref, name, email or phone…"
          style={styles.search}
        />
        <label style={styles.toggle}>
          <input type="checkbox" checked={hideDispatched} onChange={(e) => setHideDispatched(e.target.checked)} />
          Hide already dispatched
        </label>
        <button onClick={loadOrders} style={styles.secondary}>↻ Refresh</button>
      </div>

      {loadErr && <div style={styles.errBanner}>Failed to load orders: {loadErr}</div>}

      <div style={styles.grid}>
        {/* Orders list */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Orders ({filtered.length})</h2>
          {filtered.length === 0 ? (
            <div style={styles.empty}>Nothing to dispatch.</div>
          ) : (
            <ul style={styles.list}>
              {filtered.map((o) => {
                const active = o.orderId === selectedId;
                const dispatched = o.status === "shipped" || o.status === "delivered";
                return (
                  <li key={o.orderId}>
                    <button
                      onClick={() => { setSelectedId(o.orderId); setSendResult({ kind: "idle" }); setTracking(o.royalMailTracking || ""); }}
                      style={{
                        ...styles.rowBtn,
                        background: active ? "#F0F9FA" : "#FFFFFF",
                        borderColor: active ? "#0F7B84" : "#EFEAE0",
                      }}
                    >
                      <div style={styles.rowTop}>
                        <span style={styles.rowRef}>#{o.orderId}</span>
                        <span style={{ ...styles.pill, ...(dispatched ? styles.pillOk : styles.pillPending) }}>{o.status}</span>
                      </div>
                      <div style={styles.rowName}>{o.customerName || "(no name)"}</div>
                      <div style={styles.rowMeta}>
                        £{o.total} · {new Date(o.createdAt).toLocaleDateString("en-GB")}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Detail + tracking form */}
        <section style={styles.card}>
          {!selected ? (
            <div style={styles.empty}>Pick an order to add a Royal Mail tracking code.</div>
          ) : (
            <>
              <h2 style={styles.cardTitle}>#{selected.orderId}</h2>
              <div style={styles.detailGrid}>
                <div><div style={styles.k}>Customer</div><div style={styles.v}>{selected.customerName}</div></div>
                <div><div style={styles.k}>Email</div><div style={styles.v}>{selected.customerEmail}</div></div>
                <div><div style={styles.k}>Phone</div><div style={styles.v}>{selected.customerPhone || "—"}</div></div>
                <div><div style={styles.k}>Total</div><div style={styles.v}>£{selected.total}</div></div>
              </div>

              {selected.deliveryAddress && (
                <div style={styles.addr}>
                  <div style={styles.k}>Ship to</div>
                  <div style={styles.v}>
                    {selected.deliveryAddress.line1}{selected.deliveryAddress.line2 ? `, ${selected.deliveryAddress.line2}` : ""}<br />
                    {selected.deliveryAddress.city}, <strong>{selected.deliveryAddress.postcode}</strong><br />
                    {selected.deliveryAddress.countryName}
                  </div>
                </div>
              )}

              <ul style={styles.items}>
                {selected.items.map((i, idx) => (
                  <li key={idx}>
                    <span>{i.name} <span style={styles.dim}>({i.size})</span></span>
                    <span>×{i.quantity}</span>
                  </li>
                ))}
              </ul>

              <div style={styles.trackBox}>
                <label style={styles.trackLabel}>Royal Mail tracking code</label>
                <input
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value.toUpperCase())}
                  placeholder="e.g. AA123456789GB"
                  style={styles.trackInput}
                  autoFocus
                />
                <p style={styles.hint}>
                  Enter the barcode from the Royal Mail label. Any format accepted (Tracked 24/48, International, etc).
                </p>

                {selected.royalMailTracking && !tracking && (
                  <p style={styles.hint}>
                    Current: <strong>{selected.royalMailTracking}</strong>
                    {selected.trackingEmailSentAt && (
                      <> · emailed {new Date(selected.trackingEmailSentAt).toLocaleString("en-GB")}</>
                    )}
                  </p>
                )}

                <button
                  onClick={() => sendTracking(selected.orderId)}
                  disabled={!tracking.trim() || sendResult.kind === "sending"}
                  style={{
                    ...styles.primary,
                    opacity: !tracking.trim() || sendResult.kind === "sending" ? 0.6 : 1,
                  }}
                >
                  {sendResult.kind === "sending" ? "Sending…" : "Send tracking to customer"}
                </button>

                {sendResult.kind === "ok" && (
                  <div style={styles.okBanner}>
                    <strong>✓ Saved</strong> — tracking <code style={styles.mono}>{sendResult.tracking}</code>
                    {sendResult.emailSent
                      ? <> · email delivered to {selected.customerEmail}</>
                      : <> · <span style={{ color: "#B71C1C" }}>email failed: {sendResult.emailError}</span></>
                    }
                    <div style={{ marginTop: 6 }}>
                      Branded tracking page: <a href={sendResult.brandedUrl} target="_blank" rel="noopener noreferrer">{sendResult.brandedUrl}</a>
                    </div>
                  </div>
                )}
                {sendResult.kind === "error" && (
                  <div style={styles.errBanner}>{sendResult.error}</div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────
const styles = {
  wrap: { minHeight: "100vh", background: "#F7F5F1", fontFamily: "'Plus Jakarta Sans','Helvetica Neue',Arial,sans-serif", padding: "24px 16px 80px", color: "#2D2926" },
  head: { maxWidth: 1080, margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 } as const,
  brand: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8A8580" },
  title: { fontSize: 26, fontWeight: 800, margin: "4px 0 0", color: "#2D2926" },
  controls: { maxWidth: 1080, margin: "0 auto 16px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const },
  search: { flex: "1 1 280px", padding: "10px 14px", border: "1px solid #EFEAE0", borderRadius: 10, fontSize: 14, background: "#FFFFFF" },
  toggle: { fontSize: 13, color: "#6B655E", display: "flex", alignItems: "center", gap: 6 },
  grid: { maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(280px, 380px) 1fr", gap: 18, alignItems: "start" } as const,
  card: { background: "#FFFFFF", border: "1px solid #EFEAE0", borderRadius: 14, padding: 18 },
  cardTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#2D2926" },
  empty: { padding: 24, textAlign: "center" as const, color: "#8A8580", fontSize: 13 },
  list: { listStyle: "none" as const, padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: 8 },
  rowBtn: { width: "100%", textAlign: "left" as const, padding: 12, border: "1px solid #EFEAE0", borderRadius: 10, cursor: "pointer" as const, transition: "all .12s" },
  rowTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } as const,
  rowRef: { fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#2D2926", fontWeight: 700 },
  rowName: { fontSize: 14, color: "#2D2926", fontWeight: 600 },
  rowMeta: { fontSize: 12, color: "#6B655E", marginTop: 2 },
  pill: { fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase" as const, letterSpacing: 0.5 },
  pillPending: { background: "#FFF3E0", color: "#B87700" },
  pillOk: { background: "#DCFCE7", color: "#0F7B33" },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } as const,
  k: { fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const, color: "#8A8580" },
  v: { fontSize: 14, color: "#2D2926", marginTop: 2 },
  addr: { padding: 12, background: "#F7F5F1", borderRadius: 10, marginBottom: 12 },
  items: { listStyle: "none" as const, padding: 0, margin: "0 0 16px", fontSize: 14 },
  dim: { color: "#8A8580" },
  trackBox: { padding: 16, background: "#F0F9FA", border: "1px solid #D0E8EC", borderRadius: 12 },
  trackLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" as const, color: "#0F7B84", display: "block", marginBottom: 6 },
  trackInput: { width: "100%", padding: "12px 14px", border: "1px solid #B4D9DD", borderRadius: 10, fontSize: 15, fontFamily: "ui-monospace, monospace", background: "#FFFFFF", boxSizing: "border-box" as const, textTransform: "uppercase" as const },
  hint: { fontSize: 12, color: "#4C6167", margin: "6px 0 12px" },
  primary: { width: "100%", padding: "12px 16px", background: "#0F7B84", color: "#FFFFFF", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" as const, marginTop: 6 },
  secondary: { padding: "10px 14px", background: "#FFFFFF", color: "#2D2926", border: "1px solid #EFEAE0", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer" as const },
  ghost: { padding: "8px 12px", background: "transparent", color: "#6B655E", border: "1px solid #EFEAE0", borderRadius: 10, fontSize: 13, cursor: "pointer" as const },
  okBanner: { marginTop: 12, padding: 12, background: "#DCFCE7", border: "1px solid #99E2B4", borderRadius: 10, fontSize: 13, color: "#0F7B33" },
  errBanner: { marginTop: 12, padding: 12, background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 10, fontSize: 13, color: "#7F1D1D" },
  mono: { fontFamily: "ui-monospace, monospace", background: "#FFFFFF", padding: "1px 6px", borderRadius: 4, border: "1px solid #99E2B4" },
  pinCard: { maxWidth: 380, margin: "80px auto 0", background: "#FFFFFF", border: "1px solid #EFEAE0", borderRadius: 14, padding: 28, textAlign: "center" as const },
  pinBrand: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, color: "#0F7B84" },
  pinTitle: { fontSize: 22, fontWeight: 800, margin: "6px 0 4px" },
  pinSub: { fontSize: 13, color: "#6B655E", margin: "0 0 20px" },
  pinInput: { width: "100%", padding: "14px 16px", border: "1px solid #EFEAE0", borderRadius: 10, fontSize: 22, textAlign: "center" as const, letterSpacing: 8, fontFamily: "ui-monospace, monospace", boxSizing: "border-box" as const, marginBottom: 8 },
  pinErr: { color: "#B71C1C", fontSize: 13, margin: "0 0 10px" },
} as const;
