/**
 * Research-pathway quiz data model.
 *
 * Framing contract (compliance-critical — don't change without a council review):
 *   - All questions MUST be addressed to a researcher, never a consumer.
 *   - Answers MUST be scientific (receptor pathways, model systems, protocol cadence),
 *     never health symptoms or human outcomes.
 *   - Bundle recommendations MUST be returned as "compounds matching this protocol",
 *     never "we recommend X for your condition".
 *   - "For research use only" footer MUST appear on every result page.
 */

export interface PathwayQuestion {
  id: string;
  title: string;        // visible headline, e.g. "Primary research area"
  subtitle?: string;    // optional explainer line
  options: Array<{
    id: string;
    label: string;      // visible chip label, e.g. "Metabolic / cardiometabolic"
    scores: Partial<Record<PathwayKey, number>>; // adds to the pathway score
  }>;
}

export type PathwayKey =
  | "metabolic"
  | "regenerative"
  | "longevity"
  | "dermal"
  | "behavioural"
  | "growth";

export interface Pathway {
  key: PathwayKey;
  label: string;              // e.g. "Metabolic Pathway"
  tagline: string;            // one-liner for the result card
  receptorFamily: string;     // scientific framing
  compoundSlugs: string[];    // which SKUs from the catalogue (match products:cl_mo71hxje slugs)
  researchFocus: string[];    // bullets shown on the result card
  modelSystems: string[];     // compatible model systems
  typicalCadence: "weekly" | "fortnightly" | "monthly";
}

export const PATHWAYS: Record<PathwayKey, Pathway> = {
  metabolic: {
    key: "metabolic",
    label: "Metabolic Pathway",
    tagline: "Incretin-receptor pharmacology & energy metabolism",
    receptorFamily: "GLP-1 / GIP / Glucagon triagonism",
    compoundSlugs: ["retatrutide", "tesamorelin-pen-20mg"],
    researchFocus: [
      "Convergent Gs / cAMP / PKA signalling across three incretin receptors",
      "Hepatic glucagon-driven lipolysis + FGF21 induction",
      "Hypothalamic POMC / AgRP appetite-circuit modulation",
    ],
    modelSystems: ["Diet-induced obesity (DIO) rodent", "Hepatic steatosis", "Primary hepatocyte culture"],
    typicalCadence: "monthly",
  },
  regenerative: {
    key: "regenerative",
    label: "Regenerative Pathway",
    tagline: "Tissue-repair peptides for connective & GI research",
    receptorFamily: "VEGF / FGF-R / nitric oxide synthase",
    compoundSlugs: ["bpc-157", "tb-500", "bpc-157-tb-500-wolverine"],
    researchFocus: [
      "Tendon & ligament fibroblast migration + proliferation",
      "GI mucosal re-epithelialisation + angiogenic signalling",
      "Equine lameness & soft-tissue repair models",
    ],
    modelSystems: ["Rat tendon injury", "Mouse colitis", "Equine lameness", "Fibroblast culture"],
    typicalCadence: "monthly",
  },
  longevity: {
    key: "longevity",
    label: "Mitochondrial / Longevity Pathway",
    tagline: "Energy-sensing & oxidative-stress research",
    receptorFamily: "NAD+-dependent sirtuins / AMPK / mTOR crosstalk",
    compoundSlugs: ["nad-plus-pen-500mg", "mots-c-pen-40mg", "ss-31", "epithalon"],
    researchFocus: [
      "SIRT1/SIRT3 activity assays in aged mitochondria",
      "AMPK-driven glucose homeostasis in muscle",
      "ROS production + oxidative-stress markers in senescent cells",
    ],
    modelSystems: ["Aged mouse (24m+)", "Primary mitochondria preps", "C2C12 myoblasts"],
    typicalCadence: "monthly",
  },
  dermal: {
    key: "dermal",
    label: "Dermal Pathway",
    tagline: "Fibroblast + extracellular-matrix research",
    receptorFamily: "Copper-tripeptide / collagen & elastin synthesis",
    compoundSlugs: ["ghk-cu-glow-stack", "ghk-cu"],
    researchFocus: [
      "Type-I and -III collagen expression in primary fibroblasts",
      "Hyaluronic-acid & decorin matrix remodelling",
      "Wound-healing assays & re-epithelialisation",
    ],
    modelSystems: ["Primary dermal fibroblasts", "Full-thickness wound rodent", "3D skin-equivalent culture"],
    typicalCadence: "monthly",
  },
  behavioural: {
    key: "behavioural",
    label: "Behavioural / Neuro Pathway",
    tagline: "Melanocortin & central-nervous-system signalling",
    receptorFamily: "Mel-4R (central) + Mel-3R",
    compoundSlugs: ["pt-141-pen", "pt-141"],
    researchFocus: [
      "cAMP / PKA signalling at hypothalamic Mel-4R",
      "Rodent behavioural assays — social, exploratory, consummatory",
      "Pharmacokinetic + pharmacodynamic profiling",
    ],
    modelSystems: ["Rodent behavioural (OFT, EPM, FST)", "Hypothalamic slice", "HEK-MC4R overexpression"],
    typicalCadence: "monthly",
  },
  growth: {
    key: "growth",
    label: "Growth / Pituitary Pathway",
    tagline: "GHRH-receptor pharmacology & pulsatile hormone research",
    receptorFamily: "GHRH-R / somatotroph signalling",
    compoundSlugs: ["tesamorelin-pen-20mg", "tesamorelin", "cjc-1295-no-dac", "ipamorelin"],
    researchFocus: [
      "GH-release dynamics in primary pituitary culture",
      "IGF-1 feedback in juvenile vs aged rodents",
      "Visceral-adipose body-composition studies",
    ],
    modelSystems: ["Primary rat pituitary", "Juvenile rodent GH-release", "DIO visceral-fat"],
    typicalCadence: "monthly",
  },
};

