// ── Pathway → Compound Mapping (council-locked) ────────────────────────────
//
// Drives the Research Goal Matcher (/goal-matcher). Q1 options were signed
// off by founder 2026-05-18 — DO NOT rewrite any pathway label without an
// MHRA/ASA review. See `.claude/brand-docs/premio-tools-decision.md` in the
// publishos repo for the council transcript and compliance hardline.
//
// Compliance rule: pathway language only. Never goal/benefit verbs.
// ───────────────────────────────────────────────────────────────────────────

export type PathwayKey =
  | "tissue-repair"
  | "metabolic"
  | "cognitive"
  | "skin-collagen"
  | "behavioural-response"
  | "longevity-cellular";

export interface PathwayOption {
  key: PathwayKey;
  /** SIGNED OFF wording — do not rewrite without compliance review. */
  label: string;
  /** Compounds surfaced for this pathway. First slug = primary card. */
  compounds: { slug: string; name: string }[];
  /** ManyChat keyword to pre-fill in the wa.me deep link. */
  manychatKeyword: string;
  /** Plain-language pathway summary for the result card (no benefit claims). */
  summary: string;
  /** PubMed citation count (approximate — update quarterly). */
  citationCount: number;
}

export const PATHWAYS: PathwayOption[] = [
  {
    key: "tissue-repair",
    label: "Compounds studied for tissue-repair pathways",
    compounds: [
      { slug: "wolverine-stack", name: "Wolverine Stack (BPC-157 + TB-500)" },
      { slug: "bpc-157", name: "BPC-157" },
      { slug: "tb-500", name: "TB-500" },
    ],
    manychatKeyword: "WOLVERINE",
    summary:
      "Peptides referenced in the laboratory literature on collagen remodelling, angiogenesis and growth-factor signalling.",
    citationCount: 240,
  },
  {
    key: "metabolic",
    label: "Compounds studied for metabolic pathways",
    compounds: [
      { slug: "retatrutide", name: "Retatrutide" },
      { slug: "mots-c", name: "MOTS-c" },
      { slug: "tirzepatide", name: "Tirzepatide" },
    ],
    manychatKeyword: "METABOLIC",
    summary:
      "Compounds with published research on GLP-1, GIP and mitochondrial-derived signalling pathways.",
    citationCount: 410,
  },
  {
    key: "cognitive",
    label: "Compounds studied for cognitive pathways",
    compounds: [
      { slug: "semax", name: "Semax" },
      { slug: "selank", name: "Selank" },
      { slug: "cerebrolysin", name: "Cerebrolysin" },
    ],
    manychatKeyword: "BRAIN",
    summary:
      "Neuropeptides referenced in the literature on BDNF expression, tuftsin-analog pathways and neurotrophic signalling.",
    citationCount: 180,
  },
  {
    key: "skin-collagen",
    label: "Compounds studied for skin / collagen pathways",
    compounds: [
      { slug: "ghk-cu", name: "GHK-Cu" },
      { slug: "epitalon", name: "Epitalon" },
    ],
    manychatKeyword: "GLOW",
    summary:
      "Peptides studied for copper-tripeptide signalling, fibroblast activity and extracellular-matrix remodelling research.",
    citationCount: 320,
  },
  {
    key: "behavioural-response",
    label: "Compounds studied for behavioural-response pathways",
    compounds: [
      { slug: "pt-141-pen", name: "PT-141 (Bremelanotide) Pen" },
    ],
    manychatKeyword: "STACK",
    summary:
      "Melanocortin-receptor research compound studied for brain-mediated behavioural-response signalling.",
    citationCount: 95,
  },
  {
    key: "longevity-cellular",
    label: "Compounds studied for longevity / cellular pathways",
    compounds: [
      { slug: "nad-plus", name: "NAD+" },
      { slug: "epitalon", name: "Epitalon" },
      { slug: "mots-c", name: "MOTS-c" },
    ],
    manychatKeyword: "LONGEVITY",
    summary:
      "Compounds with research on NAD+ metabolism, telomerase expression and mitochondrial-derived peptide signalling.",
    citationCount: 260,
  },
];

export const FORMAT_OPTIONS = [
  { value: "pen", label: "Preloaded pen (no mixing)" },
  { value: "vial", label: "Powder vial (full control)" },
  { value: "any", label: "No preference" },
] as const;

export const DURATION_OPTIONS = [
  { value: "4w", label: "4 weeks (single vial)" },
  { value: "8-12w", label: "8–12 weeks (stack pricing)" },
  { value: "ongoing", label: "Ongoing (bulk enquiry)" },
] as const;

export const EXPERIENCE_OPTIONS = [
  { value: "first-time", label: "First-time researcher" },
  { value: "familiar", label: "Familiar with reconstitution" },
  { value: "advanced", label: "Advanced (multi-compound stacking)" },
] as const;

export const WHATSAPP_NUMBER = "447466402766";

export function buildWhatsAppDeepLink(keyword: string, extra?: string): string {
  const text = extra ? `${keyword} — ${extra}` : keyword;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
