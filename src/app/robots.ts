import type { MetadataRoute } from "next";

const SITE_URL = "https://premiopeptides.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/cart", "/order-confirmed", "/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
