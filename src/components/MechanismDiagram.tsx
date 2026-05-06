// Server-rendered mechanism-of-action infographic. Inline SVG so Google
// can read every word and the SVG icons scale crisply at any size.
// Per-product mechanism data lives in `mechanisms` below; new entries
// can be added here or migrated to the CMS later.

interface MechanismStage {
  title: string;
  body: string;
  bullets: string[];
}

export interface ProductMechanism {
  sequence?: string;
  origin?: string;
  stages: [MechanismStage, MechanismStage, MechanismStage];
}

const mechanisms: Record<string, ProductMechanism> = {
  "bpc-157": {
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    origin: "Synthetic 15-residue fragment derived from a human gastric protective protein.",
    stages: [
      {
        title: "Molecular target",
        body: "A pentadecapeptide investigated for its interaction with growth-factor receptors and intracellular signalling complexes in research models.",
        bullets: [
          "VEGFR2 (vascular endothelial growth factor receptor 2)",
          "FAK–paxillin focal-adhesion complex",
          "Endothelial nitric-oxide synthase (eNOS)",
        ],
      },
      {
        title: "Investigated pathways",
        body: "Preclinical studies have explored downstream effects on the nitric-oxide system, growth-factor signalling, and angiogenesis-related responses in vitro.",
        bullets: [
          "Nitric-oxide release modulation",
          "Endothelial tube-formation assays",
          "Fibroblast migration and proliferation",
        ],
      },
      {
        title: "Preclinical research applications",
        body: "Used as a research tool in laboratory models exploring tissue-repair biology and gut-mucosa science. Not approved for human use.",
        bullets: [
          "Tendon and ligament fibroblast research",
          "Gastric and intestinal mucosa models",
          "Bone-defect healing studies",
        ],
      },
    ],
  },
};

export function getMechanism(slug: string): ProductMechanism | undefined {
  return mechanisms[slug];
}

interface Props {
  productName: string;
  mechanism: ProductMechanism;
}

export default function MechanismDiagram({ productName, mechanism }: Props) {
  const { sequence, origin, stages } = mechanism;

  return (
    <section
      aria-labelledby={`mechanism-heading-${productName.replace(/\s+/g, "-")}`}
      className="py-12 lg:py-16 bg-white"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          id={`mechanism-heading-${productName.replace(/\s+/g, "-")}`}
          className="font-serif text-2xl font-bold text-editorial-text mb-2"
        >
          Research Mechanism — {productName}
        </h2>
        <p className="text-sm text-editorial-muted mb-8">
          A simplified summary of what {productName} is studied for in research models. For laboratory in-vitro use only.
        </p>

        {(sequence || origin) && (
          <div className="mb-8 rounded-xl border border-editorial-border bg-editorial-surface p-5">
            {sequence && (
              <p className="text-xs font-mono text-editorial-text break-all">
                <span className="font-sans font-semibold text-editorial-muted not-italic mr-2">Sequence:</span>
                {sequence}
              </p>
            )}
            {origin && (
              <p className="mt-2 text-sm text-editorial-muted">
                <span className="font-semibold text-editorial-text">Origin:</span> {origin}
              </p>
            )}
          </div>
        )}

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 list-none">
          {stages.map((stage, i) => (
            <li
              key={stage.title}
              className="relative rounded-xl border border-editorial-border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-editorial-accent text-white text-sm font-bold"
                >
                  {i + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-editorial-text">{stage.title}</h3>
              </div>

              <p className="text-sm text-editorial-muted leading-relaxed mb-4">{stage.body}</p>

              <ul className="space-y-2">
                {stage.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-editorial-text">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-1 shrink-0 text-editorial-accent"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Connector arrow to next stage (desktop only) */}
              {i < stages.length - 1 && (
                <svg
                  aria-hidden="true"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-editorial-accent/50 bg-white"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs text-editorial-muted italic">
          For research use only. {productName} is not approved as a medicine in the UK and is not intended for human or veterinary administration.
          See the <a href="/compliance" className="underline hover:text-editorial-accent">compliance page</a> for full terms.
        </p>
      </div>
    </section>
  );
}
