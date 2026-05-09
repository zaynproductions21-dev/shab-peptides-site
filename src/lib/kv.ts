/**
 * Upstash KV REST helpers — minimal port of the publishos pattern.
 * Uses the same KV instance shared with publishos so they can read each other's keys.
 *
 * Required env vars in Vercel:
 *   KV_REST_API_URL    — Upstash Redis REST URL
 *   KV_REST_API_TOKEN  — Upstash Redis REST token (read+write scope)
 */

function creds() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("KV_REST_API_URL or KV_REST_API_TOKEN not set");
  return { url, token };
}

export async function kvGet<T = string>(key: string): Promise<T | null> {
  const { url, token } = creds();
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.result) return null;
  let val: unknown = data.result;
  for (let i = 0; i < 3; i++) {
    if (typeof val !== "string") break;
    try { val = JSON.parse(val); } catch { break; }
  }
  return val as T;
}

export async function kvSet(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  const { url, token } = creds();
  const body = typeof value === "string" ? value : JSON.stringify(value);
  const path = ttlSeconds ? `/set/${encodeURIComponent(key)}?EX=${ttlSeconds}` : `/set/${encodeURIComponent(key)}`;
  await fetch(`${url}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "text/plain" },
    body,
  });
}
