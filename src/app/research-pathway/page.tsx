"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";
import {
  PATHWAYS,
  QUESTIONS,
  scoreQuiz,
  bundleDiscountPct,
  type QuizAnswers,
  type QuizResult,
} from "@/lib/research-pathways";
import type { Compound } from "@/data/compounds";

/**
 * Client component for the quiz. Catalogue is fetched client-side when we
 * reach the result step so the result card can show real prices + stock
 * status from the PublishOS products API.
 */
export default function ResearchPathwayPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [catalogue, setCatalogue] = useState<Compound[] | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, setMeta, totalItems } = useCart();
  const router = useRouter();

  const showResult = stepIdx >= QUESTIONS.length;

  // Fetch catalogue the first time we hit the result step. useEffect so this fires
  // exactly once per state transition (not every render).
  useEffect(() => {
    if (!showResult || catalogue !== null) return;
    let cancelled = false;
    fetch("/api/compounds-catalogue", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setCatalogue(Array.isArray(d.compounds) ? d.compounds : []); })
      .catch(() => { if (!cancelled) setCatalogue([]); });
    return () => { cancelled = true; };
  }, [showResult, catalogue]);

  const result: QuizResult | null = useMemo(() => {
    if (!showResult) return null;
    const requiredAnswered = QUESTIONS.every((q) => answers[q.id as keyof QuizAnswers]);
    if (!requiredAnswered) return null;
    return scoreQuiz(answers);
  }, [answers, showResult]);

  const bundleCompounds: Compound[] = useMemo(() => {
    if (!result || !catalogue) return [];
    return result.topPathway.compoundSlugs
      .map((slug) => catalogue.find((c) => c.slug === slug))
      .filter((c): c is Compound => !!c);
  }, [result, catalogue]);

  const bundleTotalRaw = useMemo(() => {
    return bundleCompounds.reduce((sum, c) => {
      const price = c.sizes[0]?.price || "£0";
      return sum + parseFloat(price.replace(/[£,]/g, "").replace("From ", ""));
    }, 0);
  }, [bundleCompounds]);

  const discountPct = result ? bundleDiscountPct(result) : 0;
  const discountedTotal = (bundleTotalRaw * (1 - discountPct / 100)).toFixed(2);

  function pick(questionId: string, optionId: string) {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);
    // Count "not_sure" picks so far — if 2+ fire the custom-form escalation.
    const notSureCount = Object.values(nextAnswers).filter((v) => v === "not_sure").length;
    if (notSureCount >= 2) {
      // Preserve any genuine answers in a short-lived sessionStorage hint so
      // the custom form can prefill or at least show them to the operator.
      try {
        sessionStorage.setItem("premio:quizEscalation", JSON.stringify(nextAnswers));
      } catch {}
      setTimeout(() => router.push("/research-pathway/custom?src=quiz"), 220);
      return;
    }
    // auto-advance after a tiny delay so the user sees their selection highlight
    setTimeout(() => {
      setStepIdx((s) => Math.min(s + 1, QUESTIONS.length));
    }, 180);
  }

  function back() {
    setStepIdx((s) => Math.max(s - 1, 0));
  }

  function restart() {
    setAnswers({});
    setStepIdx(0);
    setAddedToCart(false);
  }

  async function addBundleToCart() {
    if (!result) return;

    setMeta({
      standingOrder: result.isStandingOrder,
      standingOrderInterval: result.isStandingOrder ? "30d" : undefined,
      bundleKey: result.topPathway.key,
      bundleLabel: result.topPathway.label,
      bundleDiscountPct: discountPct,
    });

    for (const c of bundleCompounds) {
      addItem({
        slug: c.slug,
        name: c.name,
        size: c.sizes[0]?.size || "",
        price: c.sizes[0]?.price || "£0",
        image: c.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => router.push("/cart"), 650);
  }

  const currentQ = showResult ? null : QUESTIONS[stepIdx];
  const progressPct = Math.round((stepIdx / QUESTIONS.length) * 100);

  return (
    <>
      <Navigation variant="editorial" />

      <section style={styles.hero}>
        <div style={styles.wrap}>
          <p style={styles.eyebrow}>Research pathway</p>
          <h1 style={styles.h1}>
            {showResult ? "Your protocol match" : "Build your research protocol"}
          </h1>
          <p style={styles.sub}>
            {showResult
              ? "Compounds matching the pathway you described below. Pricing, CoAs and batch records on each product page."
              : "Five questions. We match you to a receptor pathway and the compounds Premio stocks for it. For research use only — not for human consumption."}
          </p>

          {/* Progress bar */}
          {!showResult && (
            <div style={styles.progressWrap} aria-label={`Question ${stepIdx + 1} of ${QUESTIONS.length}`}>
              <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
            </div>
          )}
        </div>
      </section>

      <section style={styles.body}>
        <div style={styles.wrap}>
          {/* ── Quiz step ──────────────────────────── */}
          {currentQ && (
            <div style={styles.card}>
              <p style={styles.stepLabel}>Step {stepIdx + 1} of {QUESTIONS.length}</p>
              <h2 style={styles.qTitle}>{currentQ.title}</h2>
              {currentQ.subtitle && <p style={styles.qSub}>{currentQ.subtitle}</p>}
              <div style={styles.chips}>
                {currentQ.options.map((opt) => {
                  const active = answers[currentQ.id as keyof QuizAnswers] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => pick(currentQ.id, opt.id)}
                      style={{
                        ...styles.chip,
                        ...(active ? styles.chipActive : {}),
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <div style={styles.navRow}>
                {stepIdx > 0 && (
                  <button type="button" onClick={back} style={styles.ghost}>
                    ← Back
                  </button>
                )}
                <Link href="/research-pathway/custom?src=quiz" style={styles.escapeLink}>
                  Prefer to describe your work in prose? →
                </Link>
              </div>
            </div>
          )}

          {/* ── Result ─────────────────────────────── */}
          {showResult && result && (
            <div>
              <div style={{ ...styles.card, ...styles.resultCard }}>
                <p style={styles.resultEyebrow}>Pathway match</p>
                <h2 style={styles.resultTitle}>{result.topPathway.label}</h2>
                <p style={styles.resultTagline}>{result.topPathway.tagline}</p>

                <div style={styles.resultMeta}>
                  <div>
                    <p style={styles.metaLabel}>Receptor family</p>
                    <p style={styles.metaValue}>{result.topPathway.receptorFamily}</p>
                  </div>
                  <div>
                    <p style={styles.metaLabel}>Compatible models</p>
                    <p style={styles.metaValue}>{result.topPathway.modelSystems.slice(0, 3).join(" · ")}</p>
                  </div>
                </div>

                <p style={styles.focusLabel}>Research focus</p>
                <ul style={styles.focusList}>
                  {result.topPathway.researchFocus.map((f, i) => (
                    <li key={i} style={styles.focusItem}>{f}</li>
                  ))}
                </ul>

                {/* Bundle */}
                <div style={styles.bundle}>
                  <p style={styles.bundleTitle}>
                    Compounds matching this protocol ({bundleCompounds.length})
                  </p>

                  {catalogue === null && (
                    <p style={styles.muted}>Loading catalogue…</p>
                  )}

                  {catalogue !== null && bundleCompounds.length === 0 && (
                    <p style={styles.muted}>
                      No in-stock compounds match this pathway right now. <Link href="/compounds" style={styles.link}>Browse the full catalogue</Link>.
                    </p>
                  )}

                  {bundleCompounds.map((c) => (
                    <div key={c.slug} style={styles.bundleItem}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={`/compounds/${c.slug}`} style={styles.bundleItemName}>
                          {c.name}
                        </Link>
                        <p style={styles.bundleItemMeta}>
                          {c.sizes[0]?.size} · {c.purity} purity · third-party CoA
                        </p>
                      </div>
                      <p style={styles.bundleItemPrice}>{c.sizes[0]?.price}</p>
                    </div>
                  ))}

                  {bundleCompounds.length > 0 && (
                    <>
                      <div style={styles.pricingRow}>
                        <span>Bundle subtotal</span>
                        <span>£{bundleTotalRaw.toFixed(2)}</span>
                      </div>
                      <div style={styles.pricingRow}>
                        <span style={{ color: "#0F7B33", fontWeight: 600 }}>
                          Protocol discount ({discountPct}%)
                        </span>
                        <span style={{ color: "#0F7B33", fontWeight: 600 }}>
                          − £{(bundleTotalRaw - parseFloat(discountedTotal)).toFixed(2)}
                        </span>
                      </div>
                      <div style={{ ...styles.pricingRow, ...styles.pricingTotal }}>
                        <span>Total</span>
                        <span>£{discountedTotal}</span>
                      </div>

                      {result.isStandingOrder && (
                        <div style={styles.standingBadge}>
                          <strong>📅 Standing research order</strong> — same bundle resupplied every 30 days.
                          You can pause or cancel from any email we send.
                          <br />
                          <span style={styles.standingBadgeSmall}>
                            Payment collection via Fena open-banking standing payment once your approval lands.
                            Until then, we invoice monthly by BACS.
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={addBundleToCart}
                        disabled={addedToCart || bundleCompounds.length === 0}
                        style={{
                          ...styles.cta,
                          ...(addedToCart ? styles.ctaDone : {}),
                        }}
                      >
                        {addedToCart
                          ? "✓ Added to basket — opening cart…"
                          : result.isStandingOrder
                            ? `Set up standing order — £${discountedTotal}/month`
                            : `Add bundle to basket — £${discountedTotal}`}
                      </button>
                    </>
                  )}
                </div>

                {result.altPathway && (
                  <div style={styles.altCard}>
                    <p style={styles.altLabel}>Also relevant to your work</p>
                    <p style={styles.altName}>
                      {result.altPathway.label} — <span style={{ color: "#6B655E" }}>{result.altPathway.tagline}</span>
                    </p>
                  </div>
                )}
              </div>

              <div style={styles.resultFooterRow}>
                <button type="button" onClick={restart} style={styles.ghost}>↻ Start over</button>
                <Link href="/compounds" style={styles.ghostLink}>Browse full catalogue →</Link>
              </div>

              <p style={styles.disclaimer}>
                For research use only. Not for human consumption. All compounds supplied with third-party HPLC + MS CoA. Premio Peptides is a trading name of Bell Red Limited.
              </p>
            </div>
          )}
        </div>
      </section>

      {totalItems > 0 && !addedToCart && (
        <div style={styles.floatCart}>
          <Link href="/cart" style={styles.floatCartLink}>
            View basket ({totalItems}) →
          </Link>
        </div>
      )}

      <Footer variant="editorial" />
    </>
  );
}

// ── Styles — inline, Plus Jakarta Sans, editorial palette ────────────
const styles = {
  wrap: { maxWidth: 820, margin: "0 auto", padding: "0 20px" } as const,
  hero: {
    paddingTop: 80, paddingBottom: 28, background: "#F7F5F1", borderBottom: "1px solid #EFEAE0",
    fontFamily: "'Plus Jakarta Sans','Helvetica Neue',Arial,sans-serif",
  } as const,
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase" as const, color: "#0F7B84", margin: 0 },
  h1: { fontSize: 32, fontWeight: 800, letterSpacing: "-0.015em", color: "#2D2926", margin: "6px 0 8px", fontFamily: "'Plus Jakarta Sans',serif" },
  sub: { fontSize: 15, color: "#6B655E", lineHeight: 1.55, margin: 0, maxWidth: 640 },
  progressWrap: { marginTop: 22, height: 4, background: "#EFEAE0", borderRadius: 999, overflow: "hidden" } as const,
  progressFill: { height: "100%", background: "linear-gradient(90deg, #0F7B84 0%, #159FAB 100%)", transition: "width 320ms ease" } as const,
  body: { background: "#FFFFFF", paddingTop: 32, paddingBottom: 80, fontFamily: "'Plus Jakarta Sans','Helvetica Neue',Arial,sans-serif" } as const,
  card: { background: "#FFFFFF", border: "1px solid #EFEAE0", borderRadius: 14, padding: "28px 26px" },
  stepLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#0F7B84", margin: 0 },
  qTitle: { fontSize: 22, fontWeight: 800, color: "#2D2926", margin: "8px 0 4px", letterSpacing: "-0.015em" },
  qSub: { fontSize: 14, color: "#6B655E", margin: "0 0 22px", lineHeight: 1.55 },
  chips: { display: "flex", flexDirection: "column" as const, gap: 10 } as const,
  chip: {
    width: "100%", padding: "14px 18px", textAlign: "left" as const, fontSize: 15, fontWeight: 600,
    border: "1px solid #EFEAE0", borderRadius: 10, background: "#FFFFFF", color: "#2D2926",
    cursor: "pointer" as const, transition: "all .14s ease",
    fontFamily: "inherit",
  },
  chipActive: { borderColor: "#0F7B84", background: "#F0F9FA", color: "#0F7B84", boxShadow: "0 0 0 3px rgba(15,123,132,0.08)" },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22, gap: 12, flexWrap: "wrap" as const } as const,
  ghost: { background: "transparent", border: "1px solid #EFEAE0", padding: "9px 16px", borderRadius: 8, fontSize: 13, color: "#6B655E", cursor: "pointer" as const, fontWeight: 600, fontFamily: "inherit" },
  escapeLink: { fontSize: 12, color: "#0F7B84", textDecoration: "none", fontWeight: 600 },
  ghostLink: { fontSize: 13, color: "#6B655E", textDecoration: "none", fontWeight: 600 },
  // Result styles
  resultCard: { padding: "32px 28px" } as const,
  resultEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#0F7B84", margin: 0 },
  resultTitle: { fontSize: 28, fontWeight: 800, color: "#2D2926", margin: "6px 0 4px", letterSpacing: "-0.015em" },
  resultTagline: { fontSize: 15, color: "#6B655E", margin: "0 0 20px", lineHeight: 1.55 },
  resultMeta: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, padding: "14px 0", borderTop: "1px solid #EFEAE0", borderBottom: "1px solid #EFEAE0", margin: "0 0 20px" } as const,
  metaLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8A8580", margin: 0 },
  metaValue: { fontSize: 13, color: "#2D2926", margin: "4px 0 0", lineHeight: 1.5 },
  focusLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8A8580", margin: "0 0 8px" },
  focusList: { listStyle: "none" as const, padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 6 },
  focusItem: { fontSize: 13, color: "#2D2926", lineHeight: 1.55, paddingLeft: 16, position: "relative" as const },
  bundle: { background: "#F7F5F1", padding: 20, borderRadius: 12, marginTop: 8 } as const,
  bundleTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#0F7B84", margin: "0 0 14px" },
  bundleItem: { display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: "1px dashed #D9D4C9" } as const,
  bundleItemName: { fontSize: 15, fontWeight: 700, color: "#2D2926", textDecoration: "none" },
  bundleItemMeta: { fontSize: 12, color: "#6B655E", margin: "2px 0 0" },
  bundleItemPrice: { fontSize: 15, fontWeight: 700, color: "#2D2926", margin: 0, whiteSpace: "nowrap" as const },
  pricingRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "#6B655E" } as const,
  pricingTotal: { paddingTop: 12, marginTop: 4, borderTop: "1px solid #D9D4C9", fontSize: 18, fontWeight: 800, color: "#2D2926" } as const,
  standingBadge: { marginTop: 16, padding: 14, background: "#F0F9FA", border: "1px solid #D0E8EC", borderRadius: 10, fontSize: 13, color: "#2D2926", lineHeight: 1.55 } as const,
  standingBadgeSmall: { fontSize: 11, color: "#6B655E" },
  cta: {
    marginTop: 18, width: "100%", padding: "16px 20px", background: "#0F7B84", color: "#FFFFFF",
    border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" as const,
    fontFamily: "inherit", transition: "background .14s ease",
  },
  ctaDone: { background: "#0F7B33" },
  altCard: { marginTop: 24, padding: "16px 18px", background: "#F7F5F1", border: "1px dashed #D9D4C9", borderRadius: 10 } as const,
  altLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8A8580", margin: 0 },
  altName: { fontSize: 14, fontWeight: 700, color: "#2D2926", margin: "4px 0 0" },
  resultFooterRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 } as const,
  disclaimer: { fontSize: 11, color: "#8A8580", marginTop: 20, lineHeight: 1.55, textAlign: "center" as const, maxWidth: 600, marginLeft: "auto", marginRight: "auto" } as const,
  muted: { fontSize: 13, color: "#8A8580", margin: 0 } as const,
  link: { color: "#0F7B84", textDecoration: "underline" },
  floatCart: {
    position: "fixed" as const, bottom: 20, right: 20, zIndex: 50,
    background: "#2D2926", borderRadius: 999, padding: "12px 20px", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  } as const,
  floatCartLink: { color: "#FFFFFF", textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" },
};
