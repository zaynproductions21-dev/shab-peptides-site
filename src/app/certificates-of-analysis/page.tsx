import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Certificates of Analysis | Third-Party Testing | Premio Peptides",
  description:
    "Every Premio Peptides order includes a batch-specific Certificate of Analysis with HPLC chromatograms, mass spectrometry data, and ISO-accredited laboratory details. View our testing methodology.",
  alternates: { canonical: "/certificates-of-analysis" },
  openGraph: {
    title: "Certificates of Analysis | Third-Party Testing | Premio Peptides",
    description: "Batch-specific CoAs with HPLC, MS, and ISO-accredited lab details included with every order.",
    url: "/certificates-of-analysis",
    type: "website",
  },
};

const testingMethods = [
  {
    name: "HPLC Analysis",
    fullName: "High-Performance Liquid Chromatography",
    description: "Separates and quantifies each component in the sample to determine purity percentage. Our minimum accepted threshold is 99%, confirmed on every batch. The chromatogram is included in every CoA.",
    icon: "📊",
    detail: "Confirms purity to ≥99%",
  },
  {
    name: "Mass Spectrometry",
    fullName: "Electrospray Ionisation Mass Spectrometry (ESI-MS)",
    description: "Verifies the molecular weight of the compound matches the expected value for the target peptide. This confirms identity — that the compound is what it claims to be, not a substitute or degradation product.",
    icon: "🔬",
    detail: "Confirms molecular identity and weight",
  },
  {
    name: "Amino Acid Analysis",
    fullName: "Quantitative Amino Acid Composition",
    description: "Breaks the peptide into individual amino acids and measures their ratios. This confirms the correct sequence and stoichiometry — that the peptide was synthesised accurately.",
    icon: "🧬",
    detail: "Confirms correct sequence and composition",
  },
  {
    name: "Endotoxin Testing",
    fullName: "Limulus Amebocyte Lysate (LAL) Assay",
    description: "Detects bacterial endotoxins (lipopolysaccharides) that can contaminate peptide preparations. All Premio Peptides compounds test below detectable limits.",
    icon: "✅",
    detail: "Below detectable limits on all batches",
  },
];

const coaContents = [
  "Compound name and CAS registry number",
  "Batch reference number (unique per production run)",
  "HPLC purity percentage with full chromatogram",
  "Mass spectrometry molecular weight confirmation",
  "Amino acid analysis composition data",
  "Endotoxin testing result (LAL assay)",
  "Testing laboratory name and ISO accreditation details",
  "Date of analysis and analyst reference",
  "Storage and handling recommendations",
];

export default async function CertificatesPage() {
  const compounds = await getCompounds();
  const inStockCompounds = compounds.filter((c) => c.availability === "In Stock");
  const enquiryCompounds = compounds.filter((c) => c.availability !== "In Stock");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://premiopeptides.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Certificates of Analysis", item: "https://premiopeptides.co.uk/certificates-of-analysis" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Quality Assurance</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Certificates of Analysis
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            Every order ships with a batch-specific Certificate of Analysis. We do not issue self-certified CoAs
            or rely on manufacturer-supplied data — every certificate is produced by an independent, ISO-accredited
            third-party laboratory.
          </p>
        </div>
      </section>

      {/* What's in a CoA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">What Every Certificate Includes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coaContents.map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-lg border border-editorial-border bg-editorial-surface p-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-editorial-accent">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-editorial-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Methodology */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-2">Our Four-Stage Testing Protocol</h2>
          <p className="text-editorial-muted mb-8">
            Every batch undergoes four independent analytical tests before release. No compound leaves our facility
            without passing all four stages.
          </p>
          <div className="space-y-6">
            {testingMethods.map((method, i) => (
              <div key={method.name} className="rounded-xl border border-editorial-border bg-white p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-editorial-accent/10 text-xl">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">Stage {i + 1}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-editorial-text">{method.name}</h3>
                    <p className="text-xs text-editorial-muted mt-0.5">{method.fullName}</p>
                    <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{method.description}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-editorial-green/10 border border-editorial-green/20 px-3 py-1 text-xs font-semibold text-editorial-green">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                      {method.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Third-Party */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-4">Why Independent Third-Party Testing?</h2>
          <div className="prose prose-editorial max-w-none">
            <p className="text-editorial-muted leading-relaxed">
              Many peptide suppliers issue self-certified certificates of analysis — documents generated in-house
              using the manufacturer&rsquo;s own data. These carry an inherent conflict of interest: the party selling
              the compound is also the party certifying its quality.
            </p>
            <p className="text-editorial-muted leading-relaxed mt-4">
              Premio Peptides takes a different approach. Every batch we stock is submitted to an independent,
              ISO-accredited analytical laboratory with no commercial interest in the result. The laboratory performs
              the full testing protocol described above and issues the certificate directly. We cannot influence,
              edit, or selectively publish results — if a batch fails any stage, it is rejected outright and never
              enters our supply chain.
            </p>
            <p className="text-editorial-muted leading-relaxed mt-4">
              This approach costs more and takes longer than self-certification. We believe it is the only approach
              consistent with supplying research-grade compounds to institutions that depend on data integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Compound-specific CoA availability */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-2">CoA Availability by Compound</h2>
          <p className="text-editorial-muted mb-8">
            Batch-specific certificates are generated for each production run. Request a CoA for any compound
            currently in stock — we&rsquo;ll provide it within one business day.
          </p>

          {/* In-stock compounds */}
          {inStockCompounds.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-editorial-green uppercase tracking-wider mb-4">In Stock — CoA Available Now</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {inStockCompounds.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compounds/${c.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-editorial-border bg-white p-4 hover:border-editorial-accent/30 transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-editorial-green/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-editorial-green"><path d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-editorial-text">{c.name}</p>
                      <p className="text-[10px] text-editorial-muted">{c.purity} Purity · {c.sizes[0]?.size}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Enquiry compounds */}
          {enquiryCompounds.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-editorial-warm uppercase tracking-wider mb-4">Available on Enquiry — CoA Provided on Order</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {enquiryCompounds.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compounds/${c.slug}`}
                    className="rounded-lg border border-editorial-border bg-white px-3 py-2.5 text-xs font-medium text-editorial-muted hover:text-editorial-accent hover:border-editorial-accent/30 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Request a CoA CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl font-bold text-editorial-text mb-2">Need a Certificate Before Ordering?</h2>
          <p className="text-editorial-muted mb-6">
            Request a sample CoA for any compound currently in stock. We&rsquo;ll email it to you within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Request a CoA
            </Link>
            <Link href="/quality" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors">
              Quality & Testing
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
