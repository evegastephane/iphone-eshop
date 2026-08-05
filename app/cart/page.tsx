"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, selectionLabels } from "@/lib/products";

export default function CartPage() {
  const { detailedItems, updateQuantity, removeItem, clear, totalPrice } =
    useCart();

  if (detailedItems.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <span className="text-6xl" aria-hidden>
          🛒
        </span>
        <h1 className="text-2xl font-semibold">Votre panier est vide</h1>
        <p className="text-zinc-500">
          Parcourez la boutique pour trouver votre prochain appareil.
        </p>
        <Link
          href="/products"
          className="mt-2 flex h-12 items-center justify-center rounded-full bg-black px-8 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 5;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Panier</h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-zinc-500 hover:text-red-600"
        >
          Vider le panier
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ul className="lg:col-span-2 divide-y divide-black/[.08] rounded-2xl border border-black/[.08] bg-white dark:divide-white/[.12] dark:border-white/[.12] dark:bg-zinc-900">
          {detailedItems.map(({ key, product, quantity, selection, unitPrice, lineTotal }) => {
            const labels = selectionLabels(product, selection);
            return (
            <li key={key} className="flex items-center gap-4 p-4">
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-zinc-100 text-3xl dark:bg-zinc-800">
                <span aria-hidden>{product.emoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-medium hover:underline"
                >
                  {product.name}
                </Link>
                {labels.length > 0 && (
                  <p className="text-xs text-zinc-500">{labels.join(" · ")}</p>
                )}
                <p className="text-sm text-zinc-500">
                  {formatPrice(unitPrice)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => updateQuantity(key, quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[.15] dark:border-white/[.2]"
                >
                  −
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => updateQuantity(key, quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[.15] dark:border-white/[.2]"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-medium">
                {formatPrice(lineTotal)}
              </div>
              <button
                type="button"
                aria-label={`Retirer ${product.name}`}
                onClick={() => removeItem(key)}
                className="text-zinc-400 hover:text-red-600"
              >
                ✕
              </button>
            </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.12] dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">Récapitulatif</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Sous-total</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Livraison</dt>
              <dd>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-black/[.08] pt-4 text-base font-semibold dark:border-white/[.12]">
            <span>Total</span>
            <span>{formatPrice(totalPrice + shipping)}</span>
          </div>
          <button
            type="button"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-black font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Passer la commande
          </button>
        </aside>
      </div>
    </div>
  );
}
