import { NextResponse } from "next/server";
import { products as allProducts } from "../_data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featuredParam = searchParams.get("featured");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  let products = allProducts;
  if (featuredParam === "true") {
    products = allProducts.filter((p) => Boolean(p.featured));
  } else if (featuredParam === "false") {
    products = allProducts.filter((p) => !Boolean(p.featured));
  }

  // Pagination
  const limit = Math.max(1, Math.min(100, Number(limitParam) || 10));
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const pageRaw = Number(pageParam) || 1;
  const page = Math.min(totalPages, Math.max(1, pageRaw));
  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);

  return NextResponse.json({
    products: paginated,
    totalPages,
    totalItems,
    page,
    limit,
  });
}
