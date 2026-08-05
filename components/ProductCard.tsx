import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-white transition-shadow hover:shadow-lg dark:border-white/[.12] dark:bg-zinc-900"
    >
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-7xl transition-transform group-hover:scale-105 dark:from-zinc-800 dark:to-zinc-700">
        <span aria-hidden>{product.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-zinc-400">
          {product.brand}
        </span>
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="line-clamp-2 flex-1 text-sm text-zinc-500">
          {product.tagline}
        </p>
        <span className="mt-2 text-lg font-semibold">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
