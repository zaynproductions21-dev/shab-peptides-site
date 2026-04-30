// FAQs — fetched from PublishOS CMS

export interface FAQItem {
  question: string;
  answer: string;
  keyword: string;
  internalLink: string;
}

const API_URL =
  "https://publishos-eosin.vercel.app/api/faq-hub?clientId=cl_mo71hxje";

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.data?.items || !Array.isArray(json.data.items)) return [];
    return json.data.items;
  } catch {
    return [];
  }
}
