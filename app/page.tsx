import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  CATEGORIES,
  getAppleHighlights,
  getBelieveProducts,
} from "@/lib/products";

export default function Home() {
  const apple = getAppleHighlights();
  const believe = getBelieveProducts().slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Apple en vedette (iPhone + Mac) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Apple en vedette
              </h2>
              <p className="mt-1 text-zinc-500">
                Les derniers iPhone et Mac, au cœur de la boutique.
              </p>
            </div>
            <Link
              href="/products?category=iphone"
              className="hidden text-sm font-medium text-blue-600 sm:block"
            >
              Tous les iPhone →
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {apple.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Bannière Believe */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-6 py-12 text-white sm:px-12">
            <span className="text-sm font-medium uppercase tracking-widest text-white/70">
              Ambassadeur officiel
            </span>
            <h2 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight">
              Believe : chargeurs, écouteurs, câbles & powerbanks
            </h2>
            <p className="mt-3 max-w-lg text-white/80">
              Une gamme fiable et abordable que nous représentons fièrement.
            </p>
            <Link
              href="/products?category=believe"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 font-medium text-indigo-700 transition-transform hover:scale-105"
            >
              Découvrir Believe
            </Link>
          </div>
        </Reveal>
        <Stagger className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {believe.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Catégories */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Explorer par catégorie
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <StaggerItem key={c.id} className="h-full">
              <Link
                href={`/products?category=${c.id}`}
                className="flex h-full items-center justify-center rounded-2xl border border-black/[.06] bg-white p-6 text-center font-medium transition-shadow hover:shadow-md dark:border-white/[.08] dark:bg-zinc-900"
              >
                {c.label}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
