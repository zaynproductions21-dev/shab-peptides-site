"use client";

import { useState } from "react";

type Variant = "light" | "dark" | "minimal" | "editorial" | "bold" | "warm";

interface QuoteFormProps {
  variant?: Variant;
}

export default function QuoteForm({ variant = "light" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const styles: Record<Variant, { input: string; label: string; success: string; successHeading: string; successText: string; secondaryBtn: string }> = {
    light: {
      input: "bg-gray-50 border-gray-300 text-charcoal placeholder-gray-400 focus:border-primary",
      label: "text-charcoal",
      success: "bg-primary/5 border-primary/20",
      successHeading: "text-charcoal",
      successText: "text-gray-600",
      secondaryBtn: "border-gray-300 text-charcoal hover:bg-gray-50",
    },
    dark: {
      input: "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-primary",
      label: "text-zinc-300",
      success: "bg-zinc-900 border-zinc-800",
      successHeading: "text-zinc-100",
      successText: "text-zinc-400",
      secondaryBtn: "border-zinc-700 text-zinc-300 hover:bg-zinc-800",
    },
    minimal: {
      input: "bg-white border-gray-200 text-charcoal placeholder-gray-400 focus:border-primary",
      label: "text-gray-600",
      success: "bg-gray-50 border-gray-200",
      successHeading: "text-charcoal",
      successText: "text-gray-600",
      secondaryBtn: "border-gray-300 text-charcoal hover:bg-gray-50",
    },
    editorial: {
      input: "bg-cream border-editorial-border text-editorial-text placeholder-editorial-muted focus:border-editorial-accent",
      label: "text-editorial-text",
      success: "bg-cream border-editorial-border",
      successHeading: "text-editorial-text",
      successText: "text-editorial-muted",
      secondaryBtn: "border-editorial-border text-editorial-text hover:bg-cream-dark",
    },
    bold: {
      input: "bg-bold-surface border-bold-border text-white placeholder-bold-muted focus:border-bold-accent",
      label: "text-bold-accent-light",
      success: "bg-bold-surface border-bold-border",
      successHeading: "text-white",
      successText: "text-bold-muted",
      secondaryBtn: "border-bold-border text-bold-accent-light hover:bg-bold-bg",
    },
    warm: {
      input: "bg-warm-bg border-warm-border text-warm-text placeholder-warm-muted focus:border-warm-accent",
      label: "text-warm-text",
      success: "bg-warm-surface border-warm-border",
      successHeading: "text-warm-text",
      successText: "text-warm-muted",
      secondaryBtn: "border-warm-border text-warm-text hover:bg-warm-surface",
    },
  };

  const ctaStyles: Record<Variant, string> = {
    light: "bg-primary hover:bg-primary-dark",
    dark: "bg-primary hover:bg-primary-dark",
    minimal: "bg-primary hover:bg-primary-dark",
    editorial: "bg-editorial-accent hover:bg-editorial-accent-light",
    bold: "bg-bold-accent hover:bg-bold-accent-light",
    warm: "bg-warm-accent hover:bg-warm-accent-light",
  };

  // Logo-colour border on the form wrapper, per variant
  const wrapperStyles: Record<Variant, string> = {
    light: "border-2 border-primary/60 bg-white",
    dark: "border-2 border-primary/60 bg-zinc-950/40",
    minimal: "border-2 border-primary/60 bg-white",
    editorial: "border-2 border-editorial-accent/70 bg-white",
    bold: "border-2 border-bold-accent/70 bg-bold-bg/40",
    warm: "border-2 border-warm-accent/70 bg-warm-bg/40",
  };

  const s = styles[variant];
  const inputBase = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50";

  if (submitted) {
    return (
      <div className={`rounded-2xl p-8 text-center ${wrapperStyles[variant]}`}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lab-green/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lab-green">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold ${s.successHeading}`}>Enquiry Received</h3>
        <p className={`mt-2 text-sm ${s.successText}`}>
          Thank you for your enquiry. Our research team will review your requirements
          and respond within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className={`rounded-2xl p-6 sm:p-8 space-y-5 ${wrapperStyles[variant]}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input type="text" id="name" name="name" required placeholder="Dr. Jane Smith" className={`${inputBase} ${s.input}`} />
        </div>
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
            Institutional Email <span className="text-red-500">*</span>
          </label>
          <input type="email" id="email" name="email" required placeholder="j.smith@university.ac.uk" className={`${inputBase} ${s.input}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organisation" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
            Organisation <span className="text-red-500">*</span>
          </label>
          <input type="text" id="organisation" name="organisation" required placeholder="University of Cambridge" className={`${inputBase} ${s.input}`} />
        </div>
        <div>
          <label htmlFor="department" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
            Department
          </label>
          <input type="text" id="department" name="department" placeholder="Department of Pharmacology" className={`${inputBase} ${s.input}`} />
        </div>
      </div>

      <div>
        <label htmlFor="compound" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
          Compound(s) of Interest <span className="text-red-500">*</span>
        </label>
        <select id="compound" name="compound" required className={`${inputBase} ${s.input}`}>
          <option value="">Select a compound category</option>
          <option value="retatrutide">Retatrutide</option>
          <option value="glp1">GLP-1 Agonists</option>
          <option value="metabolic">Metabolic Research Compounds</option>
          <option value="custom">Custom Synthesis</option>
          <option value="multiple">Multiple Compounds</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
          Estimated Quantity
        </label>
        <input type="text" id="quantity" name="quantity" placeholder="e.g., 5mg, 10mg, bulk order" className={`${inputBase} ${s.input}`} />
      </div>

      <div>
        <label htmlFor="message" className={`block text-sm font-medium mb-1.5 ${s.label}`}>
          Research Requirements
        </label>
        <textarea id="message" name="message" rows={4} placeholder="Please describe your research requirements, including purity specifications, quantities, and any custom synthesis needs." className={`${inputBase} ${s.input}`} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${ctaStyles[variant]}`}
        >
          Request Research Quote
        </button>
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${s.secondaryBtn}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download Quality Certificates
        </button>
      </div>
    </form>
  );
}
