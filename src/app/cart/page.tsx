"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

const WHATSAPP_NUMBER = "447000000000";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", organisation: "", researchPurpose: "" });

  function buildWhatsAppMessage() {
    if (items.length === 0) return "";
    let msg = `Hi Premio Peptides, I'd like to place an order.\n\nName: ${form.name}\nOrganisation: ${form.organisation}\nResearch Purpose: ${form.researchPurpose}\n\nItems:\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (${item.size}) × ${item.quantity} — ${item.price}\n`;
    });
    msg += `\nTotal: £${totalPrice}\n\nPlease confirm availability and payment details.`;
    return encodeURIComponent(msg);
  }

  async function handleSubmitOrder() {
    if (!form.name || !form.email || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items, total: totalPrice }),
      });
      clearCart();
      router.push("/order-confirmed");
    } catch {
      alert("Something went wrong. Please try again or order via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-editorial-border bg-white px-4 py-3 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent transition-colors";

  return (
    <>
      <Navigation variant="editorial" />

      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-editorial-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-text">
            {step === "cart" ? "Your Basket" : "Checkout — Your Details"}
          </h1>
          <p className="mt-2 text-editorial-muted">
            {totalItems === 0
              ? "Your basket is empty."
              : step === "cart"
                ? `${totalItems} item${totalItems !== 1 ? "s" : ""} in your basket`
                : "We need your details to process and verify your order."}
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-white min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 && step === "cart" ? (
            <div className="text-center py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-editorial-surface">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-editorial-muted">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
              </div>
              <p className="text-editorial-muted mb-6">Your basket is empty. Browse our peptide catalogue to get started.</p>
              <Link href="/compounds" className="inline-flex items-center justify-center rounded-lg bg-editorial-accent px-7 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-sm">
                Browse Peptides
              </Link>
            </div>
          ) : step === "cart" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex gap-4 rounded-xl border border-editorial-border bg-white p-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/compounds/${item.slug}`} className="font-serif text-base font-bold text-editorial-text hover:text-editorial-accent transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-xs text-editorial-muted mt-0.5">Size: {item.size}</p>
                        </div>
                        <p className="text-lg font-bold text-editorial-accent">{item.price}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-editorial-border hover:bg-editorial-surface transition-colors text-editorial-text">−</button>
                          <span className="w-8 text-center text-sm font-semibold text-editorial-text">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-editorial-border hover:bg-editorial-surface transition-colors text-editorial-text">+</button>
                        </div>
                        <button onClick={() => removeItem(item.slug, item.size)} className="text-xs text-editorial-muted hover:text-red-500 transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary sidebar */}
              <div>
                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6 sticky top-24">
                  <h2 className="font-serif text-lg font-bold text-editorial-text mb-4">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={`${item.slug}-${item.size}`} className="flex justify-between text-editorial-muted">
                        <span className="truncate pr-2">{item.name} ({item.size}) ×{item.quantity}</span>
                        <span className="shrink-0">£{(parseFloat(item.price.replace("£", "").replace("From ", "")) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-editorial-border">
                      <div className="flex justify-between">
                        <span className="text-editorial-muted">Delivery</span>
                        <span className="font-medium text-editorial-text">{parseFloat(totalPrice) >= 75 ? "Free" : "£4.99"}</span>
                      </div>
                    </div>
                    <div className="pt-3 mt-1 border-t border-editorial-border flex justify-between">
                      <span className="font-semibold text-editorial-text">Total</span>
                      <span className="text-xl font-bold text-editorial-accent">£{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("details")}
                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-editorial-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-md shadow-editorial-accent/20"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-3 text-center">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#25D366] hover:underline"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Or order via WhatsApp
                    </a>
                  </div>

                  <button onClick={clearCart} className="mt-3 w-full text-center text-xs text-editorial-muted hover:text-red-500 transition-colors py-1">
                    Clear Basket
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Customer details form */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <button onClick={() => setStep("cart")} className="inline-flex items-center text-sm text-editorial-muted hover:text-editorial-accent transition-colors mb-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to basket
                </button>

                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6 lg:p-8">
                  <h2 className="font-serif text-xl font-bold text-editorial-text mb-6">Your Details</h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-editorial-text mb-1.5">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="Dr. Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-editorial-text mb-1.5">Email <span className="text-red-500">*</span></label>
                        <input type="email" required placeholder="j.smith@university.ac.uk" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-editorial-text mb-1.5">Phone / WhatsApp <span className="text-red-500">*</span></label>
                        <input type="tel" required placeholder="+44 7700 000000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-editorial-text mb-1.5">Organisation <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="University of Cambridge" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-editorial-text mb-1.5">Research Purpose <span className="text-red-500">*</span></label>
                      <textarea rows={3} required placeholder="Briefly describe your research application and intended use for these compounds." value={form.researchPurpose} onChange={(e) => setForm({ ...form, researchPurpose: e.target.value })} className={inputClass} />
                    </div>

                    {/* Research verification notice */}
                    <div className="rounded-lg bg-editorial-accent/5 border border-editorial-accent/15 p-4">
                      <p className="text-sm text-editorial-accent leading-relaxed">
                        <strong>Research verification required.</strong> By placing this order you confirm:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-editorial-accent/80">
                        <li className="flex items-start gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0"><path d="M5 13l4 4L19 7" /></svg>
                          All compounds will be used solely for lawful in vitro research
                        </li>
                        <li className="flex items-start gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0"><path d="M5 13l4 4L19 7" /></svg>
                          You are affiliated with a legitimate research institution or organisation
                        </li>
                        <li className="flex items-start gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0"><path d="M5 13l4 4L19 7" /></svg>
                          You are 18 years or older
                        </li>
                        <li className="flex items-start gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 shrink-0"><path d="M5 13l4 4L19 7" /></svg>
                          You consent to research verification via phone or WhatsApp within 60 minutes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar summary */}
              <div>
                <div className="rounded-xl border border-editorial-border bg-editorial-surface p-6 sticky top-24">
                  <h2 className="font-serif text-lg font-bold text-editorial-text mb-4">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={`${item.slug}-${item.size}`} className="flex justify-between text-editorial-muted">
                        <span className="truncate pr-2">{item.name} ({item.size}) ×{item.quantity}</span>
                        <span className="shrink-0">£{(parseFloat(item.price.replace("£", "").replace("From ", "")) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-editorial-border flex justify-between">
                      <span className="font-semibold text-editorial-text">Total</span>
                      <span className="text-xl font-bold text-editorial-accent">£{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={submitting || !form.name || !form.email || !form.phone || !form.organisation || !form.researchPurpose}
                    className="mt-6 flex w-full items-center justify-center rounded-lg bg-editorial-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors shadow-md shadow-editorial-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Place Order"}
                  </button>

                  <div className="mt-3 text-center">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#25D366] hover:underline"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Or order via WhatsApp instead
                    </a>
                  </div>

                  <p className="mt-4 text-[10px] text-editorial-muted text-center leading-relaxed">
                    Payment by bank transfer (BACS). No card payment required. Details provided after verification.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer variant="editorial" />
    </>
  );
}
