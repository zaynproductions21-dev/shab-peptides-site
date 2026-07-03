import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BatchVerifierForm } from "./BatchVerifierForm";

export const metadata: Metadata = {
  title: "Batch Verifier — Premio Peptides",
  description:
    "Enter the batch code from your Premio Peptides pen sticker to look up its Certificate of Analysis once published. Certificates of Analysis are available on request.",
  alternates: { canonical: "https://www.premiopeptides.co.uk/batch-verifier" },
  openGraph: {
    title: "Verify your Premio Peptides batch",
    description:
      "Look up the Certificate of Analysis for your batch once published. CoAs available on request.",
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
            Every pen ships with a batch code printed on the sticker. Once a
            batch&rsquo;s Certificate of Analysis is published here, you&rsquo;ll
            be able to paste the code below to view its purity, test date and
            dispatch record for that exact pen.
          </p>

          {/* Empty-state notice: no verified batches are published yet.
              TODO(client): remove this notice once real CoA batch data
              (lab name, ISO number, purity, signed PDF) is supplied. */}
          <div className="mt-8 rounded-2xl border border-editorial-border bg-white p-5 sm:p-6">
            <p className="font-semibold text-editorial-text">
              No verified batches published yet
            </p>
            <p className="mt-1 text-sm text-editorial-muted leading-relaxed">
              We haven&rsquo;t published any batch Certificates of Analysis to
              this verifier yet. To request the CoA for your order, contact us
              and we&rsquo;ll send it directly.
            </p>
          </div>

          <BatchVerifierForm />

          <div className="mt-10 rounded-2xl border border-editorial-border bg-white p-5 sm:p-6">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-editorial-muted mb-3">
              About this verifier
            </p>
            <ul className="space-y-3 text-sm text-editorial-text leading-relaxed">
              <li className="grid grid-cols-[auto_1fr] gap-3">
                <span className="text-editorial-accent font-bold">·</span>
                <span>
                  {/* TODO(client): restore specific lab/method claims (e.g.
                      named third-party lab, HPLC + mass spec) only once the
                      corresponding signed CoAs are published. */}
                  <strong>Third-party tested.</strong> Where available,
                  Certificates of Analysis are provided on request. Contact us
                  for the CoA covering your order.
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
