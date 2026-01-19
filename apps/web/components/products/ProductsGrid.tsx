"use client";

import { Product } from "@/lib/services/products.service";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductDetailsModal } from "./ProductDetailsModal";

type Props = Readonly<{ products: Product[] }>;

export function ProductsGrid({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={(id) => {
              setProductId(id);
              setOpen(true);
            }}
          />
        ))}
      </section>

      <ProductDetailsModal
        open={open}
        productId={productId}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
