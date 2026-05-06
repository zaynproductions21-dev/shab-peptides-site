import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AddToBasket from "@/components/AddToBasket";
import MechanismDiagram, { getMechanism } from "@/components/MechanismDiagram";
import { getCompounds, getCompoundBySlug } from "@/data/compounds";

export async function generateStaticParams() {
  const compounds = await getCompounds();
  return compounds.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const compound = await getCompoundBySlug(slug);
  if (!compound) return {};
  return {
    title: compound.metaTitle,
    description: compound.metaDescription,
    alternates: { canonical: `/compounds/${compound.slug}` },
    openGraph: {
      title: compound.metaTitle,
      description: compound.metaDescription,
      url: `/compounds/${compound.slug}`,
      type: "website",
      images: compound.image ? [{ url: compound.image, alt: compound.imageAlt }] : undefined,
    },
  };
}

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = await getCompoundBySlug(slug);
  if (!compound) notFound();

  const mechanism = getMechanism(compound.slug);
  const allCompounds = await getCompounds();
  const related = allCompounds.filter((c) => c.slug !== compound.slug).slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: compound.name,
    description: compound.shortDescription,
    image: compound.image.startsWith("http")
      ? compound.image
      : `https://premiopeptides.co.uk${compound.image}`,
    brand: { "@type": "Brand", name: "Premio Peptides" },
    mpn: compound.cas || undefined,
    offers: compound.sizes.map((s) => {
      const rawPrice = s.price.replace(/[£,]/g, "").replace("From ", "").trim();
      const numericPrice = parseFloat(rawPrice);
      return {
        "@type": "Offer",
        url: `https://premiopeptides.co.uk/compounds/${compound.slug}`,
        price: isNaN(numericPrice) ? rawPrice : numericPrice.toFixed(2),
        priceCurrency: "GBP",
        itemCondition: "https://schema.org/NewCondition",
        availability: compound.availability === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/BackOrder",
        seller: { "@type": "Organization", name: "Premio Peptides" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "0",
            currency: "GBP",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "GB",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "GB",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          merchantReturnDays: 7,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      };
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: compound.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://premiopeptides.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Compounds", item: "https://premiopeptides.co.uk/compounds" },
      { "@type": "ListItem", position: 3, name: compound.name, item: `https://premiopeptides.co.uk/compounds/${compound.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {compound.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation variant="editorial" />

      {/* Breadcrumb */}
      <div className="pt-20 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-xs text-editorial-muted">
            <Link href="/" className="hover:text-editorial-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compounds" className="hover:text-editorial-accent transition-colors">Compounds</Link>
            <span className="mx-2">/</span>
            <span className="text-editorial-text font-medium">{compound.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="pb-12 lg:pb-16 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-editorial-border">
              <Image
                src={compound.image}
                alt={compound.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {compound.badge && (
                <span className={`absolute top-4 left-4 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow ${
                  compound.badge === "Best Seller" ? "bg-editorial-accent" :
                  compound.badge === "Popular" ? "bg-editorial-green" :
                  compound.badge === "Value" ? "bg-editorial-green" :
                  "bg-editorial-warm"
                }`}>{compound.badge}</span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold text-editorial-accent uppercase tracking-widest">{compound.category}</span>
              <h1 className="mt-2 font-serif text-3xl lg:text-4xl font-bold text-editorial-text">{compound.name}</h1>
              <p className="mt-3 text-editorial-muted leading-relaxed">{compound.shortDescription}</p>

              {/* Key specs */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-editorial-border bg-white p-3">
                  <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Purity</p>
                  <p className="text-lg font-bold text-editorial-accent">{compound.purity}</p>
                </div>
                <div className="rounded-lg border border-editorial-border bg-white p-3">
                  <p className="text-[10px] text-editorial-muted uppercase tracking-wider">CAS Number</p>
                  <p className="text-sm font-mono font-semibold text-editorial-text">{compound.cas}</p>
                </div>
                <div className="rounded-lg border border-editorial-border bg-white p-3">
                  <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Status</p>
                  <p className={`text-sm font-semibold ${
                    compound.availability === "In Stock" ? "text-editorial-green" :
                    compound.availability === "Made to Order" ? "text-editorial-warm" :
                    "text-editorial-accent"
                  }`}>{compound.availability}</p>
                </div>
                <div className="rounded-lg border border-editorial-border bg-white p-3">
                  <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Dispatch</p>
                  <p className="text-sm font-semibold text-editorial-text">Same-Day (before 2pm)</p>
                </div>
              </div>

              {/* Sizes & Add to Basket */}
              <div className="mt-6">
                <AddToBasket slug={compound.slug} name={compound.name} sizes={compound.sizes} image={compound.image} inStock={compound.availability === "In Stock"} />
              </div>

              {/* Research disclaimer */}
              <div className="mt-4 rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-3">
                <p className="text-[11px] text-editorial-accent leading-relaxed">
                  <strong>Research verification required.</strong> All orders are reviewed before dispatch. You will receive an email confirmation and a WhatsApp or phone call within 60 minutes to verify your research purpose.
                </p>
              </div>

              {/* Trust strip */}
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-editorial-muted">
                <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg> Third-Party CoA Included</span>
                <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg> Free Delivery Over £75</span>
                <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg> Research Use Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-4">About {compound.name}</h2>
          <p className="text-editorial-muted leading-relaxed">{compound.description}</p>

          <h3 className="font-serif text-lg font-bold text-editorial-text mt-8 mb-3">Research Applications</h3>
          <ul className="space-y-2">
            {compound.researchApplications.map((app) => (
              <li key={app} className="flex items-start gap-2 text-sm text-editorial-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-editorial-accent"><path d="M5 13l4 4L19 7" /></svg>
                {app}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {mechanism && <MechanismDiagram productName={compound.name} mechanism={mechanism} />}

      {/* Technical Specifications */}
      <section className="py-12 lg:py-16 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Technical Specifications</h2>
          <div className="rounded-xl border border-editorial-border bg-white overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Compound Name", value: compound.name },
                  { label: "Category", value: compound.category },
                  { label: "CAS Number", value: compound.cas },
                  { label: "Molecular Weight", value: compound.molecularWeight },
                  { label: "Molecular Formula", value: compound.molecularFormula },
                  { label: "Sequence", value: compound.sequence },
                  { label: "Purity", value: `≥${compound.purity} (HPLC)` },
                  { label: "Form", value: "Lyophilised powder" },
                  { label: "Storage", value: compound.storageConditions },
                  { label: "Reconstitution", value: compound.reconstitution },
                ].map((row, i) => (
                  <tr key={row.label} className={i < 9 ? "border-b border-editorial-border/50" : ""}>
                    <td className="py-3 px-5 font-semibold text-editorial-text w-1/3">{row.label}</td>
                    <td className="py-3 px-5 text-editorial-muted">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CoA Download */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-editorial-accent/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-editorial-accent">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-serif text-lg font-bold text-editorial-text">Certificate of Analysis</h3>
              <p className="mt-1 text-sm text-editorial-muted">Every order of {compound.name} includes a batch-specific CoA with HPLC chromatogram, mass spectrometry data, and laboratory accreditation details.</p>
            </div>
            <a href="/certificates-of-analysis" className="inline-flex items-center rounded-lg bg-editorial-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shrink-0">
              View Sample CoA
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6 text-center">{compound.name} — Frequently Asked Questions</h2>
          <div className="space-y-4">
            {compound.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-editorial-border bg-white p-6">
                <h3 className="font-serif text-base font-bold text-editorial-text">{faq.question}</h3>
                <p className="mt-3 text-sm text-editorial-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links — trust & documentation */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: "/certificates-of-analysis", label: "Certificates of Analysis", icon: "📊" },
              { href: "/quality", label: "Quality & Testing", icon: "🔬" },
              { href: "/guidelines", label: "Research Guidelines", icon: "📋" },
              { href: "/compliance", label: "UK Compliance", icon: "⚖️" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex flex-col items-center gap-2 rounded-xl border border-editorial-border bg-editorial-surface p-4 text-center hover:border-editorial-accent/30 hover:shadow-sm transition-all">
                <span className="text-xl">{link.icon}</span>
                <span className="text-xs font-semibold text-editorial-text">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research Use Disclaimer */}
      <section className="py-8 bg-white border-y border-editorial-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] text-editorial-muted text-center leading-relaxed">
            {compound.name} is supplied by Premio Peptides (BELL RED LIMITED) exclusively for in vitro laboratory research. It is not a licensed medicine, is not approved for human or veterinary use, and must not be administered to any living organism outside a formally approved research protocol. Purchasers assume full responsibility for compliance with applicable regulations.
          </p>
        </div>
      </section>

      {/* Related Compounds */}
      <section className="py-12 lg:py-16 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-6">Related Compounds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/compounds/${r.slug}`} className="group rounded-xl border border-editorial-border bg-white overflow-hidden hover:shadow-lg hover:border-editorial-accent/20 transition-all">
                <div className="relative h-36 w-full overflow-hidden">
                  <Image src={r.image} alt={r.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold text-editorial-accent uppercase tracking-widest">{r.category}</span>
                  <h3 className="mt-1 font-serif text-base font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">{r.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-editorial-accent">{r.sizes[0].price}</span>
                    <span className="text-xs text-editorial-accent font-semibold">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
