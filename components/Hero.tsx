"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="rounded-full border border-black/[.08] px-4 py-1 text-sm text-zinc-500 dark:border-white/[.12]"
        >
          Revendeur Apple · Ambassadeur Believe
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          L&apos;iPhone. Le Mac.
          <br />
          <span className="text-zinc-400">Et tout ce qui va avec.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
          className="max-w-xl text-lg text-zinc-500"
        >
          iPhone 11 à 17, MacBook, iPad, audio, enceintes JBL, accessoires — et
          la gamme Believe dont nous sommes ambassadeurs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.18 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/products?category=iphone"
            className="flex h-12 items-center justify-center rounded-full bg-black px-8 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Voir les iPhone
          </Link>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-full border border-black/[.12] px-8 font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.18] dark:hover:bg-white/[.06]"
          >
            Toute la boutique
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
