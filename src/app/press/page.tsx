import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPressReleases } from "@/data/press";

export const metadata: Metadata = {
  title: "Press Releases | Premio Peptides UK",
  description:
    "Official press releases and company announcements from Premio Peptides — UK's research peptide supplier. Distribution-ready statements for journalists and partners.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press Releases | Premio Peptides UK",
    description: "Official press releases and company announcements from Premio Peptides.",
    url: "/press",
    type: "website",
  },
};

export default async function PressIndexPage() {
  const releases = await getPressReleases();

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Newsroom</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Press Releases
          </h1>
          <p className="mt-4 text-editorial-muted max-w-2xl">
            Official announcements, product launches, and company news. For media enquiries, contact our team via the contact page.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {releases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-editorial-muted mb-2">No press releases published yet.</p>
              <p className="text-sm text-editorial-muted">Subscribe via the contact page to be notified of new announcements.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {releases.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/press/${rel.slug}`}
                  className="group block rounded-xl border border-editorial-border bg-white p-6 hover:shadow-lg hover:border-editorial-accent/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block rounded-full bg-editorial-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent">
                      Press Release
                    </span>
                    {rel.distributionReady && (
                      <span className="inline-block rounded-full bg-editorial-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-green">
                        Distribution Ready
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">
                    {rel.title}
                  </h2>
                  {rel.subtitle && (
                    <p className="mt-2 text-editorial-muted leading-relaxed">{rel.subtitle}</p>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-editorial-muted">
                    {rel.createdAt && (
                      <span>{new Date(rel.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    )}
                    <span className="ml-auto inline-flex items-center text-sm font-semibold text-editorial-accent group-hover:translate-x-1 transition-transform">
                      Read Release
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
