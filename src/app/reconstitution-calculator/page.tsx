import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReconstitutionCalculator from "@/components/ReconstitutionCalculator";

export const metadata: Metadata = {
  title: "Reconstitution Calculator | Research Reference Tool",
  description:
    "Free reconstitution calculator for research peptides. Calculate bacteriostatic water volume, concentration per click, and total pen clicks for your research protocol.",
  alternates: { canonical: "/reconstitution-calculator" },
};

const faqs = [
  {
    question: "What is peptide reconstitution?",
    answer:
      "Reconstitution is the process of dissolving a lyophilised (freeze-dried) peptide powder into a suitable solvent — typically bacteriostatic water (BAC water) — to create a solution of known concentration for laboratory analysis and in-vitro research.",
  },
  {
    question: "How does this calculator work?",
    answer:
      "Enter the total peptide mass in your vial (mg), the volume of solvent you plan to add (mL), and the desired amount per administration for your research protocol (mcg). The calculator returns the resulting concentration and the number of pen clicks or units required.",
  },
  {
    question: "What solvent should I use?",
    answer:
      "Bacteriostatic water (0.9% benzyl alcohol) is the most common solvent for reconstituting research peptides. It inhibits microbial growth and extends the usable life of the solution when stored at 2-8 degrees C. Some protocols may call for sterile water or normal saline — always follow your research protocol.",
  },
  {
    question: "How should I store reconstituted peptides?",
    answer:
      "Reconstituted peptides should be stored at 2-8 degrees C (refrigerated) and used within 28 days. Avoid repeated freeze-thaw cycles. Lyophilised (unreconstituted) peptides can be stored at -20 degrees C for longer periods.",
  },
];

export default function ReconstitutionCalculatorPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <div className="bg-editorial-accent text-white text-center py-2.5 text-sm font-medium tracking-wide pt-[4.5rem]">
        <strong>Research Reference Tool</strong> &nbsp;&middot;&nbsp; For laboratory research purposes only
      </div>

      {/* Hero */}
      <section className="bg-editorial-surface py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-md bg-editorial-accent/10 border border-editorial-accent/20 px-3 py-1 text-xs font-semibold text-editorial-accent uppercase tracking-wider mb-5">
            Research Tool
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-editorial-text leading-[1.1]">
            Reconstitution <span className="text-editorial-accent">Calculator</span>
          </h1>
          <p className="mt-5 text-lg text-editorial-muted leading-relaxed max-w-xl mx-auto">
            Calculate solvent volume, concentration, and pen clicks for your research peptide protocols.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <ReconstitutionCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-editorial-text">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-editorial-border bg-white p-6">
                <h3 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h3>
                <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-editorial-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-editorial-surface border border-editorial-border p-6 text-center">
            <p className="text-xs text-editorial-muted leading-relaxed">
              <strong>For research purposes only.</strong> This calculator is provided as a reference tool for laboratory researchers working with lyophilised peptide compounds.
              It is not intended as medical, dosing, or therapeutic advice. All Premio Peptides products are supplied strictly for in-vitro research.
              Not for human or animal consumption.
            </p>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
