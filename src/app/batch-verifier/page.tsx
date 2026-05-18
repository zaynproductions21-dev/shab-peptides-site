import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BatchVerifierForm } from "./BatchVerifierForm";

export const metadata: Metadata = {
  title: "Batch Verifier — Premio Peptides",
  description:
    "Enter the batch code from your Premio Peptides pen sticker to view the third-party HPLC Certificate of Analysis, purity score and dispatch date for that exact batch.",
  alternates: { canonical: "https://www.premiopeptides.co.uk/batch-verifier" },
  openGraph: {
    title: "Verify your Premio Peptides batch",
    description:
      "Paste your batch code, see the third-party HPLC CoA and purity for that exact pen.",
    url: "https://www.premiopeptides.co.uk/batch-verifier",
    type: "website",
  },
};

export default function BatchVerifierPage() {
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
            Verify your batch
          </h1>
          <p className="mt-4 text-base lg:text-lg text-editorial-muted leading-relaxed max-w-2xl">
            Every pen ships with a batch code printed on the sticker. Paste it
            below to view the third-party HPLC Certificate of Analysis for that
            exact pen — including purity, test date, lab and dispatch record.
          </p>

          <BatchVerifierForm />

          <div className="mt-10 rounded-2xl border border-editorial-border bg-white p-5 sm:p-6">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-editorial-muted mb-3">
              About this verifier
            </p>
            <ul className="space-y-3 text-sm text-editorial-text leading-relaxed">
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">·</span>
                <span>
                  <strong>Independent testing.</strong> All Certificates of
                  Analysis are issued by third-party laboratories — never
                  self-certified. Reports include HPLC purity and mass spec
                  identity confirmation.
                </span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">·</span>
                <span>
                  <strong>Batch-specific.</strong> Every batch is tested and has
                  its own CoA — we do not re-use a single certificate across
                  shipments.
                </span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">·</span>
                <span>
                  <strong>Don&rsquo;t have your code?</strong> The batch code
                  is printed on the sticker on the side of the pen and also
                  appears in the order email. If you can&rsquo;t find it,
                  message us on WhatsApp and we&rsquo;ll send the CoA for your
                  order directly.
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-xs text-editorial-muted leading-relaxed">
            For laboratory and research use only. Not for human or veterinary
            consumption. Premio Peptides supplies research-grade materials to
            verified institutions and researchers; all customers must comply
            with applicable local regulations.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
