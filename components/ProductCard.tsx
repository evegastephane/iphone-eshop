import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { HoverLift } from "@/components/motion";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <HoverLift className="h-full">
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[.06] bg-white transition-shadow hover:shadow-xl dark:border-white/[.08] dark:bg-zinc-900"
      >
        <div className="flex aspect-square items-center justify-center bg-zinc-50 text-7xl transition-transform duration-300 group-hover:scale-110 dark:bg-zinc-800/60">
          <span aria-hidden>{product.emoji}</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-5">
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
            {product.brand}
          </span>
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <p className="line-clamp-2 flex-1 text-sm text-zinc-500">
            {product.tagline}
          </p>
          <span className="mt-3 text-lg font-semibold">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
    </HoverLift>
  );
}
