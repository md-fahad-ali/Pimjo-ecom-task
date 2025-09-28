import { NextResponse } from "next/server";
import { products as allProducts } from "../_data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featuredParam = searchParams.get("featured");
  let products = allProducts;
  if (featuredParam === "true") {
    products = allProducts.filter((p) => Boolean(p.featured));
  } else if (featuredParam === "false") {
    products = allProducts.filter((p) => !Boolean(p.featured));
  }
  return NextResponse.json({ products });
}
