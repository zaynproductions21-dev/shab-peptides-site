/**
 * Thin client for the PublishOS Premio-orders API.
 * Keeps every fetch server-side (never exposes the origin to browsers).
 */

const BASE = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

export interface PremioOrderItem {
  name: string;
  size: string;
  price: string;
  quantity: number;
}

export interface PremioDeliveryAddress {
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postcode: string;
  country: string;
  countryName: string;
}

export type PremioOrderStatus =
  | "pending"
  | "verified"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface PremioOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organisation: string;
  researchPurpose: string;
  items: PremioOrderItem[];
  total: string;
  invoiceUrl: string;
  status: PremioOrderStatus;
  createdAt: string;
  statusUpdatedAt: string;
  deliveryAddress?: PremioDeliveryAddress;
  royalMailTracking?: string;
  dispatchedAt?: string;
  trackingEmailSentAt?: string;
}

export async function listOrders(status?: PremioOrderStatus): Promise<PremioOrder[]> {
  const url = status
    ? `${BASE}/api/premio-order?status=${status}`
    : `${BASE}/api/premio-order`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`PublishOS orders ${res.status}`);
  const data = (await res.json()) as { orders?: PremioOrder[] };
  return data.orders || [];
}

export async function getOrder(orderId: string): Promise<PremioOrder | null> {
  const all = await listOrders();
  return all.find((o) => o.orderId === orderId) || null;
}

export async function patchOrder(
  orderId: string,
  body: Partial<Pick<PremioOrder, "status" | "royalMailTracking" | "dispatchedAt" | "trackingEmailSentAt">> & { notes?: string },
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${BASE}/api/premio-order/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  return { ok: !!data.ok, error: data.error };
}
