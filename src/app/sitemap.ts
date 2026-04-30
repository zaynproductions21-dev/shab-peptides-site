import type { MetadataRoute } from "next";
import { getCompounds } from "@/data/compounds";
import { getBlogPosts } from "@/data/blog";
import { getPressReleases } from "@/data/press";

const SITE_URL = "https://premiopeptides.com";

const STATIC_PATHS = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/compounds", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/press", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/quality", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/guidelines", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/delivery", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/institutional", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/compliance", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [compounds, blogPosts, pressReleases] = await Promise.all([
    getCompounds().catch(() => []),
    getBlogPosts().catch(() => []),
    getPressReleases().catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = compounds.map((c) => ({
    url: `${SITE_URL}/compounds/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const pressEntries: MetadataRoute.Sitemap = pressReleases.map((r) => ({
    url: `${SITE_URL}/press/${r.slug}`,
    lastModified: r.createdAt ? new Date(r.createdAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries, ...pressEntries];
}
