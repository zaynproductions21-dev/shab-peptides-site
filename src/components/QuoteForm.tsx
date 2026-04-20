"use client";

import { useState } from "react";

interface QuoteFormProps {
  variant?: "light" | "dark" | "minimal";
}

export default function QuoteForm({ variant = "light" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isDark = variant === "dark";
  const isMinimal = variant === "minimal";

  const inputBase = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50";
  const inputClass = isDark
    ? `${inputBase} bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-primary`
    : isMinimal
      ? `${inputBase} bg-white border-gray-200 text-charcoal placeholder-gray-400 focus:border-primary`
      : `${inputBase} bg-gray-50 border-gray-300 text-charcoal placeholder-gray-400 focus:border-primary`;
  const labelClass = isDark
    ? "block text-sm font-medium text-zinc-300 mb-1.5"
    : isMinimal
      ? "block text-sm font-medium text-gray-600 mb-1.5"
      : "block text-sm font-medium text-charcoal mb-1.5";

  if (submitted) {
    return (
      <div className={`rounded-xl p-8 text-center ${isDark ? "bg-zinc-900 border border-zinc-800" : isMinimal ? "bg-gray-50 border border-gray-200" : "bg-primary/5 border border-primary/20"}`}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lab-green/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lab-green">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold ${isDark ? "text-zinc-100" : "text-charcoal"}`}>
          Enquiry Received
        </h3>
        <p className={`mt-2 text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}>
          Thank you for your enquiry. Our research team will review your requirements
          and respond within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Dr. Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Institutional Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="j.smith@university.ac.uk"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organisation"
            name="organisation"
            required
            placeholder="University of Cambridge"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="department" className={labelClass}>
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            placeholder="Department of Pharmacology"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="compound" className={labelClass}>
          Compound(s) of Interest <span className="text-red-500">*</span>
        </label>
        <select
          id="compound"
          name="compound"
          required
          className={inputClass}
        >
          <option value="">Select a compound category</option>
          <option value="retatrutide">Retatrutide</option>
          <option value="glp1">GLP-1 Agonists</option>
          <option value="metabolic">Metabolic Research Compounds</option>
          <option value="custom">Custom Synthesis</option>
          <option value="multiple">Multiple Compounds</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className={labelClass}>
          Estimated Quantity
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="e.g., 5mg, 10mg, bulk order"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Research Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Please describe your research requirements, including purity specifications, quantities, and any custom synthesis needs."
          className={inputClass}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          Request Research Quote
        </button>
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
            isDark
              ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              : "border-gray-300 text-charcoal hover:bg-gray-50"
          }`}
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
