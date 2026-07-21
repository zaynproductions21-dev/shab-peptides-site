import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReviewForm, { type ReviewableProduct } from "@/components/ReviewForm";
import { getOrder } from "@/lib/publishos-orders";
import { getCompounds } from "@/data/compounds";

export const metadata: Metadata = {
  title: "Leave a Review | Premio Peptides",
  robots: { index: false, follow: false },
};

// Reviews are keyed to a live order, so never prerender.
export const dynamic = "force-dynamic";

export default async function ReviewPage({ params }: { params: Promise<{ orderRef: string }> }) {
  const { orderRef } = await params;
  const order = await getOrder(orderRef);

  // Build the reviewable-product list by matching order items to real
  // compounds (so we submit the canonical slug, not a guessed one).
  let products: ReviewableProduct[] = [];
  if (order) {
    const compounds = await getCompounds();
    const seen = new Set<string>();
    for (const item of order.items) {
      const compound = compounds.find(
        (c) => c.name.trim().toLowerCase() === item.name.trim().toLowerCase(),
      );
      const slug = compound?.slug;
      const name = compound?.name || item.name;
      if (!slug || seen.has(slug)) continue; // one review card per distinct product
      seen.add(slug);
      products.push({ slug, name });
    }
  }

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 bg-editorial-surface min-h-[60vh]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          {!order ? (
            <div className="text-center">
              <h1 className="font-serif text-3xl font-bold text-editorial-text">Order not found</h1>
              <p className="mt-4 text-editorial-muted leading-relaxed">
                We couldn&rsquo;t find an order with reference{" "}
                <span className="font-mono font-semibold">{orderRef}</span>. Please use the link
                from your dispatch email, or{" "}
                <Link href="/contact" className="text-editorial-accent underline">
                  contact us
                </Link>{" "}
                if you think this is a mistake.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center">
              <h1 className="font-serif text-3xl font-bold text-editorial-text">Nothing to review yet</h1>
              <p className="mt-4 text-editorial-muted leading-relaxed">
                We couldn&rsquo;t match the items on order{" "}
                <span className="font-mono font-semibold">{orderRef}</span> to our current catalogue.
                Please{" "}
                <Link href="/contact" className="text-editorial-accent underline">
                  get in touch
                </Link>{" "}
                and we&rsquo;ll sort it out.
              </p>
            </div>
          ) : (
            <>
              <header className="text-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-editorial-text">
                  How was your order?
                </h1>
                <p className="mt-3 text-editorial-muted leading-relaxed">
                  Your feedback helps other researchers. Reviews are checked before they&rsquo;re
                  published — please keep them factual and about product quality, purity and service.
                </p>
                <p className="mt-2 text-xs text-editorial-muted/80">
                  Order <span className="font-mono">{orderRef}</span> · Verified buyer
                </p>
              </header>

              <ReviewForm orderRef={orderRef} products={products} />
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
