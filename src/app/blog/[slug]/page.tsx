import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBlogPosts, getBlogPostBySlug } from "@/data/blog";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

// Lightweight markdown-ish → HTML for our generated posts
function renderContent(md: string): string {
  return md
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/\[INTERNAL LINK: ([^\]]+)\]/g, '<a href="$1">Read more</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hpa])(.+)$/gm, "<p>$1</p>")
    .replace(/<p>(<h[1-6])/g, "$1")
    .replace(/(<\/h[1-6]>)<\/p>/g, "$1")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>META TITLE:.*?<\/p>/gi, "")
    .replace(/<p>META DESCRIPTION:.*?<\/p>/gi, "")
    .replace(/<p>TARGET KEYWORD:.*?<\/p>/gi, "");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const html = renderContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: { "@type": "Organization", name: "Premio Peptides" },
    publisher: {
      "@type": "Organization",
      name: "Premio Peptides",
      url: "https://premiopeptides.co.uk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://premiopeptides.co.uk/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navigation variant="editorial" />

      <article className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-editorial-muted">
            <Link href="/" className="hover:text-editorial-accent">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-editorial-accent">Blog</Link>
            <span>/</span>
            <span className="text-editorial-text font-medium truncate">{post.title}</span>
          </nav>

          {post.targetKeyword && (
            <span className="inline-block rounded-full bg-editorial-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent mb-4">
              {post.targetKeyword}
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            {post.title}
          </h1>

          {post.publishedAt && (
            <p className="mt-4 text-sm text-editorial-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}

          <div
            className="mt-8 prose prose-lg max-w-none [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-editorial-text [&>p]:leading-relaxed [&>p]:mb-4 [&_a]:text-editorial-accent [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      <Footer variant="editorial" />
    </>
  );
}
