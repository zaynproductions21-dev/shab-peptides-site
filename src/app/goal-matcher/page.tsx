import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GoalMatcherWidget } from "./GoalMatcherWidget";

export const metadata: Metadata = {
  title: "Research Goal Matcher — Premio Peptides",
  description:
    "Four pathway-based questions match you to the research compounds and protocols studied for your area of interest. Pathway language only — for laboratory and research use.",
  alternates: { canonical: "https://www.premiopeptides.co.uk/goal-matcher" },
  openGraph: {
    title: "Find the research compound for your pathway",
    description:
      "Four questions, literature-referenced match, batch-specific CoA on every recommendation.",
    url: "https://www.premiopeptides.co.uk/goal-matcher",
    type: "website",
  },
};

export default function GoalMatcherPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation variant="editorial" />

      <main className="pt-24">
        <section className="max-w-3xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="mb-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-editorial-accent bg-white border border-editorial-border rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-editorial-green inline-block" />
              For laboratory and research use only
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-editorial-text leading-[1.1] tracking-tight mt-4">
            Research Goal Matcher
          </h1>
          <p className="mt-4 text-base lg:text-lg text-editorial-muted leading-relaxed max-w-2xl">
            Every batch HPLC-verified at 99%+ purity. Four pathway-based
            questions match you to the research compounds and protocols studied
            for your area of interest — with citation counts from the
            peer-reviewed literature.
          </p>

          <GoalMatcherWidget />

          <div className="mt-10 rounded-2xl border border-editorial-border bg-white p-5 sm:p-6">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-editorial-muted mb-3">
              How this works
            </p>
            <ul className="space-y-3 text-sm text-editorial-text leading-relaxed">
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">1.</span>
                <span>You select the <strong>pathway</strong> your research focuses on — not an outcome, a mechanism.</span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">2.</span>
                <span>You tell us your preferred <strong>format</strong>, planned <strong>protocol duration</strong>, and <strong>experience level</strong>.</span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">3.</span>
                <span>We surface the compounds and stacks studied in the peer-reviewed literature for that pathway, with batch-specific CoAs on each recommendation.</span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">4.</span>
                <span>This is reference information, <strong>not a dosing recommendation or therapeutic claim</strong>. All compounds are supplied for laboratory and research use only.</span>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-xs text-editorial-muted leading-relaxed">
            For laboratory and research use only. Not for human or veterinary
            consumption. The compounds surfaced by this tool are referenced in
            published peer-reviewed research; nothing here constitutes medical
            advice or a therapeutic claim. Premio Peptides supplies
            research-grade materials to verified institutions and researchers.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
