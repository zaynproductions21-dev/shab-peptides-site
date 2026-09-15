import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompoundGrid from "@/components/CompoundGrid";
import { getCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Research Peptides | Buy Peptides UK | Premio Peptides",
  description:
    "Browse our full catalogue of research-grade peptides. 99%+ purity, third-party CoA, same-day UK dispatch. BPC-157, TB-500, GHK-Cu, Tesamorelin and more.",
  alternates: { canonical: "/compounds" },
  openGraph: {
    title: "Research Peptides Catalogue | Premio Peptides UK",
    description: "23 research-grade peptides. 99%+ purity. Third-party CoA. Same-day UK dispatch.",
    url: "/compounds",
    type: "website",
  },
};

const SITE_URL = "https://premiopeptides.co.uk";

const faqs = [
  {
    question: "What are research peptides?",
    answer:
      "Research peptides are short chains of amino acids, supplied as reference materials for laboratory work. In a research setting, they're used as test compounds in in-vitro and in-vivo studies carried out by qualified professionals. They are supplied for laboratory research use only — they are not a licensed medicine, and not for human or veterinary use.",
  },
  {
    question: "How are the compounds in this catalogue tested?",
    answer:
      "Every compound we list goes through independent, third-party analytical testing before it's made available — covering identity and composition. Results are tied to the specific production batch, and a batch-specific certificate of analysis is available on request. We don't just take the manufacturer's word for it.",
  },
  {
    question: "Who can order, and what are these for?",
    answer:
      "Ordering is open to research institutions, universities, biotech companies, and qualified research professionals only. All compounds are supplied strictly for laboratory research — they're not sold to the public for personal use. We include handling and storage information with every order, but we don't offer guidance on administration or use in humans or animals.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse the catalogue, pick what you need, and head to checkout with your research details. There's a manual verification step before anything gets dispatched — so don't worry if it's not instant. Order before 2pm for same-day dispatch, with tracked UK delivery throughout and free UK delivery on orders over £75.",
  },
  {
    question: "Can I get a certificate of analysis before ordering?",
    answer:
      "Yes. Certificates of analysis are available on request. If you need documentation for a compound you're looking at before placing an order — say, to satisfy an institutional review or procurement process — just get in touch with our team, let us know the compound name, and we'll send over the relevant document where we have it available.",
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

export default async function CompoundsPage() {
  const compounds = await getCompounds();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research Peptides Catalogue",
    description: "Research-grade peptide catalogue from Premio Peptides UK.",
    url: `${SITE_URL}/compounds`,
    isPartOf: { "@type": "WebSite", name: "Premio Peptides", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: compounds.length,
      itemListElement: compounds.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/compounds/${c.slug}`,
        name: c.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://premiopeptides.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Compounds", item: "https://premiopeptides.co.uk/compounds" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Catalogue</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Research Peptides
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            Browse our full catalogue of research-grade peptide compounds, supplied
            for laboratory research use only. Every compound goes through
            independent third-party testing before it&rsquo;s listed — and a
            batch-specific certificate of analysis is available on request. Orders
            placed before 2pm ship the same day, with tracked UK delivery as
            standard and free UK delivery on orders over £75.
          </p>
          <p className="mt-3 text-xs text-editorial-muted max-w-2xl">
            All compounds are supplied for laboratory research use only — they are
            not a licensed medicine, and not for human or veterinary use.
          </p>
        </div>
      </section>

      <CompoundGrid compounds={compounds} />

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-editorial-text mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-editorial-border bg-editorial-surface p-6"
              >
                <h3 className="font-serif text-base font-bold text-editorial-text">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted mb-4">Need a peptide not listed? We offer custom synthesis from £99.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/compounds/custom-synthesis" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">Custom Synthesis</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
