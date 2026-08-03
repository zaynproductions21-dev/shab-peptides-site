import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Peptide Research Guidelines | Premio Peptides UK",
  description:
    "Essential handling, storage, reconstitution and safety guidelines for research peptides. Premio Peptides supplies UK researchers with third-party verified peptides for laboratory use only.",
};

const faqs = [
  {
    question: "At what temperature should lyophilised research peptides be stored?",
    answer:
      "-20\u00B0C is the standard minimum. For long-term archival of sensitive sequences, -80\u00B0C is preferable. Peptides containing easily oxidised residues \u2014 Cys, Met, Trp \u2014 benefit from desiccant or inert gas storage. Let vials reach room temperature before opening to prevent moisture ingress.",
  },
  {
    question: "How many freeze-thaw cycles can a reconstituted peptide solution withstand?",
    answer:
      "No more than three before degradation becomes a measurable concern. The straightforward way to avoid the problem: aliquot reconstituted stocks into single-use volumes immediately after preparation, freeze at -80\u00B0C, and thaw only what you need for each session.",
  },
  {
    question: "Which solvent should I use to reconstitute a hydrophobic peptide?",
    answer:
      "Start with an organic co-solvent \u2014 DMSO or acetonitrile work well. Prepare a concentrated stock in DMSO (typically 10\u201350 mg/mL), then dilute slowly into your aqueous buffer with gentle mixing. Keep the final DMSO concentration in working solutions below 1% to avoid solvent-related assay interference; 0.1% is better where possible.",
  },
  {
    question: "How do I calculate the molar concentration of my reconstituted peptide?",
    answer:
      "Divide the peptide mass in milligrams by its molecular weight in g/mol to get millimoles, then divide by the reconstitution volume in millilitres to get millimolar (mM) concentration. Molecular weight is on the Premio Peptides Certificate of Analysis. If purity is below 99%, adjust the effective mass to get a corrected figure.",
  },
  {
    question: "How long is a reconstituted peptide solution stable at -20\u00B0C?",
    answer:
      "Stability depends on sequence, but 30 days is a reasonable working limit for reconstituted aqueous solutions. Peptides in acidic or basic buffers may degrade faster than those in neutral PBS. For sequences with known susceptibility to hydrolysis or oxidation, use within 7\u201314 days and verify integrity by HPLC if quantitative accuracy is critical.",
  },
  {
    question: "Are Premio Peptides products suitable for in vivo or clinical use?",
    answer:
      "No. All peptides are manufactured and sold strictly for in vitro laboratory research. They are not sterile pharmaceutical preparations, are not approved for clinical, veterinary, or human use, and must not be administered to any living organism outside a formally approved, institutionally governed research protocol.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function GuidelinesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Research Guidelines</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Research Peptide Handling &amp; Laboratory Guidelines
          </h1>
        </div>
      </section>

      {/* Laboratory Handling */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Laboratory Handling Best Practices</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Research peptides are sensitive. Structural integrity depends on consistent, careful handling from the moment a vial leaves storage. Work in a clean, draft-free environment — a laminar flow hood or biosafety cabinet is ideal — and wear appropriate PPE throughout.
            </p>
            <p>
              Repeated freeze-thaw cycles damage peptide bonds and promote aggregation; they also accelerate oxidation of residues such as methionine and tryptophan, so avoid them. Use low-binding polypropylene tubes to limit adsorption losses. Before opening a lyophilised vial, give it a brief centrifuge spin to consolidate the powder and stop it dispersing on unsealing.
            </p>
          </div>
        </div>
      </section>

      {/* Storage */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Storage Requirements</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Lyophilised peptides should be stored at -20&deg;C or below in a frost-free freezer. Sequences containing cysteine, methionine, or tryptophan are particularly prone to oxidative degradation — store these under inert gas (argon or nitrogen) or with desiccant. Keep all peptide stock away from light; UV exposure drives photo-oxidation. Low relative humidity matters too, so keep vials in a sealed desiccator when not in active use.
            </p>
            <p>
              Reconstituted solutions are considerably less stable than lyophilised stocks. Aliquot immediately, store at -80&deg;C where possible, and aim to use within 30 days. Always let frozen vials equilibrate to room temperature before opening — condensation contamination is a real and avoidable problem.
            </p>
          </div>
        </div>
      </section>

      {/* Reconstitution */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Reconstitution and Solubility</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Check the peptide datasheet before you reconstitute anything. Solubility varies significantly by sequence.
            </p>
            <p>
              Acidic peptides — those with a high proportion of Asp or Glu residues — typically dissolve readily in aqueous buffers or dilute acetic acid (0.1% v/v). Basic peptides, rich in Lys or Arg, often need dilute ammonium hydroxide (0.1% v/v). Hydrophobic sequences are trickier; dissolve these first in an organic co-solvent such as DMSO or acetonitrile, then dilute into aqueous buffer.
            </p>
            <p>
              Add solvent gently to the lyophilised powder. Aggressive vortexing promotes aggregation. If dissolution is incomplete, use a water bath sonicator in 30-second intervals rather than increasing mechanical agitation. Record the final concentration and solvent composition in your laboratory notebook straight away, not later.
            </p>
          </div>
        </div>
      </section>

      {/* Dosage Calculation */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Dosage Calculation for Research</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Concentration accuracy drives reproducibility. The calculation is straightforward: divide the total peptide mass (mg) by the molecular weight (g/mol, listed on the CoA) to get moles, then divide by your reconstitution volume in litres to get molarity.
            </p>
            <div className="rounded-xl border border-editorial-border bg-white p-5">
              <p className="text-sm font-semibold text-editorial-text mb-2">Worked Example</p>
              <p className="text-sm text-editorial-muted font-mono">
                5 mg &divide; 1,500 g/mol = 3.33 &micro;mol &rarr; reconstituted in 1 mL = 3.33 mM stock solution
              </p>
            </div>
            <p>
              Always check purity from the third-party Certificate of Analysis and factor it into your calculation where precision matters. Prepare serial dilutions from a master stock rather than repeatedly handling concentrated material. Every calculation, lot number, and dilution step needs to be in a traceable laboratory record — not just for compliance, but because you will need it later.
            </p>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Safety and Personal Protective Equipment</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              All peptides supplied by Premio Peptides are for in vitro research use only. They must not be administered to humans or animals outside of formally approved research protocols. Treat every research peptide as a potentially hazardous compound.
            </p>
            <p>
              Minimum PPE during weighing and reconstitution: nitrile gloves, lab coat, safety spectacles. Where aerosolisation is possible — weighing lyophilised powder being the obvious case — use a half-face respirator with a P3 filter, or work inside a fume hood.
            </p>
            <p>
              Dispose of peptide waste, used vials, and contaminated consumables according to your institution&rsquo;s chemical waste policy and UK COSHH regulations. Safety Data Sheets must be on file and accessible to everyone working in the lab.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Documentation and Record-Keeping</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Good documentation is not optional. It underpins reproducible, publishable research — and it protects you.
            </p>
            <p>
              For every peptide used, record: supplier name and product code, lot number, date of receipt, storage location, date of reconstitution, solvent system, final concentration, and the date of each aliquot use. Retain all Certificates of Analysis — Premio Peptides provides third-party HPLC and mass spectrometry CoAs with every order — and attach copies to the relevant experiment records.
            </p>
            <p>
              If you use an electronic laboratory notebook, tag entries with the peptide lot number for rapid cross-referencing. Records should be kept for a minimum of ten years, in line with good laboratory practice (GLP) principles and UK Research Integrity Office (UKRIO) guidance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
                <h3 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h3>
                <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted leading-relaxed mb-6">
            All Premio Peptides orders placed before 2pm, Monday to Friday, are dispatched the same day. Every order includes third-party HPLC and mass spectrometry Certificates of Analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Browse Peptide Catalogue
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">
              Contact Technical Team
            </a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
