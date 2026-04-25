import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { getFeaturedCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Best Peptide Supplier UK | Research Grade | Bio Peptides",
  description:
    "UK's fastest research peptide supplier. Order by 2pm, ships today. Third-party tested compounds with certificates of analysis. 99%+ purity verified.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Peptide Supplier UK | Research Grade | Bio Peptides",
    description: "UK's fastest research peptide supplier. 99%+ purity. Same-day dispatch. Third-party CoA included.",
    url: "/",
    type: "website",
  },
};

const faqs = [
  { question: "What makes Bio Peptides the best peptide supplier in the UK?", answer: "Bio Peptides combines 99%+ guaranteed purity, same-day dispatch for orders before 14:00 GMT, comprehensive certificates of analysis with every order, and dedicated UK-based technical support. Every batch is independently verified via HPLC and mass spectrometry before release." },
  { question: "How do you ensure research peptide purity and quality?", answer: "Every compound undergoes a rigorous multi-stage quality control process including HPLC analysis, ESI-MS verification of molecular weight, quantitative amino acid analysis, and LAL endotoxin testing. We guarantee a minimum 99%+ purity with full certificates of analysis provided." },
  { question: "Do you offer same-day dispatch for peptide orders?", answer: "Yes. All orders placed before 14:00 GMT are dispatched the same working day in temperature-controlled packaging. Next-day delivery is available across the United Kingdom, eliminating the delays associated with international suppliers." },
  { question: "What certificates and documentation do you provide?", answer: "Every order includes a comprehensive certificate of analysis featuring HPLC chromatograms, mass spectrometry data, amino acid analysis results, and endotoxin testing results. Additional technical documentation and handling guides are available upon request." },
  { question: "Can I order custom peptide synthesis?", answer: "Absolutely. We offer bespoke peptide synthesis tailored to your precise research requirements, from novel sequences to modified analogues. Contact our research team to discuss your specifications and receive a custom quotation." },
  { question: "Are your peptides suitable for research purposes?", answer: "All Bio Peptides products are supplied strictly for research purposes only and are not intended for human consumption. We supply to university research laboratories, pharmaceutical R&D departments, biotechnology firms, clinical research organisations, and government laboratories across the UK." },
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bio Peptides",
  url: "https://www.biopeptides.co.uk",
  description: "UK's leading research peptide supplier with 99%+ purity guarantee and same-day dispatch.",
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  contactPoint: { "@type": "ContactPoint", email: "info@biopeptides.co.uk", contactType: "customer service", availableLanguage: "English" },
};

