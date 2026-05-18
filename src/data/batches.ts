// ── Premio Peptides Batch Registry ──────────────────────────────────────────
//
// Backing data for the Batch Verifier (/batch-verifier). Each entry maps a
// batch code printed on a pen sticker to its third-party HPLC CoA and lab.
//
// Populate this file as new batches ship — or migrate to a database/CMS once
// volume justifies it. For now, JSON-in-source keeps deployment trivial.
//
// Batch code format: PRM-{YYMM}-{NNN} (e.g. PRM-2510-027)
// ────────────────────────────────────────────────────────────────────────────

export interface BatchRecord {
  /** Batch code as printed on the pen sticker, uppercase, no spaces. */
  code: string;
  /** Compound slug (matches /compounds/[slug]). */
  compoundSlug: string;
  /** Display name of the compound. */
  compoundName: string;
  /** Purity % as reported by the third-party HPLC analysis. */
  purity: string;
  /** ISO date string (YYYY-MM-DD) — when this batch was tested. */
  testedDate: string;
  /** ISO date string — when this batch was dispatched / first shipped. */
  dispatchedDate: string;
  /** Third-party lab that ran the HPLC + mass spec. */
  lab: string;
  /** Public URL to the CoA PDF. */
  coaUrl: string;
  /** Optional storage notes specific to this batch. */
  storage?: string;
}

/**
 * Sample batches — replace with real data as orders ship.
 * Keep at least one entry per compound family so the verifier always has
 * something to demo against during onboarding.
 */
export const BATCHES: BatchRecord[] = [
  {
    code: "PRM-2510-027",
    compoundSlug: "wolverine-stack",
    compoundName: "Wolverine Stack (BPC-157 + TB-500)",
    purity: "99.4%",
    testedDate: "2026-05-03",
    dispatchedDate: "2026-05-09",
    lab: "Janoshik Analytical (independent)",
    coaUrl: "/coa/PRM-2510-027.pdf",
    storage: "Stored at −20°C in temperature-controlled UK warehouse.",
  },
  {
    code: "PRM-2510-031",
    compoundSlug: "pt-141-pen",
    compoundName: "PT-141 (Bremelanotide) Pen",
    purity: "99.2%",
    testedDate: "2026-05-05",
    dispatchedDate: "2026-05-11",
    lab: "Janoshik Analytical (independent)",
    coaUrl: "/coa/PRM-2510-031.pdf",
    storage: "Stored at −20°C in temperature-controlled UK warehouse.",
  },
];

export function findBatch(code: string): BatchRecord | undefined {
  const normalised = (code || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!normalised) return undefined;
  return BATCHES.find(b => b.code.toUpperCase() === normalised);
}
