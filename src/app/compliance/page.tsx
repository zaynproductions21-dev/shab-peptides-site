import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "UK Peptide Regulations | Legal Compliance | Bell Peptides",
  description:
    "Understand the legal framework around research peptides in the UK. Bell Peptides supplies third-party tested compounds for research use only.",
};

const faqs = [
  {
    question: "Are research peptides legal in the UK?",
    answer:
      "Most synthetic peptides are not controlled substances under UK law and are not classified as licensed medicines, provided they are not marketed or used for medicinal purposes. Legal status depends heavily on context — specifically, intended use and how a compound is represented at point of sale. Buyers are responsible for satisfying themselves on the legality of any specific compound in their jurisdiction.",
  },
  {
    question: "Does Bell Peptides have MHRA approval?",
    answer:
      "No. Bell Peptides does not hold MHRA approval, and our products are not licensed medicinal products. MHRA approval applies to medicines intended for human or veterinary use. Our compounds are supplied exclusively for research purposes and are not presented as medicines. We make no claims to the contrary.",
  },
  {
    question: "Who is permitted to buy research peptides from Bell Peptides?",
    answer:
      "Our products are intended for researchers, scientists, and academics conducting legitimate laboratory or scientific research. Buyers should be affiliated with or operating within a suitable research context — a university, private laboratory, or commercial R&D organisation. We cannot supply individuals who are unable to confirm a lawful research purpose.",
  },
  {
    question: "What is a certificate of analysis, and why does it matter?",
    answer:
      "A certificate of analysis (CoA) is a document produced by an independent third-party laboratory confirming the identity and purity of a compound. Every Bell Peptides product ships with one. It allows researchers to verify exactly what they have received — a standard requirement in legitimate research settings and a basic condition for accurate record-keeping and reproducibility.",
  },
  {
    question: "Can I use Bell Peptides' compounds for clinical trials or on humans?",
    answer:
      "No. None of our compounds are approved for clinical trials, human administration, or veterinary application. Any such use falls entirely outside the intended purpose of our products and is the sole responsibility of the individual or organisation involved. Compounds destined for clinical use require separate regulatory authorisation that our products do not carry.",
  },
  {
    question: "What should I do if I am unsure whether a compound is legal for my research?",
    answer:
      "Consult your institution's legal, ethics, or compliance team before placing an order. Independent legal advice may also be appropriate. Bell Peptides cannot advise on the legal status of compounds for individual use cases, and nothing on this site constitutes legal guidance.",
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

export default function CompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Legal Compliance</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            UK Peptide Regulations &amp; Legal Compliance
          </h1>
        </div>
      </section>

      {/* The UK Peptide Regulation Landscape */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">The UK Peptide Regulation Landscape</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Research peptides sit in a legally nuanced position. Most synthetic peptides are not controlled substances under the Misuse of Drugs Act 1971, and they are not licensed medicinal products under the Human Medicines Regulations 2012. That does not place them outside regulation entirely. The MHRA oversees whether a substance is being marketed for medicinal purposes, and context determines everything.
            </p>
            <p>
              Supplying peptides with therapeutic claims — or for human consumption — invites regulatory scrutiny. Legal status depends on intended use, how a compound is marketed, and who is buying it.
            </p>
          </div>
        </div>
      </section>

      {/* MHRA */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">MHRA, Medicinal Products, and Research Compounds</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Under UK law, a substance becomes a medicinal product when it is presented as treating, preventing, or diagnosing a condition in humans or animals — or when it functions as one. Bell Peptides does not present any compound in this way. Our products are supplied as research chemicals for laboratory and academic use only. No therapeutic claims are made, and none of our compounds are MHRA-licensed medicines.
            </p>
            <p>
              Researchers should know that the MHRA can investigate suppliers where compounds are marketed or used in ways that imply medicinal intent. Bell Peptides operates with that line clearly in view.
            </p>
          </div>
        </div>
      </section>

      {/* Research-Use-Only */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Research-Use-Only Requirements</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Every compound Bell Peptides sells is designated for in vitro research, laboratory analysis, and scientific study only. Not for human or veterinary consumption. Not for clinical use or self-administration. This classification carries legal and ethical weight — it is not a disclaimer inserted for form&rsquo;s sake.
            </p>
            <p>
              Research-use-only compounds can be purchased legally in the UK for legitimate scientific purposes, provided they are handled in appropriate settings by qualified individuals and in line with institutional guidelines. Use outside that scope falls beyond the intended purpose of our products and beyond our responsibility as a supplier.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Responsibilities */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Buyer Responsibilities</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Placing an order with Bell Peptides constitutes confirmation that the compounds will be used solely for lawful research purposes. Buyers are responsible for understanding the legal framework that applies to their institution, jurisdiction, and intended use.
            </p>
            <p>
              Researchers based at universities, private laboratories, or commercial R&amp;D operations should consult their institution&rsquo;s compliance or ethics team before ordering. Importation rules may apply if you are ordering from outside Great Britain. Bell Peptides does not provide legal advice. Nothing on this website should be read as guidance on the legality of any specific research application.
            </p>
          </div>
        </div>
      </section>

      {/* Our Compliance Approach */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Our Compliance Approach</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Bell Peptides operates on a clear standard: stock held in the UK, dispatched from UK-based facilities, and a third-party certificate of analysis (CoA) supplied with every product. CoAs are produced by independent laboratories and confirm compound identity and purity.
            </p>
            <p>
              We do not make MHRA approval claims. We do not market products for human use. We do not supply buyers who cannot confirm a legitimate research purpose. Product listings and marketing language are reviewed on an ongoing basis to ensure they remain within appropriate limits. Transparency about what we are — and what we are not — is the most defensible position a supplier can hold.
            </p>
          </div>
        </div>
      </section>

      {/* Ordering Requirements */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Ordering Requirements</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              To place an order, buyers must confirm at checkout that they are purchasing for research purposes only, that they are 18 or older, and that they understand the research-use-only designation of all compounds. We reserve the right to decline orders where there is reasonable doubt about stated research intent.
            </p>
            <p>
              Orders placed by 2pm on working days are dispatched the same day from UK stock. Every shipment includes the relevant certificate of analysis. We do not dispatch to jurisdictions where importation or possession of the relevant compound is prohibited.
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
            All orders placed by 2pm are dispatched same day from UK-based stock. Every compound ships with a third-party certificate of analysis. Order for research use only.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Browse Peptide Catalogue
            </a>
            <a href="/quality" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">
              View Quality &amp; Testing
            </a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
