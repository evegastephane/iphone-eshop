"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-black/[.06] bg-white/70 backdrop-blur-xl dark:border-white/[.08] dark:bg-black/60">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          eShop
        </Link>
        <div className="flex items-center gap-7 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/products?category=iphone" className="hover:text-black dark:hover:text-white">
            iPhone
          </Link>
          <Link href="/products?category=mac" className="hover:text-black dark:hover:text-white">
            Mac
          </Link>
          <Link href="/products?category=believe" className="hover:text-black dark:hover:text-white">
            Believe
          </Link>
          <Link href="/products" className="hover:text-black dark:hover:text-white">
            Boutique
          </Link>
          <Link
            href="/cart"
            aria-label="Panier"
            className="relative flex items-center hover:text-black dark:hover:text-white"
          >
            <span aria-hidden className="text-lg">
              🛒
            </span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-2.5 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </nav>
    </header>
  );
}
