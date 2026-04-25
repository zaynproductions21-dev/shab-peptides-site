import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompoundGrid from "@/components/CompoundGrid";
import { getCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Research Peptides | Buy Peptides UK | Bio Peptides",
  description:
    "Browse our full catalogue of research-grade peptides. 99%+ purity, third-party CoA, same-day UK dispatch. BPC-157, TB-500, GHK-Cu, Tesamorelin and more.",
  alternates: { canonical: "/compounds" },
  openGraph: {
    title: "Research Peptides Catalogue | Bio Peptides UK",
    description: "23 research-grade peptides. 99%+ purity. Third-party CoA. Same-day UK dispatch.",
    url: "/compounds",
    type: "website",
  },
};

const SITE_URL = "https://shab-peptides-site.vercel.app";

export default async function CompoundsPage() {
  const compounds = await getCompounds();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research Peptides Catalogue",
    description: "Research-grade peptide catalogue from Bio Peptides UK.",
    url: `${SITE_URL}/compounds`,
    isPartOf: { "@type": "WebSite", name: "Bio Peptides", url: SITE_URL },
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
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Catalogue</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Research Peptides
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            Every peptide ships with a third-party certificate of analysis, same-day dispatch on orders before 2pm, and free UK delivery over £75. For research use only.
          </p>
        </div>
      </section>

      <CompoundGrid compounds={compounds} />

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
