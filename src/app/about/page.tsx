import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Bell Peptides | UK Research Peptide Supplier",
  description:
    "Bell Peptides is a trading name of BELL RED LIMITED. UK-based supplier of research-grade peptides with third-party testing, same-day dispatch, and dedicated institutional support.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">About Us</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            About Bell Peptides
          </h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Who We Are</h2>
              <div className="text-editorial-muted leading-relaxed space-y-4">
                <p>
                  Bell Peptides is a UK-based supplier of research-grade peptides, serving universities, pharmaceutical companies, biotechnology firms, contract research organisations, and government laboratories. We operate under <strong className="text-editorial-text">BELL RED LIMITED</strong>, a company registered in England and Wales (Company Number 12841067).
                </p>
                <p>
                  Our focus is straightforward: supply high-purity research compounds, backed by independent third-party analytical data, dispatched from UK stock the same day you order. Every product we sell comes with a batch-specific certificate of analysis produced by an accredited independent laboratory. No exceptions.
                </p>
                <p>
                  All compounds are supplied strictly for in vitro laboratory research. We do not sell to the general public for personal use, and we do not make therapeutic or medicinal claims about any of our products.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-editorial-border">
              <Image
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
                alt="Bell Peptides laboratory facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-8">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Third-Party Tested", description: "Every batch is independently analysed by an ISO-accredited laboratory. We do not rely on manufacturer-supplied data or self-certified results." },
              { title: "UK-Stocked, Same-Day Dispatch", description: "All products ship from our UK fulfilment facility. Orders placed before 2pm go out the same working day. No customs, no import delays." },
              { title: "Batch-Specific Documentation", description: "Every order ships with a CoA that corresponds to the exact lot you receive — not a generic product-level certificate." },
              { title: "Institutional Ready", description: "We support purchase orders, 30/60-day invoice terms, preferred supplier registration, and dedicated account management." },
              { title: "Compliance First", description: "All products are designated for research use only. Our marketing, product listings, and sales processes are designed with regulatory boundaries in view." },
              { title: "Technical Support", description: "Our team has hands-on knowledge of peptide research. We can advise on compound selection, handling, storage, and documentation requirements." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-editorial-border bg-white p-5">
                <h3 className="text-sm font-bold text-editorial-text">{item.title}</h3>
                <p className="mt-2 text-sm text-editorial-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Our Commitment</h2>
          <div className="text-editorial-muted leading-relaxed space-y-4">
            <p>
              We built Bell Peptides because the UK research community deserved a domestic supplier that met three basic requirements: verifiable quality, fast dispatch, and transparent compliance. Too many researchers were relying on international suppliers with long lead times, inconsistent documentation, and uncertain regulatory positioning.
            </p>
            <p>
              Our approach is not complicated. We stock research-grade compounds in the UK. We test every batch through independent third-party laboratories. We dispatch the same day. And we are transparent about what our products are and are not intended for.
            </p>
            <p>
              That is the standard we hold ourselves to, and it is the standard our customers — from Russell Group research teams to commercial biotech R&amp;D departments — have come to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 lg:py-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Company Details</h2>
          <div className="rounded-xl border border-editorial-border bg-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-editorial-muted">Legal Entity</p>
                <p className="font-semibold text-editorial-text">BELL RED LIMITED</p>
              </div>
              <div>
                <p className="text-editorial-muted">Trading As</p>
                <p className="font-semibold text-editorial-text">Bell Peptides</p>
              </div>
              <div>
                <p className="text-editorial-muted">Company Number</p>
                <p className="font-semibold text-editorial-text">12841067</p>
              </div>
              <div>
                <p className="text-editorial-muted">Incorporated</p>
                <p className="font-semibold text-editorial-text">27 August 2020</p>
              </div>
              <div>
                <p className="text-editorial-muted">Registered Address</p>
                <p className="font-semibold text-editorial-text">16 Neptune Street, Tipton, England, DY4 8JF</p>
              </div>
              <div>
                <p className="text-editorial-muted">Email</p>
                <p className="font-semibold text-editorial-accent">research@bellpeptides.co.uk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">Browse Peptide Catalogue</a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-editorial-surface transition-colors">Get in Touch</a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
