"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.12] dark:bg-black/70">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span aria-hidden>📱</span> iPhone eShop
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-blue-600">
            Boutique
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-blue-600"
          >
            <span aria-hidden>🛒</span>
            Panier
            {totalItems > 0 && (
              <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
