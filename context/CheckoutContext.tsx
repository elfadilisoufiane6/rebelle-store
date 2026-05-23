"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";

export type OrderItem = {
  slug: string;
  name: string;
  offer: string;
  qty: number;
  price: number;
  image: string;
};

export type CompletedOrder = {
  orderId: string;
  name: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  upsellAccepted: boolean;
  upsellItem: OrderItem | null;
  total: number;
  createdAt: string;
};

type CheckoutContextType = {
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  isUpsellOpen: boolean;
  upsellProduct: Product | null;
  openUpsell: (product: Product) => void;
  closeUpsell: () => void;

  activeOrder: CompletedOrder | null;
  setActiveOrder: (order: CompletedOrder | null) => void;
  acceptUpsell: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

const ORDER_STORAGE_KEY = "rebelle-last-order";

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isUpsellOpen, setUpsellOpen] = useState(false);
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null);
  const [activeOrder, setActiveOrderState] = useState<CompletedOrder | null>(
    null
  );

  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const openUpsell = useCallback((product: Product) => {
    setUpsellProduct(product);
    setUpsellOpen(true);
  }, []);

  const closeUpsell = useCallback(() => {
    setUpsellOpen(false);
  }, []);

  const setActiveOrder = useCallback((order: CompletedOrder | null) => {
    setActiveOrderState(order);
    if (typeof window !== "undefined") {
      if (order) {
        try {
          localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
        } catch {}
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    }
  }, []);

  const acceptUpsell = useCallback(() => {
    if (!activeOrder || !upsellProduct) return;
    const upsellItem: OrderItem = {
      slug: upsellProduct.slug,
      name: upsellProduct.shortName,
      offer: "1 sac (offre spéciale)",
      qty: 1,
      price: 469,
      image: upsellProduct.images[0],
    };
    const updated: CompletedOrder = {
      ...activeOrder,
      upsellAccepted: true,
      upsellItem,
      total: activeOrder.subtotal + 469,
    };
    setActiveOrderState(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
    }
  }, [activeOrder, upsellProduct]);

  return (
    <CheckoutContext.Provider
      value={{
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        isUpsellOpen,
        upsellProduct,
        openUpsell,
        closeUpsell,
        activeOrder,
        setActiveOrder,
        acceptUpsell,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx)
    throw new Error("useCheckout must be used inside CheckoutProvider");
  return ctx;
}

export function loadStoredOrder(): CompletedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CompletedOrder;
  } catch {
    return null;
  }
}

export function clearStoredOrder() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ORDER_STORAGE_KEY);
}
