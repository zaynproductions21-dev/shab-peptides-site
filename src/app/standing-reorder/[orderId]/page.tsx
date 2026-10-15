import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StandingReorderClient from "./Client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PUBLISHOS_ORIGIN = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

interface OrderShape {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ name: string; size: string; price: string; quantity: number }>;
  total: string;
  bundleKey?: string;
  bundleLabel?: string;
  bundleDiscountPct?: number;
  isStandingOrder?: boolean;
  standingOrderInterval?: string;
  nextReorderAt?: string;
  standingOrderCancelledAt?: string;
}

async function loadOrder(orderId: string): Promise<OrderShape | null> {
  try {
    const res = await fetch(`${PUBLISHOS_ORIGIN}/api/premio-order`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { orders?: OrderShape[] };
    return (data.orders || []).find((o) => o.orderId === orderId) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ orderId: string }> }): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Resupply order #${orderId} · Premio Peptides`,
    description: "Confirm, pause or cancel your Premio Peptides research standing order.",
    robots: { index: false, follow: false },
  };
}

export default async function StandingReorderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = await loadOrder(orderId);
  if (!order) notFound();
  if (!order.isStandingOrder) notFound();

  return (
    <>
      <Navigation variant="editorial" />
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-editorial-accent">Standing research order</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text">
            Resupply your {order.bundleLabel || "research bundle"}
          </h1>
          <p className="mt-2 text-editorial-muted">
            Reference <span className="font-mono text-editorial-text">#{order.orderId}</span> ·
            {order.standingOrderCancelledAt
              ? " cancelled on " + new Date(order.standingOrderCancelledAt).toLocaleDateString("en-GB")
              : " confirm the same bundle, skip a month, or cancel below."}
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <StandingReorderClient order={order} />
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
