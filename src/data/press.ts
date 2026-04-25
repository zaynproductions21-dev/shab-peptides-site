// Press releases — fetched from PublishOS CMS

export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  boilerplate: string;
  keywords: string[];
  distributionReady: boolean;
  createdAt: string;
}

const API_URL =
  "https://publishos.co.uk/api/press-release?clientId=cl_mo71hxje";

function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function mapApiRelease(p: Record<string, unknown>): PressRelease {
  const title = (p.title as string) || "Untitled";
  return {
    id: (p.id as string) || slugify(title),
    slug: slugify(title),
    title,
    subtitle: (p.subtitle as string) || "",
    body: (p.body as string) || "",
    boilerplate: (p.boilerplate as string) || "",
    keywords: Array.isArray(p.keywords) ? (p.keywords as string[]) : [],
    distributionReady: Boolean(p.distributionReady),
    createdAt: (p.createdAt as string) || "",
  };
}

export async function getPressReleases(): Promise<PressRelease[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    const releases = Array.isArray(data.data?.releases) ? data.data.releases : [];
    return releases
      .map(mapApiRelease)
      .sort((a: PressRelease, b: PressRelease) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  } catch {
    return [];
  }
}

export async function getPressReleaseBySlug(slug: string): Promise<PressRelease | undefined> {
  const all = await getPressReleases();
  return all.find((p) => p.slug === slug);
}