export const QUESTIONS: PathwayQuestion[] = [
  {
    id: "research_area",
    title: "Which research area are you working in?",
    subtitle: "Pick the one that best describes your current protocol — compound recommendations are built around this.",
    options: [
      { id: "metabolic",    label: "Metabolic / cardiometabolic",      scores: { metabolic: 3 } },
      { id: "regenerative", label: "Regenerative / tissue repair",     scores: { regenerative: 3 } },
      { id: "longevity",    label: "Mitochondrial / cellular ageing",  scores: { longevity: 3 } },
      { id: "dermal",       label: "Dermal / fibroblast / wound",      scores: { dermal: 3 } },
      { id: "behavioural",  label: "Behavioural / neuro-pharmacology", scores: { behavioural: 3 } },
      { id: "growth",       label: "Growth hormone / pituitary",       scores: { growth: 3 } },
    ],
  },
  {
    id: "receptor_focus",
    title: "Which receptor family is central to your work?",
    subtitle: "Multiple apply? Pick the one you've designed the primary assay around.",
    options: [
      { id: "incretin",     label: "Incretin receptors (GLP-1 / GIP / Glucagon)", scores: { metabolic: 2 } },
      { id: "repair",       label: "VEGF / FGF / NOS repair pathways",             scores: { regenerative: 2 } },
      { id: "sirtuin",      label: "Sirtuin / AMPK / mitochondrial sensors",       scores: { longevity: 2 } },
      { id: "copper",       label: "Copper-tripeptide / ECM synthesis",            scores: { dermal: 2 } },
      { id: "melanocortin", label: "Melanocortin (Mel-3R / Mel-4R)",               scores: { behavioural: 2 } },
      { id: "ghrh",         label: "GHRH-R / somatotroph signalling",              scores: { growth: 2 } },
    ],
  },
  {
    id: "model",
    title: "What model system are you working with?",
    subtitle: "Used to confirm compatibility with the recommended compounds' stability + dosing data.",
    options: [
      { id: "in_vitro", label: "In vitro cell culture",   scores: {} },
      { id: "rodent",   label: "Rodent (mouse / rat)",    scores: {} },
      { id: "primate",  label: "Non-human primate",       scores: {} },
      { id: "equine",   label: "Equine / veterinary",     scores: { regenerative: 1 } },
      { id: "explant",  label: "Tissue explants / slice", scores: {} },
      { id: "human",    label: "Human cell lines",        scores: { dermal: 1 } },
    ],
  },
  {
    id: "cadence",
    title: "What's your resupply cadence?",
    subtitle: "This decides whether we flag your result as a standing research order or one-off batch.",
    options: [
      { id: "oneoff",   label: "One-off batch for a defined study",     scores: {} },
      { id: "quarterly",label: "Every 3 months (grant-cycle)",          scores: {} },
      { id: "monthly",  label: "Monthly standing programme",            scores: {} },
      { id: "variable", label: "Variable — depends on study timing",    scores: {} },
    ],
  },
  {
    id: "unit",
    title: "What type of research unit?",
    subtitle: "For your invoice and shipping records — nothing changes about the compounds.",
    options: [
      { id: "independent", label: "Independent researcher",        scores: {} },
      { id: "university",  label: "University lab",                scores: {} },
      { id: "cro",         label: "CRO / contract research org",   scores: {} },
      { id: "pharma",      label: "Pharma / biotech R&D",          scores: {} },
      { id: "vet",         label: "Veterinary research",           scores: { regenerative: 1 } },
      { id: "startup",     label: "Biotech startup",               scores: {} },
    ],
  },
];

export interface QuizAnswers {
  research_area: string;
  receptor_focus: string;
  model: string;
  cadence: string;
  unit: string;
}

export interface QuizResult {
  topPathway: Pathway;
  altPathway?: Pathway;      // runner-up for cross-sell
  scores: Record<PathwayKey, number>;
  recommendedCadence: "monthly" | "quarterly" | "oneoff";
  isStandingOrder: boolean;  // true if cadence answer is "monthly"
}

export function scoreQuiz(answers: Partial<QuizAnswers>): QuizResult {
  const scores: Record<PathwayKey, number> = {
    metabolic: 0, regenerative: 0, longevity: 0, dermal: 0, behavioural: 0, growth: 0,
  };
  for (const q of QUESTIONS) {
    const picked = answers[q.id as keyof QuizAnswers];
    if (!picked) continue;
    const opt = q.options.find((o) => o.id === picked);
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.scores)) {
      scores[k as PathwayKey] = (scores[k as PathwayKey] || 0) + (v || 0);
    }
  }
  const ranked = (Object.entries(scores) as Array<[PathwayKey, number]>)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0);
  const topKey: PathwayKey = ranked[0]?.[0] || "metabolic";
  const altKey: PathwayKey | undefined = ranked[1]?.[0];
  const cadence = answers.cadence;
  const recommendedCadence: QuizResult["recommendedCadence"] =
    cadence === "monthly" ? "monthly" : cadence === "quarterly" ? "quarterly" : "oneoff";
  return {
    topPathway: PATHWAYS[topKey],
    altPathway: altKey ? PATHWAYS[altKey] : undefined,
    scores,
    recommendedCadence,
    isStandingOrder: cadence === "monthly",
  };
}

/**
 * Discount model:
 *   - 15% off bundle total for any pathway recommendation
 *   - +5% extra for standing orders (so 20% total)
 */
export function bundleDiscountPct(result: QuizResult): number {
  return result.isStandingOrder ? 20 : 15;
}
