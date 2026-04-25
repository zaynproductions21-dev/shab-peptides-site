import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Research Peptides Certificate of Analysis | Bio Peptides UK",
  description:
    "Every Bio Peptides compound ships with third-party HPLC and mass spectrometry data. UK-stocked, same-day dispatch by 2pm. Research use only.",
  alternates: { canonical: "/quality" },
  openGraph: {
    title: "Research Peptides Certificate of Analysis | Bio Peptides UK",
    description: "Every compound ships with third-party HPLC and mass spectrometry data.",
    url: "/quality",
    type: "website",
  },
};

const faqs = [
  {
    question: "What does a certificate of analysis from Bio Peptides include?",
    answer:
      "Each CoA includes the compound name and CAS number, the specific batch reference, HPLC purity percentage with chromatogram, mass spectrometry confirmation data, the name and accreditation details of the testing laboratory, and the date of analysis. The document is batch-specific, not a generic product-level certificate — the data on your CoA corresponds directly to the physical stock you receive.",
  },
  {
    question: "What is the minimum purity level for peptides you supply?",
    answer:
      "98%, confirmed by third-party HPLC analysis. Compounds that do not meet this standard following independent testing are not listed in our catalogue or made available for order. Where purity exceeds 98%, the exact figure reported by the laboratory is stated on the CoA — not a generalised minimum claim.",
  },
  {
    question: "Are your certificates of analysis produced by independent laboratories?",
    answer:
      "Yes. All analytical testing is commissioned from third-party laboratories that operate independently of Bio Peptides and have no commercial interest in the result. Our testing partners run ISO-accredited facilities and issue documentation under their own laboratory reference. We do not issue self-certified CoAs or rely solely on documentation provided by peptide manufacturers.",
  },
  {
    question: "Can I request a certificate of analysis before placing an order?",
    answer:
      "Sample CoA documentation illustrating our standard format is available to download directly from this page. If you need the specific batch CoA for a compound currently in stock before ordering — for example to satisfy an institutional review process — contact our support team with the compound name and we will provide the relevant document. We aim to respond to CoA requests within one business day.",
  },
  {
    question: "How do I match my order to its certificate of analysis?",
    answer:
      "Every order dispatched by Bio Peptides includes a batch reference number on the accompanying documentation. That batch reference corresponds directly to the certificate of analysis for that specific lot. If you need to retrieve your CoA after dispatch, contact our support team with your order number and batch reference. We maintain archived analytical records for all batches supplied and can reissue documentation on request.",
  },
  {
    question: "Are Bio Peptides compounds suitable for use in human subjects?",
    answer:
      "No. All compounds are intended strictly for laboratory and in vitro research purposes only. They are not approved, licensed, or supplied for administration to humans or animals, and must not be used outside a controlled research environment. Researchers are responsible for ensuring that use of any compound complies with applicable institutional, ethical, and regulatory requirements in their jurisdiction.",
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

export default function QualityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Quality &amp; Testing</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Independently Verified Purity — Every Batch, Every Order
          </h1>
        </div>
      </section>

      {/* Our Testing Standard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Our Testing Standard</h2>
          <div className="prose prose-gray max-w-none text-editorial-muted leading-relaxed space-y-4">
            <p>
              Every compound we stock is independently analysed before it reaches a researcher&rsquo;s bench. We do not accept manufacturer-provided data as sufficient. Each batch is tested by a third-party UK-based analytical laboratory using high-performance liquid chromatography (HPLC) and mass spectrometry (MS), producing documentation traceable to a specific production batch.
            </p>
            <p>
              Our minimum accepted purity threshold is 98%. Any compound that falls below this standard is not listed for supply. No exceptions, across the entire catalogue.
            </p>
          </div>
        </div>
      </section>

      {/* HPLC & MS */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">HPLC and Mass Spectrometry — What We Test and Why</h2>
              <div className="text-editorial-muted leading-relaxed space-y-4">
                <p>
                  HPLC analysis measures peptide purity by separating the target compound from impurities, degradation products, and residual synthesis by-products, then quantifying their relative concentrations. Mass spectrometry confirms molecular identity by verifying exact mass against the expected molecular weight.
                </p>
                <p>
                  Together, the two techniques produce both a purity percentage and an identity confirmation — a dual standard that rules out contamination and misidentification simultaneously.
                </p>
                <p>
                  This matters because a compound that is correctly identified but impure, or pure but misidentified, is equally unsuitable for accurate experimental work. For research applications, that level of analytical rigour is not optional.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-editorial-border">
              <Image
                src="https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&q=80"
                alt="HPLC and mass spectrometry equipment in Bio Peptides quality control laboratory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Verification */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Third-Party Verification</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Independent verification is the foundation of our quality process. Analysis commissioned from laboratories with no commercial stake in the outcome removes any bias that in-house testing introduces. Our third-party partners operate ISO-accredited facilities and issue certificates of analysis that include the laboratory name, date of analysis, analytical method reference, and the specific batch identifier.
            </p>
            <p>
              These are not generic product-level certificates. They are batch-specific records that correspond directly to the stock you receive. Researchers requiring traceability for institutional or publication purposes will find this documentation meets standard scientific reporting requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Batch Tracking */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Batch Tracking and Chain of Custody</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Every compound dispatched by Bio Peptides carries a batch reference number linked directly to its certificate of analysis. That number appears on your order documentation. Any researcher can request the corresponding CoA at any point after purchase — traceability does not end at the point of dispatch.
            </p>
            <p>
              We maintain archived analytical records for all batches we have supplied. Research teams running longitudinal studies or requiring compound consistency across multiple orders can request stock from a specific previously verified batch, subject to availability.
            </p>
          </div>
        </div>
      </section>

      {/* Sample CoA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Sample Certificate of Analysis</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              A representative certificate of analysis is available to download below. It illustrates the format and content of the documentation that accompanies every Bio Peptides order: compound name and CAS number, batch reference, HPLC chromatogram, purity percentage, MS confirmation data, laboratory details, and date of analysis.
            </p>
            <p>
              Every order ships with a batch-specific Certificate of Analysis. If you need to confirm the documentation satisfies your institution, ethics committee, or research protocol before purchase, our support team can email a sample CoA on request.
            </p>
          </div>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center rounded-lg bg-editorial-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Request Sample CoA
          </a>
        </div>
      </section>

      {/* Purity Guarantee */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Purity Guarantee and Research-Use Commitment</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              All compounds supplied by Bio Peptides carry a minimum documented purity of 98%, confirmed by third-party HPLC analysis. Where analytical data shows purity above this threshold, the exact figure is reported on the certificate — not a rounded or minimum-quoted value.
            </p>
            <p>
              All compounds are supplied strictly for in vitro and laboratory research purposes only. They are not intended for human or veterinary administration, clinical use, or any application outside a controlled research setting. Bio Peptides does not supply to members of the public for personal use. Orders are accepted from research institutions, universities, biotechnology companies, and qualified research professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-editorial-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6">
            {[
              { value: "98%+", label: "Minimum Purity" },
              { value: "100%", label: "Batch Tested" },
              { value: "ISO", label: "Accredited Labs" },
              { value: "24h", label: "CoA Turnaround" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-editorial-accent">{stat.value}</p>
                <p className="text-xs text-editorial-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-8 text-center">Frequently Asked Questions</h2>
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

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted leading-relaxed mb-6">
            Browse our full peptide catalogue — every compound ships with a third-party certificate of analysis, same-day dispatch on orders placed before 2pm. For research use only.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Browse Peptide Catalogue
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors">
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
