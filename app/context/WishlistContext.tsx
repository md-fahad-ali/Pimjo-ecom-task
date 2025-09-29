"use client";
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from "react";

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
  const inFlightToggle = useRef<Set<number>>(new Set());
  const inFlightRemove = useRef<Set<number>>(new Set());

  const refresh = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleWishlist = useCallback(async (productId: number) => {
    if (inFlightToggle.current.has(productId)) return; // prevent duplicate concurrent toggles
    inFlightToggle.current.add(productId);
    
    // Optimistically update UI first
    const isCurrentlyInWishlist = items.some(item => item.productId === productId);
    
    if (isCurrentlyInWishlist) {
      // Remove from wishlist optimistically
      setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } else {
      // We need product data to add optimistically, so we'll fetch it from the API response
      // For now, just don't show loading state to make it feel instant
    }
    
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
      // Revert optimistic update on error
      refresh();
    } finally {
      inFlightToggle.current.delete(productId);
    }
  }, [items, refresh]);

  const removeFromWishlist = useCallback(async (productId: number) => {
    if (inFlightRemove.current.has(productId)) return; // prevent duplicate concurrent removes
    inFlightRemove.current.add(productId);
    
    // Optimistically remove from UI first
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    
    try {
      const res = await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to remove from wishlist";
      setError(message);
      // Revert optimistic update on error
      refresh();
    } finally {
      inFlightRemove.current.delete(productId);
    }
  }, [refresh]);

  const value = useMemo<WishlistContextType>(
    () => ({ items, loading, error, toggleWishlist, removeFromWishlist, refresh }),
    [items, loading, error, toggleWishlist, removeFromWishlist, refresh]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
