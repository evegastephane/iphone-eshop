import Link from "next/link";
import { formatPrice, hasOptions, type Product } from "@/lib/products";
import { HoverLift } from "@/components/motion";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <HoverLift className="h-full">
      <Link
        href={`/products/${product.slug}`}
        className="flex aspect-[3/4] flex-col justify-end rounded-3xl border border-black/[.06] bg-white p-5 transition-shadow hover:shadow-xl dark:border-white/[.08] dark:bg-zinc-900"
      >
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">
          {hasOptions(product) ? "À partir de " : ""}
          {formatPrice(product.price)}
        </p>
      </Link>
    </HoverLift>
  );
}
