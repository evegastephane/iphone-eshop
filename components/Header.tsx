"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/products?category=iphone", label: "iPhone" },
  { href: "/products?category=mac", label: "Mac" },
  { href: "/products?category=believe", label: "Believe" },
  { href: "/products", label: "Boutique" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-black/[.06] bg-white/70 backdrop-blur-xl dark:border-white/[.08] dark:bg-black/60">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          eShop
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex lg:gap-7 dark:text-zinc-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-black dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <CartLink totalItems={totalItems} onClick={() => setOpen(false)} />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/[.05] md:hidden dark:hover:bg-white/[.08]"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/[.06] md:hidden dark:border-white/[.08]"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-2 py-3 text-base font-medium text-zinc-700 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CartLink({
  totalItems,
  onClick,
}: {
  totalItems: number;
  onClick: () => void;
}) {
  return (
    <Link
      href="/cart"
      aria-label="Panier"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-black/[.05] hover:text-black dark:text-zinc-300 dark:hover:bg-white/[.08] dark:hover:text-white"
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
            className="absolute right-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
