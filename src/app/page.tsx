import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import QuoteForm from "@/components/QuoteForm";

import { getFeaturedCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Premio Peptides | UK Research Peptide Supplier — Same-Day Dispatch, COA Included",
  description:
    "UK's leading research peptide supplier. Preloaded pens, 99%+ purity, third-party certificates of analysis, same-day dispatch before 2pm. Retatrutide, GHK-Cu, BPC-157/TB-500 stacks in stock.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Premio Peptides | UK Research Peptide Supplier — Same-Day Dispatch, COA Included",
    description: "UK research peptide supplier. Preloaded pens, 99%+ purity, third-party COA, same-day dispatch. Retatrutide, GHK-Cu, BPC-157 stacks.",
    url: "/",
    type: "website",
  },
};

const faqs = [
  { question: "What makes Premio Peptides the best peptide supplier in the UK?", answer: "Premio Peptides combines 99%+ guaranteed purity, same-day dispatch for orders before 14:00 GMT, comprehensive certificates of analysis with every order, and dedicated UK-based technical support. Every batch is independently verified via HPLC and mass spectrometry before release." },
  { question: "How do you ensure research peptide purity and quality?", answer: "Every compound undergoes a rigorous multi-stage quality control process including HPLC analysis, ESI-MS verification of molecular weight, quantitative amino acid analysis, and LAL endotoxin testing. We guarantee a minimum 99%+ purity with full certificates of analysis provided." },
  { question: "Do you offer same-day dispatch for peptide orders?", answer: "Yes. All orders placed before 14:00 GMT are dispatched the same working day in temperature-controlled packaging. Next-day delivery is available across the United Kingdom, eliminating the delays associated with international suppliers." },
  { question: "What certificates and documentation do you provide?", answer: "Every order includes a comprehensive certificate of analysis featuring HPLC chromatograms, mass spectrometry data, amino acid analysis results, and endotoxin testing results. Additional technical documentation and handling guides are available upon request." },
  { question: "Can I order custom peptide synthesis?", answer: "Absolutely. We offer bespoke peptide synthesis tailored to your precise research requirements, from novel sequences to modified analogues. Contact our research team to discuss your specifications and receive a custom quotation." },
  { question: "Are your peptides suitable for research purposes?", answer: "All Premio Peptides products are supplied strictly for research purposes only and are not intended for human consumption. We supply to university research laboratories, pharmaceutical R&D departments, biotechnology firms, clinical research organisations, and government laboratories across the UK." },
  { question: "Is it legal to buy research peptides in the UK?", answer: "Most synthetic peptides are not controlled substances under UK law and are not classified as licensed medicines, provided they are not marketed or used for medicinal purposes. Premio Peptides compounds are supplied strictly for in vitro laboratory research under the Misuse of Drugs Act 1971 and Human Medicines Regulations 2012. Buyers must confirm a lawful research purpose before dispatch. For full regulatory context, see our UK Compliance page." },
  { question: "Which UK peptide supplier provides certificates of analysis?", answer: "Premio Peptides includes a batch-specific Certificate of Analysis with every order. Each CoA features HPLC chromatograms confirming 99%+ purity, mass spectrometry molecular weight verification, and the name and accreditation details of the independent third-party laboratory. We never issue self-certified CoAs or rely on manufacturer-supplied data. Sample certificates are available on our Certificates of Analysis page before purchase." },
  { question: "What is the fastest UK peptide delivery?", answer: "Premio Peptides offers same-day dispatch for all orders placed before 14:00 GMT on working days. Orders are shipped in temperature-controlled packaging via tracked UK courier, with next-day delivery available across England, Scotland, Wales, and Northern Ireland. Free standard delivery on orders over £75." },
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
  name: "Premio Peptides",
  legalName: "BELL RED LIMITED",
  url: "https://premiopeptides.co.uk",
  description: "UK research-grade peptide supplier with 99%+ purity guarantee and same-day dispatch.",
  foundingDate: "2020-08-27",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 Neptune Street",
    addressLocality: "Tipton",
    postalCode: "DY4 8JF",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@premiopeptides.co.uk",
    contactType: "customer service",
    availableLanguage: "English",
    areaServed: "GB",
  },
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/12841067",
  ],
};

