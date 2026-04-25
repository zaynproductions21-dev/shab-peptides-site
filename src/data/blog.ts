// Blog posts — fetched from PublishOS CMS

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  content: string;
  internalLinks: string[];
  publishedAt: string;
  question?: string;
}

const API_URL =
  "https://publishos.co.uk/api/blog-from-question?clientId=cl_mo71hxje";

function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function mapApiPost(p: Record<string, unknown>): BlogPost {
  const title = (p.title as string) || "Untitled";
  return {
    slug: slugify(title),
    title,
    metaTitle: (p.metaTitle as string) || title,
    metaDescription: (p.metaDescription as string) || "",
    targetKeyword: (p.targetKeyword as string) || "",
    content: (p.content as string) || "",
    internalLinks: Array.isArray(p.internalLinks) ? (p.internalLinks as string[]) : [],
    publishedAt: (p.humanisedAt as string) || (p.generatedAt as string) || "",
    question: p.question as string | undefined,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data.posts)) return [];
    return data.posts
      .map(mapApiPost)
      .sort((a: BlogPost, b: BlogPost) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug);
}
