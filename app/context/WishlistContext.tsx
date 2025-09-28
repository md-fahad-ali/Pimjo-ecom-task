"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type WishlistItem = {
  productId: number;
  name: string;
  price: string; // formatted
  image: string;
};

export type WishlistState = {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
};

export type WishlistContextType = WishlistState & {
  toggleWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wishlist", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load wishlist");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load wishlist";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const toggleWishlist = async (productId: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to update wishlist");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update wishlist";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to remove from wishlist";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<WishlistContextType>(
    () => ({ items, loading, error, toggleWishlist, removeFromWishlist, refresh }),
    [items, loading, error]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
