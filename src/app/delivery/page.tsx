import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Delivery & Returns | Bio Peptides UK",
  description:
    "Same-day dispatch before 2pm. Next-day tracked UK delivery. Temperature-controlled packaging. Free delivery over £75. Returns policy for Bio Peptides.",
};

export default function DeliveryPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-editorial-accent uppercase tracking-wider mb-3">Shipping</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-text leading-[1.15]">
            Delivery &amp; Returns
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Delivery highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "2pm", label: "Same-Day Cut-Off" },
              { value: "Next Day", label: "UK Delivery" },
              { value: "£75+", label: "Free Delivery" },
              { value: "Tracked", label: "Every Order" },
            ].map((s) => (
              <div key={s.label} className="text-center rounded-xl border border-editorial-border bg-editorial-surface p-4">
                <p className="text-xl font-bold text-editorial-accent">{s.value}</p>
                <p className="text-xs text-editorial-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="text-editorial-muted leading-relaxed space-y-8">

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Same-Day Dispatch</h2>
              <p>Orders placed before 2pm on working days (Monday to Friday, excluding UK public holidays) are dispatched the same day. Orders placed after 2pm, or on weekends and bank holidays, are dispatched on the next available working day.</p>
              <p className="mt-2">All orders are dispatched from our UK fulfilment facility. There are no customs delays, import duties, or international transit times to factor in.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Delivery Options</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-editorial-border">
                      <th className="text-left py-3 pr-4 font-semibold text-editorial-text">Service</th>
                      <th className="text-left py-3 pr-4 font-semibold text-editorial-text">Timeframe</th>
                      <th className="text-left py-3 pr-4 font-semibold text-editorial-text">Cost</th>
                      <th className="text-left py-3 font-semibold text-editorial-text">Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="text-editorial-muted">
                    <tr className="border-b border-editorial-border/50">
                      <td className="py-3 pr-4 font-medium text-editorial-text">Standard UK Delivery</td>
                      <td className="py-3 pr-4">Next working day</td>
                      <td className="py-3 pr-4">£4.99 (free over £75)</td>
                      <td className="py-3">Full tracking</td>
                    </tr>
                    <tr className="border-b border-editorial-border/50">
                      <td className="py-3 pr-4 font-medium text-editorial-text">Express UK Delivery</td>
                      <td className="py-3 pr-4">Next working day (AM guaranteed)</td>
                      <td className="py-3 pr-4">£9.99</td>
                      <td className="py-3">Full tracking</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-editorial-text">Institutional / Bulk</td>
                      <td className="py-3 pr-4">Arranged per order</td>
                      <td className="py-3 pr-4">Quoted individually</td>
                      <td className="py-3">Full tracking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Temperature-Controlled Packaging</h2>
              <p>All peptides are dispatched in temperature-controlled packaging to maintain compound integrity during transit. Lyophilised products are shipped at ambient temperature with insulated packaging. Where products require cold-chain shipping, insulated containers with gel ice packs are used as standard at no additional cost.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Shipping Area</h2>
              <p>We currently ship to addresses within the United Kingdom only (England, Scotland, Wales, Northern Ireland). We do not offer international shipping at this time. For bulk or institutional orders requiring bespoke logistics, <a href="/contact" className="text-editorial-accent hover:text-editorial-accent-dark transition-colors">contact us</a> before placing your order.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Order Tracking</h2>
              <p>A tracking number is provided via email once your order has been dispatched. You can use this to monitor delivery progress directly with the courier. If you have not received a tracking notification within 24 hours of placing your order (during working days), contact us at <a href="mailto:research@biopeptides.co.uk" className="text-editorial-accent">research@biopeptides.co.uk</a> with your order reference.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Returns Policy</h2>
              <p>Due to the nature of research compounds and our obligation to maintain chain of custody and compound integrity, we cannot accept returns of products that have been opened or used.</p>
              <p className="mt-2"><strong className="text-editorial-text">We will accept returns or issue replacements/refunds where:</strong></p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The product received is damaged in transit</li>
                <li>The wrong product was dispatched</li>
                <li>The product does not match its accompanying certificate of analysis</li>
                <li>The product was not delivered</li>
              </ul>
              <p className="mt-2">Contact us within 7 days of delivery at <a href="mailto:research@biopeptides.co.uk" className="text-editorial-accent">research@biopeptides.co.uk</a> with your order reference number and a description of the issue. Include photographs where relevant. We aim to resolve all delivery issues within 2 working days.</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-editorial-text mb-3">Documentation</h2>
              <p>Every order includes a batch-specific certificate of analysis, a packing slip with order details, and compound handling information where applicable. Institutional clients receiving orders on invoice terms will receive a VAT invoice via email.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-editorial-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-editorial-muted mb-4">Order before 2pm for same-day dispatch. Every order fully tracked.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">Browse Peptide Catalogue</a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">Contact Us</a>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
