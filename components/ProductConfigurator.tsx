"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  defaultSelection,
  formatPrice,
  getUnitPrice,
  type ColorOption,
  type PriceOption,
  type Product,
  type Selection,
} from "@/lib/products";

function OptionGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: PriceOption[];
  selected: string | undefined;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-6">
      <span className="text-sm font-medium text-zinc-500">{title}</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.id === selected;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/[.15] hover:border-black dark:border-white/[.2] dark:hover:border-white"
              }`}
            >
              {opt.label}
              {opt.priceDelta > 0 && (
                <span className="ml-1 opacity-60">
                  +{formatPrice(opt.priceDelta)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorGroup({
  options,
  selected,
  onSelect,
}: {
  options: ColorOption[];
  selected: string | undefined;
  onSelect: (id: string) => void;
}) {
  const current = options.find((o) => o.id === selected);
  return (
    <div className="mt-6">
      <span className="text-sm font-medium text-zinc-500">
        Couleur{current ? ` — ${current.label}` : ""}
      </span>
      <div className="mt-2 flex flex-wrap gap-3">
        {options.map((opt) => {
          const active = opt.id === selected;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-label={opt.label}
              aria-pressed={active}
              title={opt.label}
              className={`h-9 w-9 rounded-full border transition-transform hover:scale-110 ${
                active
                  ? "ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-zinc-900"
                  : "border-black/[.15] dark:border-white/[.2]"
              }`}
              style={{ backgroundColor: opt.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function ProductConfigurator({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selection, setSelection] = useState<Selection>(() =>
    defaultSelection(product),
  );
  const [added, setAdded] = useState(false);

  const unitPrice = getUnitPrice(product, selection);

  function handleAdd() {
    addItem(product.slug, selection, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      <motion.span
        key={unitPrice}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block text-3xl font-semibold"
      >
        {formatPrice(unitPrice)}
      </motion.span>

      {product.screenOptions && product.screenOptions.length > 1 && (
        <OptionGroup
          title="Taille d'écran"
          options={product.screenOptions}
          selected={selection.screen}
          onSelect={(screen) => setSelection((s) => ({ ...s, screen }))}
        />
      )}

      {product.storageOptions && product.storageOptions.length > 0 && (
        <OptionGroup
          title="Stockage"
          options={product.storageOptions}
          selected={selection.storage}
          onSelect={(storage) => setSelection((s) => ({ ...s, storage }))}
        />
      )}

      {product.colorOptions && product.colorOptions.length > 0 && (
        <ColorGroup
          options={product.colorOptions}
          selected={selection.color}
          onSelect={(color) => setSelection((s) => ({ ...s, color }))}
        />
      )}

      <motion.button
        type="button"
        onClick={handleAdd}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-black px-8 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:w-auto"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </motion.button>
    </div>
  );
}
