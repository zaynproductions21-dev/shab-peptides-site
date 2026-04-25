"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Compound } from "@/data/compounds";

interface CompoundGridProps {
  compounds: Compound[];
}

export default function CompoundGrid({ compounds }: CompoundGridProps) {
  const categories = ["All", ...Array.from(new Set(compounds.map((c) => c.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = compounds.filter((c) => {
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search + Filters */}
      <section className="py-6 bg-editorial-surface border-b border-editorial-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-editorial-muted">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search peptides by name, CAS, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-editorial-border bg-white pl-9 pr-4 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "border-editorial-accent bg-editorial-accent/10 text-editorial-accent"
                      : "border-editorial-border text-editorial-muted hover:border-editorial-accent/30 bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-editorial-muted">No peptides match your search. Try a different term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((compound) => (
                <Link
                  key={compound.slug}
                  href={`/compounds/${compound.slug}`}
                  className="group rounded-xl border border-editorial-border bg-white overflow-hidden hover:shadow-xl hover:border-editorial-accent/20 transition-all"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    {compound.image && (
                      <Image
                        src={compound.image}
                        alt={compound.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {/* Function labels — primary benefits */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                      {(compound.tags.length > 0 ? compound.tags.slice(0, 2) : [compound.category]).map((t) => (
                        <span key={t} className="rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-editorial-accent shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    {compound.badge && (
                      <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                        compound.badge === "Best Seller" ? "bg-editorial-accent" :
                        compound.badge === "Popular" ? "bg-editorial-green" :
                        compound.badge === "Value" ? "bg-editorial-green" :
                        "bg-editorial-warm"
                      }`}>{compound.badge}</span>
                    )}
                    <span className={`absolute top-3 right-3 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      compound.availability === "In Stock" ? "bg-editorial-green/90 text-white" :
                      compound.availability === "Made to Order" ? "bg-editorial-warm/90 text-white" :
                      "bg-editorial-accent/90 text-white"
                    }`}>{compound.availability}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold text-editorial-accent uppercase tracking-widest">{compound.category}</span>
                    <h2 className="mt-1 font-serif text-xl font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">{compound.name}</h2>
                    <p className="mt-2 text-sm text-editorial-muted leading-relaxed line-clamp-2">{compound.shortDescription}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 rounded bg-editorial-accent/10 px-2 py-0.5 font-semibold text-editorial-accent">{compound.purity} Pure</span>
                      <span className="font-mono text-editorial-muted">CAS: {compound.cas}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-editorial-border flex items-center justify-between">
                      <p className="text-xl font-bold text-editorial-accent">{compound.sizes[0]?.price}</p>
                      <span className="inline-flex items-center text-sm font-semibold text-editorial-accent group-hover:translate-x-1 transition-transform">
                        View Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <p className="mt-8 text-center text-xs text-editorial-muted">
            Showing {filtered.length} of {compounds.length} peptides
          </p>
        </div>
      </section>
    </>
  );
}
