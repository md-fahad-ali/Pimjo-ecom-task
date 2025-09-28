"use client";
import Image from "next/image";
import React from "react";
import Badge from "../badge/Badge";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  status?: "New" | "Hot" | "Sale" | "In Stock";
};

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5 shadow-theme-xs">
      <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-contain p-4"
        />
        {product.status && (
          <div className="absolute top-3 left-3">
            <Badge color="primary" size="sm">
              {product.status}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-[var(--foreground)] text-sm sm:text-base">
          {product.name}
        </h4>
        <p className="mt-1 text-[var(--secondary)] text-theme-xs">{product.category}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[var(--foreground)] font-semibold">{product.price}</span>
          <button className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-theme-sm text-[var(--secondary)] hover:bg-[var(--hover)]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
