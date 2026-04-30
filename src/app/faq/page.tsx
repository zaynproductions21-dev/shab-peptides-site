import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Premio Peptides UK",
  description:
    "Answers to common questions about ordering research peptides from Premio Peptides. Purity, dispatch, certificates of analysis, returns, institutional accounts, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Premio Peptides UK",
    description: "Common questions about purity, dispatch, CoAs, returns, institutional accounts and more.",
    url: "/faq",
    type: "website",
  },
};

const faqCategories = [
  {
    category: "Ordering & Dispatch",
    faqs: [
      { question: "What is the cut-off time for same-day dispatch?", answer: "2pm on working days (Monday to Friday, excluding UK public holidays). Orders placed before this time are dispatched the same day. Orders placed after 2pm, or on weekends and bank holidays, are dispatched on the next available working day." },
      { question: "Do you offer free delivery?", answer: "Yes. Standard UK delivery is free on orders over £75. Orders under £75 incur a flat delivery charge of £4.99. Express AM-guaranteed delivery is available at £9.99 regardless of order value." },
      { question: "Do you ship internationally?", answer: "Not at present. We ship exclusively within the United Kingdom (England, Scotland, Wales, Northern Ireland). For institutional orders requiring bespoke logistics, contact us before placing your order." },
      { question: "How is my order packaged?", answer: "All peptides are dispatched in temperature-controlled packaging to maintain compound integrity. Lyophilised products ship at ambient temperature with insulated packaging. Cold-chain products include gel ice packs at no additional cost." },
    ],
  },
  {
    category: "Quality & Certificates",
    faqs: [
      { question: "What purity do your peptides meet?", answer: "Our minimum accepted purity threshold is 98%, confirmed by third-party HPLC analysis. Where purity exceeds this, the exact figure is reported on the certificate of analysis — not a rounded minimum." },
      { question: "What does a certificate of analysis include?", answer: "Compound name and CAS number, batch reference, HPLC purity percentage with chromatogram, mass spectrometry confirmation data, the testing laboratory's name and accreditation details, and the date of analysis. Every CoA is batch-specific." },
      { question: "Who performs the testing?", answer: "All analytical testing is commissioned from independent, ISO-accredited third-party laboratories with no commercial interest in the result. We do not issue self-certified CoAs or rely on manufacturer-supplied data." },
      { question: "Can I request a CoA before placing an order?", answer: "Yes. A sample CoA is available on our Quality & Testing page. For the specific batch CoA of a compound currently in stock, contact our support team and we'll provide it within one business day." },
    ],
  },
  {
    category: "Research Use & Compliance",
    faqs: [
      { question: "Are your peptides legal in the UK?", answer: "Most synthetic peptides are not controlled substances under UK law and are not classified as licensed medicines, provided they are not marketed or used for medicinal purposes. All Premio Peptides products are supplied strictly for research use. Buyers are responsible for satisfying themselves on legality in their jurisdiction." },
      { question: "Can I use these compounds on humans or animals?", answer: "No. All products are for in vitro laboratory research only. They are not approved for clinical, veterinary, or human use, and must not be administered to any living organism outside a formally approved research protocol." },
      { question: "Does Premio Peptides have MHRA approval?", answer: "No. Our products are not licensed medicinal products and we do not hold MHRA approval. MHRA approval applies to medicines intended for human or veterinary use. Our compounds are research chemicals supplied for laboratory use only." },
      { question: "Who can buy from Premio Peptides?", answer: "Researchers, scientists, and academics conducting legitimate laboratory or scientific research. Buyers should be affiliated with a suitable research context — a university, private laboratory, or commercial R&D organisation. We cannot supply individuals unable to confirm a lawful research purpose." },
    ],
  },
  {
    category: "Institutional Accounts",
    faqs: [
      { question: "Do you accept purchase orders?", answer: "Yes. Verified institutional clients can order by PO without upfront payment. Standard terms are 30 days from invoice date, with 60-day terms available for NHS-affiliated and established accounts." },
      { question: "How do I apply for an institutional account?", answer: "Submit an enquiry via our Institutional Accounts page or email us directly. We issue a credit application within one working day. Approval typically takes 48 hours, after which your account is activated with a named account manager." },
      { question: "Is there a minimum order for bulk pricing?", answer: "Tiered pricing starts at 5g per compound. There is no minimum order value for account holders. For large or recurring orders, bespoke pricing is negotiated with your account manager." },
      { question: "Can you register as a preferred supplier?", answer: "Yes. We provide a full registration pack including Companies House details, VAT certificate, insurance certificates, QA policies, and third-party lab accreditation. We can also complete supplier portal registrations on your behalf." },
    ],
  },
  {
    category: "Returns & Support",
    faqs: [
      { question: "What is your returns policy?", answer: "Due to the nature of research compounds and chain-of-custody requirements, we cannot accept returns of opened products. We will replace or refund products that arrive damaged, are incorrectly dispatched, or do not match their CoA. Contact us within 7 days of delivery." },
      { question: "How quickly do you respond to enquiries?", answer: "Within 2 to 4 business hours during working hours (Monday to Friday, 9am to 5pm). Enquiries sent outside these hours are handled the next working day." },
      { question: "How do I contact you about an existing order?", answer: "Email info@premiopeptides.com with your order reference number. For same-day dispatch issues, contact us before 1:30pm to allow time before the 2pm cut-off." },
      { question: "Can you help with technical questions?", answer: "Yes. Our team can advise on purity grades, sequence confirmation, reconstitution, storage, and CoA documentation. Include the product name or code and what you need when you get in touch." },
    ],
  },
];

const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Support</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-editorial-muted">
            {allFaqs.length} questions across {faqCategories.length} categories. Can&rsquo;t find what you need? <a href="/contact" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Contact us</a>.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-5 pb-3 border-b border-editorial-border">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
                    <h3 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h3>
                    <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted mb-4">Still have questions? Our team responds within 2-4 business hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">Contact Us</a>
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">Browse Peptides</a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
