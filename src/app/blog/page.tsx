import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Research Peptide Blog | Bio Peptides UK",
  description:
    "Latest research, protocols, and product information from Bio Peptides. Long-form articles on peptide chemistry, storage, reconstitution, and emerging compounds.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Research Peptide Blog | Bio Peptides UK",
    description: "Long-form articles on peptide chemistry, storage, reconstitution, and emerging compounds.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Journal</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Research Peptide Blog
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            Long-form articles on peptide chemistry, storage, reconstitution, and emerging research compounds.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-editorial-muted mb-2">No articles published yet.</p>
              <p className="text-sm text-editorial-muted">Check back soon — new research is added regularly.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-editorial-border bg-white p-6 hover:shadow-lg hover:border-editorial-accent/20 transition-all"
                >
                  {post.targetKeyword && (
                    <span className="inline-block rounded-full bg-editorial-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent mb-3">
                      {post.targetKeyword}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">
                    {post.title}
                  </h2>
                  {post.metaDescription && (
                    <p className="mt-3 text-editorial-muted leading-relaxed line-clamp-3">{post.metaDescription}</p>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-editorial-muted">
                    {post.publishedAt && (
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    )}
                    <span className="ml-auto inline-flex items-center text-sm font-semibold text-editorial-accent group-hover:translate-x-1 transition-transform">
                      Read More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
