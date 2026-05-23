"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { OfferKey, OFFERS, Product, getProduct } from "@/lib/products";

export type CartItem = {
  slug: string;
  offer: OfferKey;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, offer?: OfferKey) => void;
  removeItem: (slug: string) => void;
  updateOffer: (slug: string, offer: OfferKey) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  hasSlug: (slug: string) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "rebelle-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        const cleaned = parsed.filter(
          (item) => getProduct(item.slug) && OFFERS[item.offer]
        );
        setItems(cleaned);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const count = items.reduce((sum, item) => sum + OFFERS[item.offer].qty, 0);
  const total = items.reduce((sum, item) => sum + OFFERS[item.offer].price, 0);

  const addItem = useCallback((product: Product, offer: OfferKey = "2pieces") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, offer } : i
        );
      }
      return [...prev, { slug: product.slug, offer }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateOffer = useCallback((slug: string, offer: OfferKey) => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, offer } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const hasSlug = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateOffer,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        hasSlug,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
