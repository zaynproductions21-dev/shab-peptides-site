import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Premio Peptides | UK Research Peptide Supplier",
  description:
    "Contact Premio Peptides — the UK's fastest research peptide supplier. Same-day dispatch by 2pm. Get in touch for order support, technical queries, and CoA requests.",
};

const faqs = [
  {
    question: "How quickly will I receive a response to my enquiry?",
    answer:
      "Within 2 to 4 business hours during working hours, Monday to Friday, 9am to 5pm. Enquiries sent outside those hours are handled the next working day.",
  },
  {
    question: "I've placed an order — who do I contact for support?",
    answer:
      "Email info@premiopeptides.co.uk with your order reference number and a brief description of the issue. If it's related to same-day dispatch, get in touch before 1:30pm — that gives us time to sort it before the 2pm cut-off.",
  },
  {
    question: "Can you help with technical questions about peptide specs or CoAs?",
    answer:
      "Yes. Our team can advise on purity grades, sequence confirmation, and CoA documentation. All Premio Peptides products come with third-party CoAs as standard. Include the product name or code and what you need when you get in touch.",
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

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navigation variant="editorial" />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Contact Premio Peptides — UK Research Peptide Supplier
          </h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-editorial-text mb-4">Send Us an Enquiry</h2>
              <p className="text-editorial-muted leading-relaxed">
                First order, CoA request, or a technical question about a specific compound — whatever brings you here, our team can help. Use the enquiry form to reach us directly. Every submission is handled by staff with hands-on knowledge of peptide research, not a generic support desk. We turn enquiries around fast, because a slow supplier is the last thing your research needs.
              </p>

              {/* Email & Response */}
              <div className="mt-8 rounded-xl border border-editorial-border bg-editorial-surface p-5">
                <h3 className="font-serif text-base font-bold text-editorial-text mb-3">Email and Response Times</h3>
                <p className="text-sm text-editorial-muted leading-relaxed">
                  <span className="font-semibold text-editorial-text">Email:</span>{" "}
                  <a href="mailto:info@premiopeptides.co.uk" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">
                    info@premiopeptides.co.uk
                  </a>
                </p>
                <p className="mt-2 text-sm text-editorial-muted leading-relaxed">
                  We respond to all email enquiries within 2 to 4 business hours during working hours. Anything received after 3pm gets picked up the following working day. For time-sensitive order queries, get in touch before 1:30pm and we&rsquo;ll do what we can to resolve it before the 2pm same-day dispatch cut-off.
                </p>
              </div>

              {/* What to include */}
              <div className="mt-6">
                <h3 className="font-serif text-base font-bold text-editorial-text mb-3">What to Include in Your Enquiry</h3>
                <p className="text-sm text-editorial-muted mb-3">The more detail you give us upfront, the faster we can help. Where relevant, include:</p>
                <ul className="space-y-2">
                  {[
                    "The peptide name, sequence, or product code",
                    "Your intended research application or purity requirement",
                    "Your institution or organisation name",
                    "Your order reference number (for existing order queries)",
                    "Any specific CoA or documentation requirements",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-editorial-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-editorial-accent">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-editorial-muted">This cuts out the back-and-forth and gets you a precise answer first time.</p>
              </div>

              {/* Business Hours */}
              <div className="mt-6 rounded-xl border border-editorial-border bg-editorial-surface p-5">
                <h3 className="font-serif text-base font-bold text-editorial-text mb-3">Business Hours and Dispatch Times</h3>
                <p className="text-sm text-editorial-muted leading-relaxed">
                  Our order processing and customer support team operates Monday to Friday, 9am to 5pm (GMT/BST). We are closed on UK public holidays.
                </p>
                <p className="mt-2 text-sm text-editorial-muted leading-relaxed">
                  Same-day dispatch is available on qualifying orders placed before 2pm on working days. Orders placed after the cut-off, or over weekends and bank holidays, go out on the next available working day. All products are supplied strictly for in vitro research use only.
                </p>
              </div>

              {/* Location */}
              <div className="mt-6">
                <h3 className="font-serif text-base font-bold text-editorial-text mb-3">Location and Shipping</h3>
                <p className="text-sm text-editorial-muted leading-relaxed">
                  Premio Peptides operates from the UK and ships exclusively within the UK. All orders leave our UK fulfilment facility, which keeps lead times short and delivery reliable via tracked courier. We don&rsquo;t currently ship internationally. For bulk or institutional orders that need bespoke logistics, contact us before placing your order so we can talk through the options.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="sticky top-24">
                <QuoteForm variant="editorial" />
              </div>
            </div>
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
            Ready to order, or want to talk it through first? Contact the Premio Peptides team today — same-day dispatch on orders placed before 2pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Browse Peptide Catalogue
            </a>
            <a href="/institutional" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors">
              Institutional Accounts
            </a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
