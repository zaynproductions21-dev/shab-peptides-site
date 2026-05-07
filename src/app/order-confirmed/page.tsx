"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface SavedOrder {
  orderRef?: string;
  invoiceUrl?: string;
  whatsappUrl?: string;
  total?: string;
  customerName?: string;
  savedAt?: string;
}

const STORAGE_KEY = "premio:lastOrder";

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedOrder;
      // Only show if saved within the last hour (avoid stale data on revisit)
      const ts = parsed.savedAt ? Date.parse(parsed.savedAt) : 0;
      if (Date.now() - ts < 60 * 60 * 1000) setOrder(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 bg-editorial-surface min-h-[60vh]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-editorial-accent/10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-editorial-accent" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-editorial-text">
            Order Received{order?.customerName ? `, ${order.customerName.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-4 text-editorial-muted leading-relaxed">
            Thank you for your order. We&rsquo;ve sent a confirmation to your email.
          </p>

          {/* Save Your Invoice card — only when we have invoice URL */}
          {order?.invoiceUrl && (
            <div className="mt-8 rounded-xl border-2 border-editorial-accent/30 bg-white p-6 text-left shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-editorial-accent mt-1 shrink-0" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                <div>
                  <h2 className="font-serif text-lg font-bold text-editorial-text leading-tight">Save your invoice</h2>
                  <p className="mt-1 text-sm text-editorial-muted">
                    Order ref <span className="font-mono font-semibold text-editorial-text">#{order.orderRef}</span>
                    {order.total ? <> · Total <span className="font-semibold text-editorial-text">£{order.total}</span></> : null}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-editorial-accent px-4 py-3 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  View / Download Invoice
                </a>
                {order.whatsappUrl && (
                  <a
                    href={order.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#20BD5A] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Re-open WhatsApp
                  </a>
                )}
              </div>

              <p className="mt-3 text-[11px] text-editorial-muted leading-relaxed">
                Bookmark or save this invoice link — it works permanently. Bank details are sent separately after the verification call.
              </p>
            </div>
          )}

          <div className="mt-8 rounded-xl bg-white border border-editorial-border p-6 text-left">
            <h2 className="font-serif text-lg font-bold text-editorial-accent mb-3">What happens next?</h2>
            <div className="space-y-3">
              {[
                { step: "1", text: "Check your email for the order confirmation" },
                { step: "2", text: "A team member will contact you via WhatsApp or phone within 60 minutes" },
                { step: "3", text: "We'll verify your research purpose and confirm availability" },
                { step: "4", text: "Bank details (BACS) sent separately after verification — never on the invoice" },
                { step: "5", text: "Once verified, your order dispatches same-day (before 2pm)" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-editorial-accent text-white text-xs font-bold">
                    {item.step}
                  </div>
                  <p className="text-sm text-editorial-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-3">
            <p className="text-[11px] text-editorial-accent leading-relaxed">
              All compounds are supplied strictly for in vitro research use only. Orders are subject to research verification. BELL RED LIMITED (trading as Premio Peptides), Company No. 12841067.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
              Continue Browsing
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-editorial-border px-7 py-3.5 text-sm font-medium text-editorial-text hover:bg-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
