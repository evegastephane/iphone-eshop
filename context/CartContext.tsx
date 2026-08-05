"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getProductBySlug,
  getUnitPrice,
  type Product,
  type Selection,
} from "@/lib/products";

export type CartItem = {
  /** Unique per (slug + selected options). */
  key: string;
  slug: string;
  quantity: number;
  selection: Selection;
};

export type DetailedCartItem = {
  key: string;
  product: Product;
  quantity: number;
  selection: Selection;
  unitPrice: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (slug: string, selection: Selection, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  detailedItems: DetailedCartItem[];
};

const STORAGE_KEY = "iphone-eshop-cart";

function makeKey(slug: string, selection: Selection): string {
  return [slug, selection.screen, selection.storage, selection.color]
    .map((v) => v ?? "")
    .join("|");
}

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
    if (Array.isArray(parsed)) {
      items = (parsed as CartItem[]).filter(
        (i) => i && typeof i.slug === "string" && typeof i.key === "string",
      );
    }
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

function addItem(slug: string, selection: Selection, quantity = 1): void {
  const key = makeKey(slug, selection);
  const existing = items.find((i) => i.key === key);
  setItems(
    existing
      ? items.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
        )
      : [...items, { key, slug, quantity, selection }],
  );
}

function removeItem(key: string): void {
  setItems(items.filter((i) => i.key !== key));
}

function updateQuantity(key: string, quantity: number): void {
  setItems(
    quantity <= 0
      ? items.filter((i) => i.key !== key)
      : items.map((i) => (i.key === key ? { ...i, quantity } : i)),
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

  const detailedItems = useMemo<DetailedCartItem[]>(
    () =>
      current
        .map((item) => {
          const product = getProductBySlug(item.slug);
          if (!product) return null;
          const unitPrice = getUnitPrice(product, item.selection);
          return {
            key: item.key,
            product,
            quantity: item.quantity,
            selection: item.selection,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
          };
        })
        .filter((v): v is DetailedCartItem => v !== null),
    [current],
  );

  const totalItems = useMemo(
    () => current.reduce((sum, i) => sum + i.quantity, 0),
    [current],
  );

  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.lineTotal, 0),
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
