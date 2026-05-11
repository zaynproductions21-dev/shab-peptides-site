"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight address search using Nominatim (OpenStreetMap).
 * Free, no API key, ~1 req/sec rate limit (we debounce 400ms).
 *
 * Flow: user picks country → types address → suggestions appear →
 * pick one → fields populate → user can edit any field manually.
 */

export interface DeliveryAddress {
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postcode: string;
  country: string; // ISO alpha-2
  countryName: string;
}

const COUNTRIES: { code: string; name: string }[] = [
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "PT", name: "Portugal" },
  { code: "AT", name: "Austria" },
  { code: "CH", name: "Switzerland" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "PL", name: "Poland" },
  { code: "GR", name: "Greece" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "IL", name: "Israel" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "HK", name: "Hong Kong" },
  { code: "MY", name: "Malaysia" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "ZA", name: "South Africa" },
];

interface NominatimResult {
  display_name: string;
  address?: {
    house_number?: string;
    road?: string;
    house_name?: string;
    quarter?: string;
    suburb?: string;
    neighbourhood?: string;
    village?: string;
    town?: string;
    city?: string;
    state?: string;
    county?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

function countryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name || code;
}

function toAddress(r: NominatimResult, fallbackCountry: string): DeliveryAddress {
  const a = r.address || {};
  const houseAndRoad = [a.house_number, a.house_name, a.road].filter(Boolean).join(" ").trim();
  const line1 = houseAndRoad || a.neighbourhood || a.suburb || a.quarter || "";
  const city = a.city || a.town || a.village || a.suburb || a.county || "";
  const region = a.state || a.county || "";
  const postcode = a.postcode || "";
  const country = (a.country_code || fallbackCountry).toUpperCase();
  return {
    line1: line1.trim(),
    city: city.trim(),
    region: region.trim() || undefined,
    postcode: postcode.trim().toUpperCase(),
    country,
    countryName: a.country || countryName(country),
  };
}

interface Props {
  value: DeliveryAddress | null;
  onChange: (a: DeliveryAddress) => void;
}

export default function AddressSearch({ value, onChange }: Props) {
  const [country, setCountry] = useState(value?.country || "GB");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [line1, setLine1] = useState(value?.line1 || "");
  const [line2, setLine2] = useState(value?.line2 || "");
  const [city, setCity] = useState(value?.city || "");
  const [region, setRegion] = useState(value?.region || "");
  const [postcode, setPostcode] = useState(value?.postcode || "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Bubble field changes up to the parent
  useEffect(() => {
    if (line1 && city && postcode) {
      onChange({
        line1: line1.trim(),
        line2: line2.trim() || undefined,
        city: city.trim(),
        region: region.trim() || undefined,
        postcode: postcode.trim().toUpperCase(),
        country,
        countryName: countryName(country),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line1, line2, city, region, postcode, country]);

  // Close suggestions on click outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Debounced Nominatim search
  useEffect(() => {
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("q", query);
        url.searchParams.set("format", "json");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "6");
        url.searchParams.set("countrycodes", country.toLowerCase());
        const res = await fetch(url.toString(), {
          headers: { "Accept-Language": "en-GB,en" },
        });
        const data = (await res.json()) as NominatimResult[];
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, country]);

  function pick(r: NominatimResult) {
    const a = toAddress(r, country);
    setLine1(a.line1);
    setCity(a.city);
    setRegion(a.region || "");
    setPostcode(a.postcode);
    if (a.country && a.country !== country) setCountry(a.country);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }

  const inputCls =
    "w-full rounded-lg border border-editorial-border bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent";

  return (
    <div className="space-y-3">
      {/* Country + search row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setSuggestions([]);
          }}
          className={inputCls}
          aria-label="Country"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <div ref={wrapperRef} className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="Search address (start typing your postcode or street)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className={inputCls}
          />
          {searching && (
            <div className="absolute right-3 top-3 text-xs text-editorial-muted">…</div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-lg border border-editorial-border bg-white shadow-lg">
              {suggestions.map((r, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => pick(r)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-editorial-surface border-b border-editorial-border last:border-b-0"
                  >
                    {r.display_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Editable fields after pick (or manual entry) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Address line 1 *"
          required
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          className={`sm:col-span-2 ${inputCls}`}
        />
        <input
          type="text"
          placeholder="Address line 2 (optional)"
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          className={`sm:col-span-2 ${inputCls}`}
        />
        <input
          type="text"
          placeholder="City *"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Region / state / county"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Postcode / ZIP *"
          required
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
}
