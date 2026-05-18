"use client";

import { useState } from "react";
import Link from "next/link";
import type { BatchRecord } from "@/data/batches";
import { WHATSAPP_NUMBER } from "@/lib/pathway-mapping";

type Status = "idle" | "loading" | "found" | "missing" | "error";

export function BatchVerifierForm() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [batch, setBatch] = useState<BatchRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    setStatus("loading");
    setBatch(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/verify-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = await res.json();
      if (data.ok && data.found && data.batch) {
        setBatch(data.batch);
        setStatus("found");
      } else if (data.ok === false && data.found === false) {
        setStatus("missing");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection error. Please try again.");
    }
  };

  const reset = () => {
    setCode("");
    setStatus("idle");
    setBatch(null);
    setErrorMsg("");
  };

  return (
    <div className="mt-8">
      <form onSubmit={submit} className="bg-white border border-editorial-border rounded-2xl p-5 sm:p-6 shadow-sm">
        <label htmlFor="batch-code" className="block text-xs font-bold tracking-[0.12em] uppercase text-editorial-muted mb-2">
          Batch code
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="batch-code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. PRM-2510-027"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            required
            className="flex-1 px-4 py-3 rounded-lg border border-editorial-border text-base text-editorial-text placeholder:text-editorial-muted/60 font-mono tracking-wide focus:outline-none focus:border-editorial-accent focus:ring-2 focus:ring-editorial-accent/20 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading" || !code.trim()}
            className="px-6 py-3 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white font-semibold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Checking…" : "Verify batch"}
          </button>
        </div>
        <p className="mt-3 text-xs text-editorial-muted">
          The batch code is printed on the side sticker of your pen and in the order email. Format: PRM-YYMM-NNN.
        </p>
      </form>

      {status === "error" && (
        <div className="mt-4 rounded-lg border border-editorial-warm/40 bg-editorial-warm/5 p-4 text-sm text-editorial-text">
          {errorMsg}
        </div>
      )}

      {status === "missing" && (
        <div className="mt-6 rounded-2xl border border-editorial-border bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-editorial-warm/10 text-editorial-warm flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-editorial-text">No record for that batch code yet</p>
              <p className="mt-1 text-sm text-editorial-muted leading-relaxed">
                We may not have indexed this batch in the verifier yet — message us on WhatsApp and we&rsquo;ll send the third-party CoA for your order directly within an hour.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Premio Peptides — please send the CoA for batch ${code}. Thanks!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-colors"
                >
                  Message us on WhatsApp →
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-editorial-border text-editorial-text hover:border-editorial-accent text-sm font-semibold transition-colors"
                >
                  Try a different code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "found" && batch && (
        <div className="mt-6 rounded-2xl border border-editorial-green/30 bg-editorial-green/[0.03] p-6 sm:p-8" aria-live="polite">
          <div className="flex items-center gap-3 mb-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-editorial-green/10 text-editorial-green flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 12 9 18 21 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-editorial-green">Verified batch</p>
              <p className="font-mono text-lg font-semibold text-editorial-text">{batch.code}</p>
            </div>
          </div>

          <p className="text-sm text-editorial-muted mb-1">Compound</p>
          <p className="font-serif text-2xl font-semibold text-editorial-text mb-5">{batch.compoundName}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-editorial-border pt-5">
            <div>
              <dt className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">HPLC purity</dt>
              <dd className="mt-1 text-2xl font-bold text-editorial-text font-mono">{batch.purity}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">Tested by</dt>
              <dd className="mt-1 text-base text-editorial-text">{batch.lab}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">Test date</dt>
              <dd className="mt-1 text-base text-editorial-text font-mono">{batch.testedDate}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">Dispatched</dt>
              <dd className="mt-1 text-base text-editorial-text font-mono">{batch.dispatchedDate}</dd>
            </div>
            {batch.storage && (
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wider text-editorial-muted font-semibold">Storage</dt>
                <dd className="mt-1 text-sm text-editorial-text leading-relaxed">{batch.storage}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={batch.coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-editorial-accent hover:bg-editorial-accent-dark text-white text-sm font-semibold transition-colors"
            >
              View full CoA (PDF) →
            </a>
            <Link
              href={`/compounds/${batch.compoundSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-editorial-border text-editorial-text hover:border-editorial-accent hover:text-editorial-accent text-sm font-semibold transition-colors"
            >
              View compound page
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-editorial-muted hover:text-editorial-text text-sm font-medium transition-colors"
            >
              Verify another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
