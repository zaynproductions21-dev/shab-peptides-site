import type { MetadataRoute } from "next";
import { getCompounds } from "@/data/compounds";
import { getBlogPosts } from "@/data/blog";
import { getPressReleases } from "@/data/press";

const SITE_URL = "https://premiopeptides.co.uk";

const STATIC_PATHS = [
  { path: "/", lastModified: "2026-05-01" },
  { path: "/compounds", lastModified: "2026-05-01" },
  { path: "/blog", lastModified: "2026-05-01" },
  { path: "/press", lastModified: "2026-05-01" },
  { path: "/quality", lastModified: "2026-04-25" },
  { path: "/guidelines", lastModified: "2026-04-25" },
  { path: "/about", lastModified: "2026-04-25" },
  { path: "/contact", lastModified: "2026-04-25" },
  { path: "/faq", lastModified: "2026-05-01" },
  { path: "/delivery", lastModified: "2026-04-25" },
  { path: "/institutional", lastModified: "2026-04-25" },
  { path: "/compliance", lastModified: "2026-04-25" },
  { path: "/terms", lastModified: "2026-04-25" },
  { path: "/privacy", lastModified: "2026-04-25" },
  { path: "/cookies", lastModified: "2026-04-25" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [compounds, blogPosts, pressReleases] = await Promise.all([
    getCompounds().catch(() => []),
    getBlogPosts().catch(() => []),
    getPressReleases().catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: new Date(p.lastModified),
  }));

  const productEntries: MetadataRoute.Sitemap = compounds.map((c) => ({
    url: `${SITE_URL}/compounds/${c.slug}`,
    lastModified: new Date("2026-05-01"),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date("2026-05-01"),
  }));

  const pressEntries: MetadataRoute.Sitemap = pressReleases.map((r) => ({
    url: `${SITE_URL}/press/${r.slug}`,
    lastModified: r.createdAt ? new Date(r.createdAt) : new Date("2026-05-01"),
  }));

  return [...staticEntries, ...productEntries, ...blogEntries, ...pressEntries];
}
