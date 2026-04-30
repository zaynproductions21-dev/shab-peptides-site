import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getFAQs, type FAQItem } from "@/data/faq";

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

/* ── Hardcoded fallback FAQs (used when PublishOS CMS has no data) ── */
const fallbackFaqs: FAQItem[] = [
  { question: "What is the cut-off time for same-day dispatch?", answer: "2pm on working days (Monday to Friday, excluding UK public holidays). Orders placed before this time are dispatched the same day. Orders placed after 2pm, or on weekends and bank holidays, are dispatched on the next available working day.", keyword: "same-day dispatch", internalLink: "/delivery" },
  { question: "Do you offer free delivery?", answer: "Yes. Standard UK delivery is free on orders over £75. Orders under £75 incur a flat delivery charge of £4.99. Express AM-guaranteed delivery is available at £9.99 regardless of order value.", keyword: "free delivery", internalLink: "/delivery" },
  { question: "Do you ship internationally?", answer: "Not at present. We ship exclusively within the United Kingdom (England, Scotland, Wales, Northern Ireland). For institutional orders requiring bespoke logistics, contact us before placing your order.", keyword: "international shipping", internalLink: "/delivery" },
  { question: "How is my order packaged?", answer: "All peptides are dispatched in temperature-controlled packaging to maintain compound integrity. Lyophilised products ship at ambient temperature with insulated packaging. Cold-chain products include gel ice packs at no additional cost.", keyword: "packaging", internalLink: "/delivery" },
  { question: "What purity do your peptides meet?", answer: "Our minimum accepted purity threshold is 98%, confirmed by third-party HPLC analysis. Where purity exceeds this, the exact figure is reported on the certificate of analysis — not a rounded minimum.", keyword: "peptide purity", internalLink: "/quality" },
  { question: "What does a certificate of analysis include?", answer: "Compound name and CAS number, batch reference, HPLC purity percentage with chromatogram, mass spectrometry confirmation data, the testing laboratory's name and accreditation details, and the date of analysis. Every CoA is batch-specific.", keyword: "certificate of analysis", internalLink: "/quality" },
  { question: "Who performs the testing?", answer: "All analytical testing is commissioned from independent, ISO-accredited third-party laboratories with no commercial interest in the result. We do not issue self-certified CoAs or rely on manufacturer-supplied data.", keyword: "third-party testing", internalLink: "/quality" },
  { question: "Can I request a CoA before placing an order?", answer: "Yes. A sample CoA is available on our Quality & Testing page. For the specific batch CoA of a compound currently in stock, contact our support team and we'll provide it within one business day.", keyword: "sample CoA", internalLink: "/quality" },
  { question: "Are your peptides legal in the UK?", answer: "Most synthetic peptides are not controlled substances under UK law and are not classified as licensed medicines, provided they are not marketed or used for medicinal purposes. All Premio Peptides products are supplied strictly for research use. Buyers are responsible for satisfying themselves on legality in their jurisdiction.", keyword: "peptides legal UK", internalLink: "/compliance" },
  { question: "Can I use these compounds on humans or animals?", answer: "No. All products are for in vitro laboratory research only. They are not approved for clinical, veterinary, or human use, and must not be administered to any living organism outside a formally approved research protocol.", keyword: "research use only", internalLink: "/compliance" },
  { question: "Who can buy from Premio Peptides?", answer: "Researchers, scientists, and academics conducting legitimate laboratory or scientific research. Buyers should be affiliated with a suitable research context — a university, private laboratory, or commercial R&D organisation. We cannot supply individuals unable to confirm a lawful research purpose.", keyword: "who can buy peptides", internalLink: "/about" },
  { question: "Do you accept purchase orders?", answer: "Yes. Verified institutional clients can order by PO without upfront payment. Standard terms are 30 days from invoice date, with 60-day terms available for NHS-affiliated and established accounts.", keyword: "purchase orders", internalLink: "/institutional" },
  { question: "How do I apply for an institutional account?", answer: "Submit an enquiry via our Institutional Accounts page or email us directly. We issue a credit application within one working day. Approval typically takes 48 hours, after which your account is activated with a named account manager.", keyword: "institutional account", internalLink: "/institutional" },
  { question: "What is your returns policy?", answer: "Due to the nature of research compounds and chain-of-custody requirements, we cannot accept returns of opened products. We will replace or refund products that arrive damaged, are incorrectly dispatched, or do not match their CoA. Contact us within 7 days of delivery.", keyword: "returns policy", internalLink: "/terms" },
  { question: "How do I contact you about an existing order?", answer: "Email info@premiopeptides.co.uk with your order reference number. For same-day dispatch issues, contact us before 1:30pm to allow time before the 2pm cut-off.", keyword: "contact support", internalLink: "/contact" },
];

export default async function FAQPage() {
  const cmsFaqs = await getFAQs();
  const faqs = cmsFaqs.length > 0 ? cmsFaqs : fallbackFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

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
            {faqs.length} questions answered. Can&rsquo;t find what you need? <a href="/contact" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">Contact us</a>.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-editorial-border bg-editorial-surface p-6">
              <h2 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h2>
              <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              {faq.internalLink && (
                <a href={faq.internalLink} className="mt-3 inline-block text-xs font-medium text-editorial-accent hover:text-editorial-accent-dark transition-colors">
                  Learn more &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

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
