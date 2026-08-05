import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  CATEGORIES,
  getAllProducts,
  type Category,
} from "@/lib/products";

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

function isCategory(value: string | undefined): value is Category {
  return value !== undefined && CATEGORY_IDS.has(value);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = isCategory(category) ? category : undefined;

  const products = active
    ? getAllProducts().filter((p) => p.category === active)
    : getAllProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Boutique</h1>
      <p className="mt-1 text-zinc-500">
        {products.length} produit{products.length > 1 ? "s" : ""} disponible
        {products.length > 1 ? "s" : ""}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterPill href="/products" label="Tout" active={!active} />
        {CATEGORIES.map((c) => (
          <FilterPill
            key={c.id}
            href={`/products?category=${c.id}`}
            label={c.label}
            active={active === c.id}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-black/[.12] hover:border-blue-600 dark:border-white/[.15]"
      }`}
    >
      {label}
    </Link>
  );
}
