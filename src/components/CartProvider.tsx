"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
  slug: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
  image: string;
}

/**
 * Cart-level metadata used by the research-pathway subscription flow.
 * Lives alongside items in localStorage and is forwarded to /api/order so
 * PublishOS can persist the standing-order fields on the stored order.
 */
export interface CartMeta {
  standingOrder: boolean;
  standingOrderInterval?: "30d" | "90d";
  bundleKey?: string;        // e.g. "metabolic"
  bundleLabel?: string;      // e.g. "Metabolic Pathway"
  bundleDiscountPct?: number;
}

interface CartContextValue {
  items: CartItem[];
  meta: CartMeta;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setMeta: (next: CartMeta) => void;
  resetMeta: () => void;
  totalItems: number;
  totalPrice: string;
}

const DEFAULT_META: CartMeta = { standingOrder: false };
const META_KEY = "premio-peptides-cart-meta";

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [meta, setMetaState] = useState<CartMeta>(DEFAULT_META);
  const [loaded, setLoaded] = useState(false);

  // Load items + meta from localStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("premio-peptides-cart");
      if (storedItems) setItems(JSON.parse(storedItems));
      const storedMeta = localStorage.getItem(META_KEY);
      if (storedMeta) setMetaState({ ...DEFAULT_META, ...JSON.parse(storedMeta) });
    } catch {}
    setLoaded(true);
  }, []);

  // Save items on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("premio-peptides-cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  // Save meta on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(META_KEY, JSON.stringify(meta));
    }
  }, [meta, loaded]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.size === size ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setMetaState(DEFAULT_META);
  }, []);

  const setMeta = useCallback((next: CartMeta) => setMetaState(next), []);
  const resetMeta = useCallback(() => setMetaState(DEFAULT_META), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items
    .reduce((sum, i) => {
      const p = parseFloat(i.price.replace("£", "").replace("From ", ""));
      return sum + p * i.quantity;
    }, 0)
    .toFixed(2);

  return (
    <CartContext.Provider value={{
      items, meta,
      addItem, removeItem, updateQuantity, clearCart,
      setMeta, resetMeta,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}
