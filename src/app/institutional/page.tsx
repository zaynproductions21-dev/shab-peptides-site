import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Institutional Peptide Supplier for Universities UK",
  description:
    "Bulk peptide supply for UK universities, CROs and biotech. Same-day dispatch, third-party CoAs, PO and invoice payment. Apply for a dedicated institutional account.",
};

const faqs = [
  {
    question: "What types of organisations qualify for an institutional account?",
    answer:
      "Universities, research institutes, CROs, pharmaceutical companies, biotech firms and NHS-affiliated research facilities. Sole traders and individual researchers may apply but face additional verification. All applicants must demonstrate a legitimate research use for the products ordered.",
  },
  {
    question: "Is there a minimum order value for bulk pricing?",
    answer:
      "Tiered pricing starts at 5g per compound. There is no minimum order value for account holders, though volume discounts apply per line item rather than across the total basket. For very large or recurring orders, bespoke pricing is available and negotiated directly with your account manager.",
  },
  {
    question: "Do you accept university purchase orders?",
    answer:
      "Yes. Verified institutional clients can order by PO without upfront payment. We support standard university PO formats and can work with your finance team to align invoicing with your internal coding and approval requirements. Standard terms are 30 days from invoice date.",
  },
  {
    question: "Are certificates of analysis available for all products?",
    answer:
      "Every product comes with a batch-specific CoA from an accredited independent laboratory. CoAs confirm compound identity, HPLC purity and MS mass verification. NMR or residual solvent testing can be requested at the quotation stage for projects with specific documentation needs.",
  },
  {
    question: "How quickly can orders be dispatched once an account is active?",
    answer:
      "In-stock orders placed before the daily cut-off ship same day, with tracked next-day domestic delivery as standard. For custom synthesis, lead times depend on complexity and are confirmed in writing before your order is accepted.",
  },
  {
    question: "Can you supply a preferred supplier registration pack?",
    answer:
      "Yes. Our standard pack includes Companies House registration, VAT certificate, public liability and professional indemnity insurance certificates, quality assurance policy and third-party laboratory accreditation documentation. It is issued to all new institutional applicants and updated annually. We can also complete supplier portal registrations on your behalf where needed.",
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

export default function InstitutionalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Institutional Accounts</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Institutional Peptide Accounts for Universities, CROs and Biotech
          </h1>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Who We Work With</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Bell Peptides supplies research-grade peptides to institutional clients across the UK and Europe. That includes Russell Group universities, independent research institutes, CROs, pharmaceutical and biotech companies, and NHS-affiliated research facilities. All products are for in vitro and laboratory research use only — not for clinical, veterinary or human administration.
            </p>
            <p>
              If your organisation needs consistent, high-purity peptide supply backed by documented quality assurance, we work directly with your procurement team from first enquiry through to ongoing replenishment.
            </p>
          </div>
          {/* Institution types */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Russell Group Universities", "Research Institutes", "Contract Research Organisations", "Pharmaceutical Companies", "Biotech Firms", "NHS Research Facilities"].map((org) => (
              <div key={org} className="rounded-lg border border-editorial-border bg-editorial-surface p-3 text-center">
                <p className="text-sm font-medium text-editorial-text">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Pricing */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Bulk Pricing Structure</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Institutional customers get tiered volume pricing across our full catalogue. Discount bands apply automatically at 5g, 25g and 100g thresholds. Custom synthesis requirements and long-term supply agreements are quoted separately.
            </p>
            <p>
              Pricing is fixed per contract period, so your budget isn&rsquo;t exposed to market fluctuation. Multi-compound orders qualify for combined volume discounts, and repeat orders placed under a preferred supplier agreement attract preferential rates reviewed annually. All bulk pricing is exclusive of VAT and comes with full documentation — including batch-specific certificates of analysis from accredited third-party laboratories.
            </p>
          </div>
          {/* Pricing tiers */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { tier: "5g+", label: "Standard Bulk", detail: "Automatic volume discount" },
              { tier: "25g+", label: "Research Programme", detail: "Enhanced discount band" },
              { tier: "100g+", label: "Institutional Supply", detail: "Best available pricing" },
            ].map((t) => (
              <div key={t.tier} className="rounded-xl border border-editorial-border bg-white p-5 text-center">
                <p className="text-2xl font-bold text-editorial-accent">{t.tier}</p>
                <p className="text-sm font-semibold text-editorial-text mt-1">{t.label}</p>
                <p className="text-xs text-editorial-muted mt-1">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PO and Invoice */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">PO and Invoice Payment Options</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              We accept purchase orders from verified institutional clients. No credit card required. Standard terms are 30-day net, with 60-day terms available for NHS-affiliated research bodies and established corporate accounts.
            </p>
            <p>
              Invoices are issued in GBP with all HMRC-compliant documentation your finance department needs. To open an account on invoice terms, you complete a short credit application. Most are reviewed within two working days. We accept BACS, CHAPS and cheque.
            </p>
          </div>
        </div>
      </section>

      {/* Account Management */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Dedicated Account Management</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Every institutional account gets a named account manager — one contact for procurement, technical and logistics queries. They keep a working knowledge of your research requirements and can advise on catalogue selection, purity grades, storage specs and reformulation as your projects develop.
            </p>
            <p>
              For time-sensitive programmes, account managers can expedite dispatch and coordinate bespoke synthesis timelines directly with our production team. Dedicated account management is included at no extra cost for all institutional customers above a minimum annual spend, confirmed during onboarding.
            </p>
          </div>
        </div>
      </section>

      {/* Preferred Supplier */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Preferred Supplier Agreements</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              We can be registered as an approved or preferred supplier within your procurement system. We provide everything needed to complete supplier registration: company registration details, VAT number, insurance certificates, quality assurance policies and third-party laboratory accreditation records.
            </p>
            <p>
              Preferred supplier agreements lock in pricing, service-level commitments and payment terms for a defined contract period — typically 12 or 24 months. That gives your finance and compliance teams the certainty they need. We are already registered with a number of UK universities and CROs and can supply references on request.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Onboarding Process</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              Submit an account enquiry via the form below or email our institutional sales team. We issue a credit application and supplier registration pack within one working day. Approval typically takes 48 hours. Once approved, your account is activated, your account manager is introduced and you receive access to our institutional pricing schedule.
            </p>
            <p>
              Your first order can be placed immediately. Subject to stock, it ships same day. For custom synthesis, we can arrange a scoping call with our technical team at no obligation.
            </p>
          </div>
          {/* Onboarding steps */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Enquire", detail: "Submit form or email" },
              { step: "02", title: "Application", detail: "Credit check in 48h" },
              { step: "03", title: "Activation", detail: "Account manager assigned" },
              { step: "04", title: "First Order", detail: "Ships same day" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-editorial-accent bg-white text-sm font-bold text-editorial-accent font-mono">
                  {s.step}
                </div>
                <p className="mt-2 text-sm font-semibold text-editorial-text">{s.title}</p>
                <p className="text-xs text-editorial-muted">{s.detail}</p>
              </div>
            ))}
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

      {/* Apply CTA + Form */}
      <section id="apply" className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-editorial-text mb-4">Apply for an Institutional Account</h2>
              <p className="text-editorial-muted leading-relaxed mb-6">
                Submit your details below and a member of our institutional sales team will respond within one working day. Approval takes around 48 hours. Same-day dispatch is available from your first order.
              </p>
              <div className="space-y-3">
                {[
                  { label: "48-hour approval", detail: "From application to active account" },
                  { label: "30-day payment terms", detail: "60 days for NHS-affiliated" },
                  { label: "Named account manager", detail: "Included at no extra cost" },
                  { label: "Same-day dispatch", detail: "From your very first order" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-editorial-border bg-white p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-editorial-accent/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-editorial-text">{item.label}</p>
                      <p className="text-xs text-editorial-muted">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <QuoteForm variant="editorial" />
            </div>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
