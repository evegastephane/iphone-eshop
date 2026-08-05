import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductConfigurator from "@/components/ProductConfigurator";
import { getAllProducts, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable — iPhone eShop" };
  return {
    title: `${product.name} — iPhone eShop`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/products"
        className="text-sm text-zinc-500 hover:text-black dark:hover:text-white"
      >
        ← Retour à la boutique
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 text-[10rem] dark:from-zinc-800 dark:to-zinc-700">
          <span aria-hidden>{product.emoji}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-zinc-400">
            {product.brand}
          </span>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-zinc-500">{product.tagline}</p>

          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductConfigurator product={product} />
          </div>

          <dl className="mt-10 divide-y divide-black/[.08] border-t border-black/[.08] dark:divide-white/[.12] dark:border-white/[.12]">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 text-sm">
                <dt className="text-zinc-500">{key}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
