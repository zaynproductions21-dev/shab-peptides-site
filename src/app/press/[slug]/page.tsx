import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPressReleases, getPressReleaseBySlug } from "@/data/press";

export async function generateStaticParams() {
  const releases = await getPressReleases();
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: `${release.title} | Premio Peptides Press`,
    description: release.subtitle || release.body.slice(0, 155),
    alternates: { canonical: `/press/${release.slug}` },
    openGraph: {
      title: release.title,
      description: release.subtitle,
      url: `/press/${release.slug}`,
      type: "article",
    },
  };
}

export default async function PressReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <>
      <Navigation variant="editorial" />

      <article className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs text-editorial-muted">
            <Link href="/" className="hover:text-editorial-accent">Home</Link>
            <span>/</span>
            <Link href="/press" className="hover:text-editorial-accent">Press</Link>
            <span>/</span>
            <span className="text-editorial-text font-medium truncate">{release.title}</span>
          </nav>

          <span className="inline-block rounded-full bg-editorial-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent mb-4">
            Press Release
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            {release.title}
          </h1>

          {release.subtitle && (
            <p className="mt-4 text-lg text-editorial-muted leading-relaxed">{release.subtitle}</p>
          )}

          {release.createdAt && (
            <p className="mt-3 text-sm text-editorial-muted">
              {new Date(release.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}

          <div className="mt-8 whitespace-pre-line text-editorial-text leading-relaxed">
            {release.body}
          </div>

          {release.boilerplate && (
            <div className="mt-12 pt-8 border-t border-editorial-border">
              <p className="text-xs font-semibold text-editorial-muted uppercase tracking-wider mb-3">About</p>
              <p className="text-sm text-editorial-muted leading-relaxed whitespace-pre-line">{release.boilerplate}</p>
            </div>
          )}

          {release.keywords.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {release.keywords.map((kw) => (
                <span key={kw} className="inline-flex items-center rounded-full bg-editorial-surface px-3 py-1 text-xs text-editorial-muted">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <Footer variant="editorial" />
    </>
  );
}
