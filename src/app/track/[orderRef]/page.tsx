import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PUBLISHOS_ORIGIN = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

interface Order {
  orderId: string;
  customerName: string;
  items: Array<{ name: string; size: string; quantity: number }>;
  total: string;
  status: string;
  royalMailTracking?: string;
  dispatchedAt?: string;
  deliveryAddress?: { city: string; postcode: string; countryName: string };
}

async function loadOrder(orderRef: string): Promise<Order | null> {
  try {
    const res = await fetch(`${PUBLISHOS_ORIGIN}/api/premio-order`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { orders?: Order[] };
    return (data.orders || []).find((o) => o.orderId === orderRef) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ orderRef: string }> }): Promise<Metadata> {
  const { orderRef } = await params;
  return {
    title: `Track order #${orderRef} · Premio Peptides`,
    description: "Track your Premio Peptides order dispatched via Royal Mail.",
    robots: { index: false, follow: false },
  };
}

export default async function TrackPage({ params }: { params: Promise<{ orderRef: string }> }) {
  const { orderRef } = await params;
  const order = await loadOrder(orderRef);
  if (!order) notFound();

  const dispatched = !!order.royalMailTracking;
  const rmUrl = dispatched
    ? `https://www.royalmail.com/track-your-item#/tracking-results/${encodeURIComponent(order.royalMailTracking!)}`
    : null;

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-editorial-accent">Order tracking</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text">
            Order #{order.orderId}
          </h1>
          <p className="mt-2 text-editorial-muted">
            {dispatched
              ? "Your order is on its way with Royal Mail."
              : "Your order is being prepared. We'll email you as soon as it's dispatched."}
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {dispatched ? (
            <div className="rounded-2xl border-2 border-editorial-accent bg-editorial-accent/5 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-editorial-accent">
                Royal Mail tracking number
              </p>
              <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-editorial-accent tracking-wide">
                {order.royalMailTracking}
              </p>
              {order.dispatchedAt && (
                <p className="mt-1 text-xs text-editorial-muted">
                  Dispatched {new Date(order.dispatchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
              <a
                href={rmUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-editorial-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-md"
              >
                Track on Royal Mail →
              </a>
              <p className="mt-3 text-xs text-editorial-muted">
                It can take up to 48 hours for a new tracking number to become live on Royal Mail's system.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-editorial-border bg-editorial-surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-editorial-accent animate-pulse" />
                <p className="text-sm font-semibold text-editorial-text">
                  Preparing your order
                </p>
              </div>
              <p className="mt-3 text-sm text-editorial-muted">
                We'll add a Royal Mail tracking number to this page as soon as your parcel is on its way — and email it to you.
              </p>
            </div>
          )}

          <div className="mt-8 rounded-xl border border-editorial-border bg-editorial-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-editorial-muted">In your order</p>
            <ul className="mt-3 space-y-2">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-editorial-text">
                    {i.name} <span className="text-editorial-muted">({i.size})</span>
                  </span>
                  <span className="text-editorial-muted">×{i.quantity}</span>
                </li>
              ))}
            </ul>
            {order.deliveryAddress && (
              <p className="mt-4 pt-3 border-t border-editorial-border text-xs text-editorial-muted">
                Delivering to {order.deliveryAddress.city}, {order.deliveryAddress.postcode}, {order.deliveryAddress.countryName}
              </p>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-editorial-muted">
              Questions? <Link href="/contact" className="text-editorial-accent hover:underline">Get in touch</Link>
            </p>
            <p className="mt-3 text-xs text-editorial-muted">
              For research use only. Not for human consumption.
            </p>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
