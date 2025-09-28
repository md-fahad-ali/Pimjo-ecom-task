import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { products } from "../_data/products";

const DATA_DIR = path.join(process.cwd(), "app", "api", "_data");
const WISHLIST_FILE = path.join(DATA_DIR, "wishlist.json");

export type WishlistItem = {
  productId: number;
  name: string;
  price: string;
  image: string;
};

export type Wishlist = { items: WishlistItem[] };

function readWishlist(): Wishlist {
  try {
    const raw = fs.readFileSync(WISHLIST_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { items: [] };
  }
}

function writeWishlist(w: Wishlist) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(WISHLIST_FILE, JSON.stringify(w, null, 2), "utf-8");
}

export async function GET() {
  const w = readWishlist();
  return NextResponse.json(w);
}

// Toggle add/remove
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const productId = Number(body.productId);
  const product = products.find((p) => p.id === productId);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const w = readWishlist();
  const idx = w.items.findIndex((i) => i.productId === productId);
  if (idx !== -1) {
    w.items.splice(idx, 1); // remove if exists
  } else {
    w.items.push({ productId, name: product.name, price: product.price, image: product.image });
  }
  writeWishlist(w);
  return NextResponse.json(w, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = Number(searchParams.get("productId"));
  if (!productId) return NextResponse.json({ error: "productId query param required" }, { status: 400 });
  const w = readWishlist();
  w.items = w.items.filter((i) => i.productId !== productId);
  writeWishlist(w);
  return NextResponse.json(w);
}
