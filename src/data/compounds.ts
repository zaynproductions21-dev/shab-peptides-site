// ── Types ──────────────────────────────────────────
export interface CompoundSize {
  size: string;
  price: string;
}

export interface CompoundFaq {
  question: string;
  answer: string;
}

export interface MechanismStage {
  title: string;
  body: string;
  bullets: string[];
}

export interface ProductMechanism {
  sequence?: string;
  origin?: string;
  stages: MechanismStage[];
}

export interface Compound {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  purity: string;
  cas: string;
  molecularWeight: string;
  molecularFormula: string;
  sequence: string;
  availability: string;
  badge: string | null;
  shortDescription: string;
  description: string;
  researchApplications: string[];
  storageConditions: string;
  reconstitution: string;
  sizes: CompoundSize[];
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  faqs: CompoundFaq[];
  mechanism?: ProductMechanism;
}

// ── PublishOS API ──────────────────────────────────
const API_URL = "https://publishos.co.uk/api/products?clientId=cl_mo71hxje";

function mapApiProduct(p: Record<string, unknown>): Compound {
  const specs = (p.specs || {}) as Record<string, string>;
  const formatPrice = (v: unknown): string => {
    if (typeof v === "number") return `£${v.toFixed(2)}`;
    if (typeof v === "string") return v.startsWith("£") ? v : `£${v}`;
    return "£0.00";
  };
  const size = (p.weight as string) || "5mg";
  const sizes = Array.isArray(p.sizes) && p.sizes.length > 0
    ? (p.sizes as { size: string; price: string }[])
    : [{ size, price: formatPrice(p.price) }];

  return {
    slug: (p.slug as string) || "",
    name: (p.name as string) || "",
    category: (p.category as string) || "",
    tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
    purity: (p.purity as string) || specs.purity || "",
    cas: (p.casNumber as string) || (p.cas as string) || specs.cas || "",
    molecularWeight: (p.molecularWeight as string) || specs.molecularWeight || "",
    molecularFormula: (p.molecularFormula as string) || specs.molecularFormula || "",
    sequence: (p.sequence as string) || specs.sequence || "",
    availability: (p.inStock as boolean) !== false ? "In Stock" : "Made to Order",
    badge: (p.featured as boolean) ? "Best Seller" : (p.badge as string) || null,
    shortDescription: (p.shortDescription as string) || (p.description as string)?.slice(0, 150) || "",
    description: (p.description as string) || "",
    researchApplications: Array.isArray(p.researchApplications) ? p.researchApplications as string[] : [],
    storageConditions: (p.storage as string) || (p.storageConditions as string) || "",
    reconstitution: (p.solubility as string) || (p.reconstitution as string) || "",
    sizes,
    image: (p.imageUrl as string) || (p.image as string) || "",
    imageAlt: (p.imageAlt as string) || `${p.name} research peptide`,
    metaTitle: (p.metaTitle as string) || `${p.name} UK | Premio Peptides`,
    metaDescription: (p.metaDescription as string) || `Buy ${p.name} research peptide. ${p.purity || "99%+"} purity. Third-party CoA. Same-day UK dispatch.`,
    faqs: Array.isArray(p.faqs) ? p.faqs as CompoundFaq[] : Array.isArray(p.faq) ? p.faq as CompoundFaq[] : [],
    mechanism: (p.mechanism as ProductMechanism | undefined) || undefined,
  };
}

// ── Fetch from API with fallback to static data ───
export async function getCompounds(): Promise<Compound[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      return data.products.map(mapApiProduct);
    }
  } catch (e) {
    console.warn("PublishOS API unavailable, using static data:", e);
  }
  return staticCompounds;
}

export async function getFeaturedCompounds(limit = 6): Promise<Compound[]> {
  try {
    const res = await fetch(`${API_URL}&featured=true`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        return data.products.slice(0, limit).map(mapApiProduct);
      }
    }
  } catch {}
  const all = await getCompounds();
  const featured = all.filter((c) => c.badge === "Best Seller" || c.badge === "Popular");
  return (featured.length >= limit ? featured : all).slice(0, limit);
}

export async function getCompoundBySlug(slug: string): Promise<Compound | undefined> {
  // Try API single-product endpoint first
  try {
    const res = await fetch(`${API_URL}&slug=${slug}`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      const products = data.products || (data.product ? [data.product] : []);
      if (products.length > 0) return mapApiProduct(products[0]);
    }
  } catch {}
  // Fallback to full list
  const all = await getCompounds();
  return all.find((c) => c.slug === slug);
}

// ── Static fallback (empty — CMS is source of truth) ──
const staticCompounds: Compound[] = [];
