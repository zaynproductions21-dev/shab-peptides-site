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

/**
 * Atomically increment a counter and, on the first hit in the window, set its
 * TTL so it auto-resets. Returns the new count, or null if KV is unreachable.
 */
export async function kvIncr(key: string, ttlSeconds: number): Promise<number | null> {
  try {
    const { url, token } = creds();
    const res = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    const count = Number(data.result);
    if (!Number.isFinite(count)) return null;
    if (count === 1) {
      // First request in this window — arm the reset TTL.
      await fetch(`${url}/expire/${encodeURIComponent(key)}/${ttlSeconds}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
    }
    return count;
  } catch {
    return null;
  }
}

/**
 * Fixed-window rate limit backed by KV INCR. Returns true if the request is
 * ALLOWED, false once the limit is exceeded within the window.
 *
 * Fails OPEN (allows) when KV is unreachable — a KV outage must never take
 * checkout offline. The Turnstile CAPTCHA remains the hard gate; this is the
 * volume ceiling that stops SMS-pumping bots from hammering a single endpoint.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const count = await kvIncr(`rl:${key}`, windowSeconds);
  if (count === null) return true;
  return count <= limit;
}
