import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="flex flex-col items-center gap-6 py-20 text-center">
        <span className="rounded-full bg-blue-600/10 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
          Nouveautés 2026 disponibles
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Les meilleurs téléphones & gadgets, livrés chez vous.
        </h1>
        <p className="max-w-xl text-lg text-zinc-500">
          iPhone, Galaxy, Pixel, montres connectées, écouteurs et accessoires.
          Des prix clairs, une livraison offerte dès 50 €.
        </p>
        <Link
          href="/products"
          className="flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Découvrir la boutique
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.id}`}
            className="rounded-2xl border border-black/[.08] bg-white p-6 text-center transition-shadow hover:shadow-md dark:border-white/[.12] dark:bg-zinc-900"
          >
            <span className="font-semibold">{c.label}</span>
          </Link>
        ))}
      </section>

      <section className="py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Produits en vedette
          </h2>
          <Link href="/products" className="text-sm font-medium text-blue-600">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
