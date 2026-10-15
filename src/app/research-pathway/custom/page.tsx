"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TURNSTILE_SITE_KEY = "0x4AAAAAADKI5BaseSCYFE9P";

const MODEL_OPTIONS = [
  "In vitro cell culture",
  "Rodent (mouse / rat)",
  "Non-human primate",
  "Equine / veterinary",
  "Tissue explants / organ slice",
  "Human cell lines",
  "Mixed / multi-stage",
  "Other / not yet decided",
];

const CADENCE_OPTIONS = [
  "One-off batch for a defined study",
  "Every 3 months (grant-cycle)",
  "Monthly standing programme",
  "Variable — depends on study timing",
];

const BUDGET_OPTIONS = [
  "Under £500",
  "£500 – £2,000",
  "£2,000 – £5,000",
  "£5,000+",
  "Not yet fixed",
];

type Submit =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; requestId: string }
  | { kind: "error"; error: string };

export default function CustomProtocolPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    researchQuestion: "",
    modelSystem: "",
    cadence: "",
    budgetRange: "",
    compoundsAlreadyEvaluating: "",
    consentToResearchVerification: false,
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submit, setSubmit] = useState<Submit>({ kind: "idle" });
  const turnstileRef = useRef<HTMLDivElement>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileRef.current || !(window as unknown as Record<string, unknown>).turnstile) return;
    turnstileRef.current.innerHTML = "";
    (window as unknown as { turnstile: { render: (el: HTMLDivElement, opts: Record<string, unknown>) => void } }).turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, []);

  useEffect(() => {
    const tryRender = () => {
      if ((window as unknown as Record<string, unknown>).turnstile) { renderTurnstile(); return; }
      if (document.querySelector('script[src*="turnstile"]')) return;
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
      script.async = true;
      (window as unknown as Record<string, unknown>).onTurnstileLoad = renderTurnstile;
      document.head.appendChild(script);
    };
    tryRender();
  }, [renderTurnstile]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (submit.kind === "sending") return;
    setSubmit({ kind: "sending" });
    try {
      const res = await fetch("/api/custom-protocol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: new URLSearchParams(location.search).get("src") === "quiz" ? "quiz_fallback" : "direct",
          "cf-turnstile-response": turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSubmit({ kind: "error", error: data.error || `HTTP ${res.status}` });
        return;
      }
      setSubmit({ kind: "ok", requestId: data.requestId });
    } catch (e2) {
      setSubmit({ kind: "error", error: e2 instanceof Error ? e2.message : String(e2) });
    }
  }

  if (submit.kind === "ok") {
    return (
      <>
        <Navigation variant="editorial" />
        <section className="pt-24 pb-16 lg:pt-32 bg-editorial-surface min-h-[60vh]">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-editorial-green/30 bg-editorial-green/5 p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-editorial-green/15">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F7B33" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 className="font-serif text-2xl font-bold text-editorial-text">Enquiry received</h1>
              <p className="mt-2 text-editorial-muted">
                Reference <span className="font-mono text-editorial-text">#{submit.requestId}</span>
              </p>
              <p className="mt-4 text-sm text-editorial-text leading-relaxed">
                A named specialist reviews every enquiry by hand. You'll get a reply within <strong>24 business hours</strong> — recommended compounds, batch-level CoAs, and a quote for the full bundle.
              </p>
              <div className="mt-6 flex gap-3 justify-center flex-wrap">
                <Link href="/compounds" className="rounded-lg border border-editorial-border bg-white px-5 py-3 text-sm font-semibold text-editorial-text hover:border-editorial-accent/30 transition-colors">
                  Browse the catalogue
                </Link>
                <Link href="/research-pathway" className="rounded-lg bg-editorial-accent px-5 py-3 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors">
                  Take the quiz instead →
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer variant="editorial" />
      </>
    );
  }

  const inputClass = "w-full rounded-lg border border-editorial-border bg-white px-4 py-3 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-colors";

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-6 lg:pt-32 bg-editorial-surface">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-editorial-accent">Bulk / Bespoke Enquiry</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text">
            Submit a bulk or bespoke enquiry
          </h1>
          <p className="mt-2 text-editorial-muted leading-relaxed">
            Describe your research in your own words. A named specialist reviews every submission by hand and replies with recommended compounds, batch CoAs, and a quote — within <strong>24 business hours</strong>. For research use only.
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-white min-h-[50vh]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={send} className="space-y-5">
            {/* Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-editorial-text mb-1.5">Your name <span className="text-red-500">*</span></label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Dr. Jane Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium text-editorial-text mb-1.5">Email <span className="text-red-500">*</span></label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="j.smith@institution.org" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5">Institution / organisation <span className="text-red-500">*</span></label>
              <input required value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} className={inputClass} placeholder="University of Cambridge · Charles River Labs · indie biotech, etc." />
              <p className="mt-1 text-xs text-editorial-muted">
                We verify every protocol request against a research institution or organisation. Independent researchers welcome — list your professional affiliation or lab name.
              </p>
            </div>

            {/* Research question */}
            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5">What's your research question? <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={5}
                value={form.researchQuestion}
                onChange={(e) => setForm({ ...form, researchQuestion: e.target.value })}
                className={inputClass}
                placeholder="e.g. We're investigating fibroblast migration after mechanical injury in rat Achilles tendon slices. We need a compound that supports VEGF-driven re-vascularisation."
              />
            </div>

            {/* Model system */}
            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5">Model system <span className="text-red-500">*</span></label>
              <select required value={form.modelSystem} onChange={(e) => setForm({ ...form, modelSystem: e.target.value })} className={inputClass}>
                <option value="">— Pick one —</option>
                {MODEL_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Cadence + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-editorial-text mb-1.5">Resupply cadence <span className="text-red-500">*</span></label>
                <select required value={form.cadence} onChange={(e) => setForm({ ...form, cadence: e.target.value })} className={inputClass}>
                  <option value="">— Pick one —</option>
                  {CADENCE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-editorial-text mb-1.5">Budget range <span className="text-red-500">*</span></label>
                <select required value={form.budgetRange} onChange={(e) => setForm({ ...form, budgetRange: e.target.value })} className={inputClass}>
                  <option value="">— Pick one —</option>
                  {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Already evaluating */}
            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5">
                Any compounds you're already evaluating? <span className="text-editorial-muted font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={form.compoundsAlreadyEvaluating}
                onChange={(e) => setForm({ ...form, compoundsAlreadyEvaluating: e.target.value })}
                className={inputClass}
                placeholder="e.g. BPC-157 at 10μg/kg from a different supplier; still deciding on TB-500 dose."
              />
            </div>

            {/* Consent */}
            <div className="rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-4">
              <label className="flex items-start gap-3 text-sm text-editorial-text leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.consentToResearchVerification}
                  onChange={(e) => setForm({ ...form, consentToResearchVerification: e.target.checked })}
                  className="mt-1 h-4 w-4 accent-editorial-accent"
                />
                <span>
                  I confirm this request is for <strong>lawful in vitro research</strong>, I'm 18+ and affiliated with the organisation above, and I consent to Premio Peptides verifying this request before fulfilment. <strong>For research use only. Not for human consumption.</strong>
                </span>
              </label>
            </div>

            {/* Turnstile */}
            <div ref={turnstileRef} />

            {submit.kind === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-900">
                {submit.error}
              </div>
            )}

            <button
              type="submit"
              disabled={submit.kind === "sending" || !form.consentToResearchVerification || !turnstileToken}
              className="w-full rounded-lg bg-editorial-accent px-6 py-4 text-base font-bold text-white hover:bg-editorial-accent-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submit.kind === "sending" ? "Sending…" : "Submit enquiry — 24h named-specialist reply"}
            </button>

            <p className="text-xs text-editorial-muted text-center">
              Prefer the structured quiz? <Link href="/research-pathway" className="text-editorial-accent hover:underline">Take the research-pathway quiz instead →</Link>
            </p>
          </form>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
