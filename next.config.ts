import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // First-party PostHog reverse proxy: analytics load from this site's own
  // /ingest path (no third party in the data path).
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
    ];
  },

  // 301: /goal-matcher sunset per LLM Council 2026-10-15 (compliance scrub).
  // The pre-existing 4-question Goal Matcher is superseded by /research-pathway;
  // keeping both live risked copy-drift between the "goal" and "pathway" surfaces,
  // and "goal" tracks consumer-health framing in regulator reads.
  async redirects() {
    return [
      { source: "/goal-matcher", destination: "/research-pathway", permanent: true },
      { source: "/goal-matcher/:path*", destination: "/research-pathway", permanent: true },
    ];
  },
};

export default nextConfig;
