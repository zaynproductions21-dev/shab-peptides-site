"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function OrderConfirmedPage() {
  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-16 lg:pt-32 bg-editorial-surface min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-editorial-accent/10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-editorial-accent">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-editorial-text">Order Received</h1>
          <p className="mt-4 text-editorial-muted leading-relaxed">
            Thank you for your order. We&rsquo;ve sent a confirmation to your email.
          </p>

          <div className="mt-6 rounded-xl bg-white border border-editorial-border p-6 text-left">
            <h2 className="font-serif text-lg font-bold text-editorial-accent mb-3">What happens next?</h2>
            <div className="space-y-3">
              {[
                { step: "1", text: "Check your email for the order confirmation" },
                { step: "2", text: "A team member will contact you via WhatsApp or phone within 60 minutes" },
                { step: "3", text: "We'll verify your research purpose and confirm availability" },
                { step: "4", text: "Payment details (bank transfer / BACS) provided on the call" },
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
