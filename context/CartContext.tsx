"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProductBySlug, type Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  detailedItems: { product: Product; quantity: number }[];
};

const STORAGE_KEY = "iphone-eshop-cart";

/**
 * Small external store so the cart can be read with `useSyncExternalStore`.
 * This keeps localStorage (an external, client-only source) out of effects and
 * gives a stable empty snapshot during server rendering.
 */
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) items = parsed as CartItem[];
  } catch {
    // ignore corrupted storage
  }
}

function persist(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function setItems(next: CartItem[]): void {
  items = next;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  load();
  return items;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function addItem(slug: string, quantity = 1): void {
  const existing = items.find((i) => i.slug === slug);
  setItems(
    existing
      ? items.map((i) =>
          i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i,
        )
      : [...items, { slug, quantity }],
  );
}

function removeItem(slug: string): void {
  setItems(items.filter((i) => i.slug !== slug));
}

function updateQuantity(slug: string, quantity: number): void {
  setItems(
    quantity <= 0
      ? items.filter((i) => i.slug !== slug)
      : items.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
  );
}

function clear(): void {
  setItems(EMPTY);
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const detailedItems = useMemo(
    () =>
      current
        .map((item) => {
          const product = getProductBySlug(item.slug);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((v): v is { product: Product; quantity: number } => v !== null),
    [current],
  );

  const totalItems = useMemo(
    () => current.reduce((sum, i) => sum + i.quantity, 0),
    [current],
  );

  const totalPrice = useMemo(
    () =>
      detailedItems.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0,
      ),
    [detailedItems],
  );

  const value: CartContextValue = {
    items: current,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
    detailedItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart doit être utilisé dans un <CartProvider>");
  }
  return ctx;
}
