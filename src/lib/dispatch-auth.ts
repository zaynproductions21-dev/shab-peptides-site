import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "premio_dispatch";
const SESSION_HOURS = 12;

function secret(): string {
  const s = process.env.DISPATCH_SESSION_SECRET?.trim();
  if (!s) throw new Error("DISPATCH_SESSION_SECRET not set");
  return s;
}

function pin(): string {
  const p = process.env.DISPATCH_PIN?.trim();
  if (!p) throw new Error("DISPATCH_PIN not set");
  return p;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function verifyPin(candidate: string): boolean {
  const expected = pin();
  if (candidate.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function mintSession(): { name: string; value: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = `v1.${expiresAt}`;
  const sig = sign(payload);
  return {
    name: COOKIE_NAME,
    value: `${payload}.${sig}`,
    maxAge: SESSION_HOURS * 3600,
  };
}

export function clearSession(): { name: string; value: string; maxAge: number } {
  return { name: COOKIE_NAME, value: "", maxAge: 0 };
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [v, expiresAt, providedSig] = parts;
  if (v !== "v1") return false;
  const exp = parseInt(expiresAt, 10);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = sign(`${v}.${expiresAt}`);
  try {
    return timingSafeEqual(Buffer.from(providedSig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export const DISPATCH_COOKIE = COOKIE_NAME;
