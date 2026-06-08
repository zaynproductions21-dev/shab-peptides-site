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
 * No verified batches are published yet. The previous entries were placeholder
 * demo data (named lab, exact purity figures and CoA PDF links that 404) and
 * were removed for compliance — fabricated/unverifiable claims must never render
 * on a health/YMYL site. The Batch Verifier shows a "no verified batches
 * published yet" empty state while this list is empty.
 *
 * TODO(client): load real CoA batch data (lab name, ISO number, purity, signed
 * PDF) before re-enabling. Add the signed CoA PDFs under /public/coa/ and only
 * then repopulate this array with verified records.
 */
export const BATCHES: BatchRecord[] = [];

export function findBatch(code: string): BatchRecord | undefined {
  const normalised = (code || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!normalised) return undefined;
  return BATCHES.find(b => b.code.toUpperCase() === normalised);
}