export default async function V1Editorial() {
  const products = await getFeaturedCompounds(6);
  const heroProduct = products[0];
  const heroNames = products.slice(0, 3).map((p) => p.name).join(", ");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <Navigation variant="editorial" />

      {/* Shipping Banner */}
      <div className="bg-editorial-accent text-white text-center py-2.5 text-sm font-medium tracking-wide pt-[4.5rem]">
        <span className="hidden sm:inline">🚚 </span>
        Free UK Delivery on Orders Over £75 &nbsp;·&nbsp; Order Before 14:00 for Same-Day Dispatch &nbsp;·&nbsp; Certificate of Analysis Included
      </div>

      {/* Hero — MediCenter-inspired clean medical with product showcase */}
      <section className="relative bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center rounded-md bg-editorial-accent/10 border border-editorial-accent/20 px-3 py-1 text-xs font-semibold text-editorial-accent uppercase tracking-wider">
                  UK&rsquo;s #1 Supplier
                </span>
                <span className="inline-flex items-center rounded-md bg-editorial-green/10 border border-editorial-green/20 px-3 py-1 text-xs font-semibold text-editorial-green uppercase tracking-wider">
                  In Stock
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-editorial-text leading-[1.1]">
                Research-Grade{" "}
                <span className="text-editorial-accent">Peptides</span>{" "}
                Delivered Next Day
              </h1>
              <p className="mt-5 text-lg text-editorial-muted leading-relaxed max-w-lg">
                Premium {heroNames || "research peptides"} and 20+ research compounds.
                99%+ purity. HPLC verified. Ships from the UK.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-md shadow-editorial-accent/20">
                  Shop All Peptides
                </a>
                <a href="#quality" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">
                  View Lab Certificates
                </a>
              </div>
              {/* Trust row */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-editorial-muted">
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  99%+ Purity
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  Same-Day Dispatch
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  UK-Based Lab
                </span>
              </div>
            </div>

            {/* Hero product showcase */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-editorial-border">
                <Image
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80"
                  alt="Bio Peptides laboratory with research-grade peptide vials"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-editorial-text/30 to-transparent" />
              </div>
              {/* Floating product card */}
              {heroProduct && (
                <Link href={`/compounds/${heroProduct.slug}`} className="absolute -bottom-6 -left-4 rounded-xl bg-white shadow-xl border border-editorial-border p-4 max-w-[220px] hover:shadow-2xl transition-shadow block">
                  <p className="text-[10px] font-semibold text-editorial-accent uppercase tracking-widest">{heroProduct.badge ?? "Best Seller"}</p>
                  <p className="text-sm font-bold text-editorial-text mt-1">{heroProduct.name} {heroProduct.sizes[0]?.size}</p>
                  <p className="text-xl font-bold text-editorial-accent mt-1">{heroProduct.sizes[0]?.price}</p>
                  <p className="text-[10px] text-editorial-muted mt-0.5">HPLC Verified · CoA Included</p>
                </Link>
              )}
              {/* Floating purity badge */}
              <div className="absolute -top-3 -right-3 rounded-lg bg-editorial-accent text-white px-4 py-2 shadow-lg">
                <p className="text-xs font-semibold">99%+ Purity</p>
                <p className="text-[10px] opacity-80">Third-Party Tested</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust credentials strip — MediCenter style */}
      <section className="border-y border-editorial-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🔬", title: "HPLC & MS Tested", sub: "Every single batch" },
              { icon: "🚚", title: "Same-Day Dispatch", sub: "Order before 14:00 GMT" },
              { icon: "📋", title: "CoA Included", sub: "Full certificates with every order" },
              { icon: "🇬🇧", title: "UK Laboratory", sub: "No import delays or customs" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-editorial-text">{item.title}</p>
                  <p className="text-xs text-editorial-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid — E-commerce Cards */}
      <section id="compounds" className="py-16 lg:py-24 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-1">Shop Peptides</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-editorial-text">
                Research Compounds
              </h2>
            </div>
            <p className="text-sm text-editorial-muted">
              All prices include CoA &middot; Free delivery over £75
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/compounds/${product.slug}`}
                className="group rounded-xl border border-editorial-border bg-white overflow-hidden hover:shadow-xl hover:border-editorial-accent/20 transition-all flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {/* Function labels — primary benefits */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                    {(product.tags.length > 0 ? product.tags.slice(0, 2) : [product.category]).map((t) => (
                      <span key={t} className="rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                      product.badge === "Best Seller" ? "bg-editorial-accent" :
                      product.badge === "Popular" ? "bg-editorial-green" :
                      "bg-editorial-warm"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                    product.availability === "In Stock"
                      ? "bg-editorial-green/90 text-white"
                      : product.availability === "Made to Order"
                        ? "bg-editorial-warm/90 text-white"
                        : "bg-editorial-accent/90 text-white"
                  }`}>
                    {product.availability}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">{product.name}</h3>
                  <p className="mt-2 text-sm text-editorial-muted leading-relaxed line-clamp-2">{product.shortDescription}</p>

                  {/* Purity & CAS */}
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 rounded bg-editorial-accent/10 px-2 py-0.5 font-semibold text-editorial-accent">
                      {product.purity} Pure
                    </span>
                    {product.cas && <span className="font-mono text-editorial-muted truncate">CAS: {product.cas}</span>}
                  </div>

                  {/* Pricing */}
                  <div className="mt-auto pt-4 border-t border-editorial-border flex items-center justify-between">
                    <p className="text-2xl font-bold text-editorial-accent">{product.sizes[0]?.price}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-editorial-accent group-hover:translate-x-1 transition-transform">
                      View Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance — Lab-focused */}
      <section id="quality" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-1">Laboratory Quality</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-editorial-text">
                Every Vial Third-Party Tested
              </h2>
              <p className="mt-4 text-editorial-muted leading-relaxed">
                Our analytical laboratory employs the same instrumentation used by pharmaceutical
                companies. Every batch is tested before it reaches you.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "HPLC Analysis", description: "Purity exceeding 99% confirmed for all compounds.", icon: "📊" },
                  { title: "Mass Spectrometry", description: "ESI-MS molecular weight and identity verification.", icon: "🔬" },
                  { title: "Amino Acid Analysis", description: "Correct sequence and stoichiometry confirmed.", icon: "🧬" },
                  { title: "Endotoxin Testing", description: "LAL testing below detectable limits.", icon: "✅" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-editorial-text">{item.title}</h3>
                      <p className="text-sm text-editorial-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center text-sm font-semibold text-editorial-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5 text-editorial-accent"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Batch-specific CoA included with every order
              </p>
            </div>
            <div className="space-y-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-editorial-border">
                <Image src="https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&q=80" alt="HPLC equipment in Bio Peptides quality control laboratory" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: "99%+", label: "Min Purity" },
                  { value: "100%", label: "Batch Tested" },
                  { value: "<0.1%", label: "Impurities" },
                  { value: "24h", label: "CoA Turnaround" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center rounded-xl border border-editorial-border bg-editorial-surface p-3">
                    <p className="text-xl font-bold text-editorial-accent">{stat.value}</p>
                    <p className="text-[10px] text-editorial-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Research Purposes — Trust Section */}
      <section className="py-16 lg:py-24 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-editorial-border p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center rounded-md bg-editorial-accent/10 border border-editorial-accent/20 px-3 py-1 text-xs font-semibold text-editorial-accent uppercase tracking-wider mb-4">
                  Research Compliance
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-editorial-text">
                  For Research Purposes Only
                </h2>
                <p className="mt-4 text-editorial-muted leading-relaxed">
                  Bio Peptides is committed to responsible supply. All compounds
                  are supplied exclusively for legitimate scientific research and are not
                  intended for human consumption, veterinary use, or any therapeutic application.
                </p>
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Institutional Verification", description: "All purchasers verified against legitimate research institutions, universities, or pharmaceutical organisations before processing." },
                  { title: "Regulatory Compliance", description: "Full UK regulatory compliance with complete documentation and traceability for every transaction." },
                  { title: "Third-Party Testing", description: "Independent analytical verification ensures compounds meet published specifications." },
                  { title: "Auditable Supply Chain", description: "Fully traceable from synthesis through temperature-controlled delivery." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-editorial-surface border border-editorial-border p-5">
                    <h3 className="text-sm font-bold text-editorial-text">{item.title}</h3>
                    <p className="mt-2 text-xs text-editorial-muted leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-editorial-border">
              <p className="text-[10px] text-editorial-muted text-center max-w-3xl mx-auto leading-relaxed">
                Bio Peptides Ltd supplies research compounds exclusively for in-vitro laboratory research.
                Products are not medicines, supplements, or food products. Not approved for human or animal use.
                Purchasers assume full responsibility for compliance with all applicable regulations in their jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — MediCenter-style icon boxes */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-editorial-text">
              Why 500+ UK Researchers Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Next-Day UK Delivery", description: "Same-day dispatch before 14:00 GMT. Temperature-controlled packaging. No customs delays.", icon: "🚚" },
              { title: "Guaranteed 99%+ Purity", description: "Every batch HPLC and MS verified. Full certificate of analysis included free.", icon: "🔬" },
              { title: "Competitive Pricing", description: "Research-grade quality at fair prices. Bulk discounts and institutional accounts available.", icon: "💰" },
              { title: "Custom Synthesis", description: "Bespoke peptide synthesis from novel sequences to modified analogues.", icon: "⚗️" },
              { title: "Technical Support", description: "Direct access to our research scientists for compound selection and experimental guidance.", icon: "👩‍🔬" },
              { title: "Secure Checkout", description: "Encrypted payments. Discreet packaging. Full order tracking from lab to your door.", icon: "🔒" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-editorial-border p-6 hover:shadow-md hover:border-editorial-accent/20 transition-all">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-3 text-base font-bold text-editorial-text">{item.title}</h3>
                <p className="mt-2 text-sm text-editorial-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-editorial-text">
              Frequently Asked Questions
            </h2>
          </div>
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

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-1">Get in Touch</p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-editorial-text">
                Bulk Orders &amp; Custom Quotes
              </h2>
              <p className="mt-4 text-editorial-muted leading-relaxed">
                Need bulk quantities, custom synthesis, or institutional pricing?
                Submit your requirements and we&rsquo;ll respond within one working day.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { label: "info@biopeptides.co.uk", detail: "Email us anytime" },
                  { label: "1 working day response", detail: "Guaranteed turnaround" },
                  { label: "United Kingdom", detail: "Ships from UK lab" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-editorial-border bg-editorial-surface p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-editorial-accent/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg>
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
