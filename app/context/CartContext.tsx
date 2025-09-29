"use client";
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: string; // formatted "$123.45"
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

export type CartContextType = CartState & {
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQty: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inFlightAdd = useRef<Set<number>>(new Set());

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load cart");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load cart";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear any cached cart data and refresh
    setItems([]);
    refresh();
  }, []);

  const addToCart = async (productId: number) => {
    if (inFlightAdd.current.has(productId)) return; // prevent duplicate concurrent adds
    inFlightAdd.current.add(productId);
    // Don't set loading state for add operations to prevent cart UI from showing loading
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }), // ensure first add is +1
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add to cart";
      setError(message);
    } finally {
      inFlightAdd.current.delete(productId);
    }
  };

  const updateQty = async (productId: number, quantity: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update cart";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to remove from cart";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<CartContextType>(
    () => ({ items, loading, error, addToCart, updateQty, removeFromCart, refresh }),
    [items, loading, error]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
