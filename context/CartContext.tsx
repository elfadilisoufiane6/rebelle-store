"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, color: string, quantity?: number) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("rebelle-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rebelle-cart", JSON.stringify(items));
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addItem = useCallback(
    (product: Product, color: string, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.color === color
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.color === color
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, color, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, color: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.color === color))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
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