export default async function V1Editorial() {
  const products = await getFeaturedCompounds(12);
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
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
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
                  Ships From UK
                </span>
              </div>
            </div>

            {/* Hero product showcase */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-editorial-border">
                <Image
                  src="/generated/hero-0.webp"
                  alt="Research-grade peptide vials held in UK stock by Premio Peptides"
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
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🔬", title: "HPLC & MS Tested", sub: "Every single batch" },
              { icon: "🚚", title: "Same-Day Dispatch", sub: "Order before 14:00 GMT" },
              { icon: "📋", title: "CoA Included", sub: "Full certificates with every order" },
              { icon: "🇬🇧", title: "UK Stock", sub: "Held in the UK, no import delays" },
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

      {/* Featured Stacks — The 3 Premium Research Stacks */}
      <section id="compounds" className="py-16 lg:py-24 bg-editorial-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-2">Research Stacks</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-editorial-text">
              Three Precision-Formulated Stacks
            </h2>
            <p className="mt-3 text-editorial-muted max-w-2xl mx-auto">
              Preloaded pens. No reconstitution required. Temperature-controlled UK dispatch. Certificate of Analysis included.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const nicknames: Record<string, { nickname: string; color: string; icon: string }> = {
                "retatrutide": { nickname: "The Triple G", color: "bg-blue-500", icon: "⚡" },
                "ghk-cu-glow-stack": { nickname: "The Glow", color: "bg-amber-500", icon: "✨" },
                "bpc-157-tb-500-wolverine": { nickname: "The Wolverine", color: "bg-emerald-600", icon: "🔬" },
              };
              const meta = nicknames[product.slug] || { nickname: product.category, color: "bg-editorial-accent", icon: "🧬" };
              return (
                <Link
                  key={product.slug}
                  href={`/compounds/${product.slug}`}
                  className="group relative rounded-2xl border border-editorial-border bg-white overflow-hidden hover:shadow-2xl hover:border-editorial-accent/30 transition-all flex flex-col"
                >
                  {/* Stack badge */}
                  <div className={`${meta.color} text-white px-5 py-3 flex items-center justify-between`}>
                    <span className="text-sm font-bold uppercase tracking-wider">{meta.nickname}</span>
                    <span className="text-lg">{meta.icon}</span>
                  </div>

                  {/* Product image — click to expand */}
                  {product.image && (
                    <div className="px-5 pt-5">
                      <ImageLightbox
                        src={product.image}
                        alt={`${product.name} — preloaded research peptide pen by Premio Peptides`}
                      />
                    </div>
                  )}

                  <div className="p-6 pt-4 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-editorial-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Format info */}
                    <div className="mt-5 rounded-lg border border-editorial-border bg-editorial-surface p-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-editorial-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent shrink-0"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                        {product.sizes[0]?.size} — Preloaded Pen
                      </div>
                      <div className="flex items-center gap-2 text-xs text-editorial-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent shrink-0"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                        {product.purity} Purity Verified
                      </div>
                      <div className="flex items-center gap-2 text-xs text-editorial-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent shrink-0"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                        No Reconstitution Required
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto pt-5 border-t border-editorial-border flex items-center justify-between gap-3">
                      <div>
                        <p className="text-3xl font-bold text-editorial-accent">{product.sizes[0]?.price}</p>
                        <p className="text-[10px] text-editorial-muted">CoA included &middot; Free UK delivery</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-editorial-accent px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-editorial-accent-dark transition-colors shadow-md">
                        View Stack
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Browse all link */}
          <div className="mt-10 text-center">
            <Link href="/compounds" className="inline-flex items-center gap-2 text-sm font-semibold text-editorial-accent hover:text-editorial-accent-dark transition-colors">
              Browse All 26 Research Peptides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Assurance — Lab-focused */}
      <section id="quality" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-1">Laboratory Quality</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-editorial-text">
                Every Vial Third-Party Tested
              </h2>
              <p className="mt-4 text-editorial-muted leading-relaxed">
                Every batch we hold has been independently analysed by a third-party laboratory using the same instrumentation that pharmaceutical companies rely on. We don&rsquo;t accept manufacturer-supplied data alone &mdash; the certificate that ships with your order is issued by an accredited testing partner, not by us.
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
                <Image src="/generated/section-3.webp" alt="HPLC equipment used by the third-party laboratory that tests Premio Peptides stock" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
                  Premio Peptides is committed to responsible supply. All compounds
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
                Premio Peptides Ltd supplies research compounds exclusively for in-vitro laboratory research.
                Products are not medicines, supplements, or food products. Not approved for human or animal use.
                Purchasers assume full responsibility for compliance with all applicable regulations in their jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — MediCenter-style icon boxes */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
                  { label: "info@premiopeptides.co.uk", detail: "Email us anytime" },
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
