import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { QuizFunnel } from "./QuizFunnel";

export const metadata: Metadata = {
  title: "Find your research protocol — Premio Peptides",
  description:
    "Five questions, sixty seconds. Match to the compounds and stacks studied in the peer-reviewed literature for your research pathway. Batch-specific CoA on every recommendation. For laboratory and research use only.",
  alternates: { canonical: "https://www.premiopeptides.co.uk/quiz" },
  openGraph: {
    title: "Find your research protocol — Premio Peptides",
    description:
      "Five questions, sixty seconds. Pathway language only, MHRA-compliant. Batch-specific CoA on every recommendation.",
    url: "https://www.premiopeptides.co.uk/quiz",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation variant="editorial" />

      <main className="pt-24">
        <section className="max-w-2xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="mb-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-editorial-accent bg-white border border-editorial-border rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-editorial-green inline-block" />
              For laboratory and research use only
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-editorial-text leading-[1.1] tracking-tight mt-4">
            Find your research protocol
          </h1>
          <p className="mt-4 text-base lg:text-lg text-editorial-muted leading-relaxed">
            Five questions, sixty seconds. We&rsquo;ll match you to the
            compounds and stacks studied in the peer-reviewed literature for
            your research pathway — with batch-specific CoAs on every
            recommendation.
          </p>

          <QuizFunnel />

          <p className="mt-10 text-xs text-editorial-muted leading-relaxed">
            For laboratory and research use only. Not for human or veterinary
            consumption. Compounds surfaced by this tool are referenced in
            published peer-reviewed research; nothing here constitutes
            medical advice or a therapeutic claim. Premio Peptides supplies
            research-grade materials to verified institutions and
            researchers.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
