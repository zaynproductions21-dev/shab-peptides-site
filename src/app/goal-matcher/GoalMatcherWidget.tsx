"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PATHWAYS,
  FORMAT_OPTIONS,
  DURATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  buildWhatsAppDeepLink,
  type PathwayKey,
} from "@/lib/pathway-mapping";

type Step = 0 | 1 | 2 | 3 | 4;

export function GoalMatcherWidget() {
  const [step, setStep] = useState<Step>(0);
  const [pathway, setPathway] = useState<PathwayKey | "">("");
  const [format, setFormat] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  const matched = pathway ? PATHWAYS.find(p => p.key === pathway) : undefined;
  const isStackEligible = duration === "8-12w" || duration === "ongoing";
  const isBulk = duration === "ongoing";

  const reset = () => {
    setStep(0);
    setPathway("");
    setFormat("");
    setDuration("");
    setExperience("");
  };

  const advance = (next: Step) => setStep(next);

  // Build the WhatsApp deep-link based on duration tier
  const waLink = matched
    ? isBulk
      ? buildWhatsAppDeepLink("BULK", `${matched.label}, ongoing research quantities`)
      : isStackEligible
        ? buildWhatsAppDeepLink(matched.manychatKeyword, `${matched.label}, stack pricing`)
        : buildWhatsAppDeepLink(matched.manychatKeyword, matched.label)
    : "";

  return (
    <div className="mt-8">
      {/* Progress bar */}
      {step < 4 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-editorial-muted mb-2">
            <span>Step {step + 1} of 4</span>
            <span>Pathway language only · MHRA-compliant</span>
          </div>
          <div className="h-1.5 bg-editorial-border rounded-full overflow-hidden">
            <div
              className="h-full bg-editorial-accent transition-all duration-300"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Q1 — Pathway */}
      {step === 0 && (
        <div className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-editorial-text mb-2">
            Which research pathway are you focused on?
          </h2>
          <p className="text-sm text-editorial-muted mb-5">
            Choose the mechanism your work centres on. Compounds are matched on
            literature, not outcome claims.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {PATHWAYS.map(p => {
              const active = pathway === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPathway(p.key)}
                  className={`flex items-start gap-3 w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    active
                      ? "border-editorial-accent bg-editorial-accent/5 text-editorial-text"
                      : "border-editorial-border text-editorial-text hover:border-editorial-accent/40"
                  }`}
                >
                  <span
                    className={`mt-1 inline-flex w-4 h-4 shrink-0 rounded-full border-2 items-center justify-center ${
                      active ? "border-editorial-accent bg-editorial-accent" : "border-editorial-border"
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm sm:text-[15px] leading-snug">{p.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => advance(1)}
              disabled={!pathway}
              className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Q2 — Format */}
      {step === 1 && (
        <div className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-editorial-text mb-2">
            Preferred research format?
          </h2>
          <p className="text-sm text-editorial-muted mb-5">
            Preloaded pens skip reconstitution; powder vials give full control.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {FORMAT_OPTIONS.map(o => {
              const active = format === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setFormat(o.value)}
                  className={`flex items-start gap-3 w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    active
                      ? "border-editorial-accent bg-editorial-accent/5 text-editorial-text"
                      : "border-editorial-border text-editorial-text hover:border-editorial-accent/40"
                  }`}
                >
                  <span className={`mt-1 inline-flex w-4 h-4 shrink-0 rounded-full border-2 items-center justify-center ${active ? "border-editorial-accent bg-editorial-accent" : "border-editorial-border"}`}>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm sm:text-[15px] leading-snug">{o.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-between gap-2">
            <button type="button" onClick={() => advance(0)} className="px-4 py-3 rounded-lg border border-editorial-border text-editorial-muted hover:text-editorial-text hover:border-editorial-accent text-sm font-medium transition-colors">← Back</button>
            <button type="button" onClick={() => advance(2)} disabled={!format} className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Continue →</button>
          </div>
        </div>
      )}

      {/* Q3 — Duration */}
      {step === 2 && (
        <div className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-editorial-text mb-2">
            Protocol duration planned?
          </h2>
          <p className="text-sm text-editorial-muted mb-5">
            Longer protocols unlock stack pricing. Ongoing volume routes to a
            bulk enquiry on WhatsApp.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {DURATION_OPTIONS.map(o => {
              const active = duration === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setDuration(o.value)}
                  className={`flex items-start gap-3 w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    active
                      ? "border-editorial-accent bg-editorial-accent/5 text-editorial-text"
                      : "border-editorial-border text-editorial-text hover:border-editorial-accent/40"
                  }`}
                >
                  <span className={`mt-1 inline-flex w-4 h-4 shrink-0 rounded-full border-2 items-center justify-center ${active ? "border-editorial-accent bg-editorial-accent" : "border-editorial-border"}`}>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm sm:text-[15px] leading-snug">{o.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-between gap-2">
            <button type="button" onClick={() => advance(1)} className="px-4 py-3 rounded-lg border border-editorial-border text-editorial-muted hover:text-editorial-text hover:border-editorial-accent text-sm font-medium transition-colors">← Back</button>
            <button type="button" onClick={() => advance(3)} disabled={!duration} className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Continue →</button>
          </div>
        </div>
      )}

      {/* Q4 — Experience */}
      {step === 3 && (
        <div className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-7">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-editorial-text mb-2">
            Experience with reconstitution?
          </h2>
          <p className="text-sm text-editorial-muted mb-5">
            We&rsquo;ll surface the reconstitution calculator if you&rsquo;re
            new to it.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {EXPERIENCE_OPTIONS.map(o => {
              const active = experience === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setExperience(o.value)}
                  className={`flex items-start gap-3 w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    active
                      ? "border-editorial-accent bg-editorial-accent/5 text-editorial-text"
                      : "border-editorial-border text-editorial-text hover:border-editorial-accent/40"
                  }`}
                >
                  <span className={`mt-1 inline-flex w-4 h-4 shrink-0 rounded-full border-2 items-center justify-center ${active ? "border-editorial-accent bg-editorial-accent" : "border-editorial-border"}`}>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm sm:text-[15px] leading-snug">{o.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-between gap-2">
            <button type="button" onClick={() => advance(2)} className="px-4 py-3 rounded-lg border border-editorial-border text-editorial-muted hover:text-editorial-text hover:border-editorial-accent text-sm font-medium transition-colors">← Back</button>
            <button type="button" onClick={() => advance(4)} disabled={!experience} className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors">See match →</button>
          </div>
        </div>
      )}

      {/* Result */}
      {step === 4 && matched && (
        <div className="rounded-2xl border border-editorial-accent/30 bg-white p-6 sm:p-8" aria-live="polite">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-editorial-accent">Matched pathway</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-editorial-text leading-tight">{matched.label}</h2>
          <p className="mt-3 text-sm sm:text-base text-editorial-muted leading-relaxed">{matched.summary}</p>

          <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-editorial-accent bg-editorial-accent/5 border border-editorial-accent/20 rounded-full px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {matched.citationCount}+ peer-reviewed papers reference this pathway
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.12em] uppercase text-editorial-muted">Compounds studied for this pathway</p>
          <ul className="mt-3 grid gap-2">
            {matched.compounds.map(c => (
              <li key={c.slug}>
                <Link
                  href={`/compounds/${c.slug}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-editorial-border hover:border-editorial-accent hover:bg-editorial-accent/5 transition-colors group"
                >
                  <span className="text-sm sm:text-[15px] font-semibold text-editorial-text group-hover:text-editorial-accent transition-colors">{c.name}</span>
                  <span className="text-xs text-editorial-muted group-hover:text-editorial-accent transition-colors">View compound →</span>
                </Link>
              </li>
            ))}
          </ul>

          {isStackEligible && matched.compounds.length > 1 && (
            <div className="mt-4 rounded-lg bg-editorial-accent/5 border border-editorial-accent/20 p-4">
              <p className="text-sm text-editorial-text">
                <strong>Stack pricing available</strong> on this combination for 8–12 week protocols — message us with your selection for the bundle quote.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              {isBulk ? "Enquire about bulk research quantities" : "Get this protocol on WhatsApp"}
            </a>
            {(experience === "first-time" || experience === "familiar") && (
              <Link
                href="/reconstitution-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-editorial-border text-editorial-text hover:border-editorial-accent hover:text-editorial-accent text-sm font-semibold transition-colors"
              >
                Reconstitution calculator →
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-4 text-xs text-editorial-muted hover:text-editorial-text underline underline-offset-2"
          >
            ← Start over with a different pathway
          </button>

          <p className="mt-5 text-xs text-editorial-muted leading-relaxed">
            Reference information based on peer-reviewed laboratory research. Not a dosing recommendation, not a therapeutic claim. For laboratory and research use only.
          </p>
        </div>
      )}
    </div>
  );
}
