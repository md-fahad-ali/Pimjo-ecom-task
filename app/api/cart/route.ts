import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { products } from "../_data/products";

const DATA_DIR = path.join(process.cwd(), "app", "api", "_data");
const CART_FILE = path.join(DATA_DIR, "cart.json");

export type CartItem = {
  productId: number;
  name: string;
  price: string; // formatted price
  image: string;
  quantity: number;
};

export type Cart = { items: CartItem[] };

function readCart(): Cart {
  try {
    const raw = fs.readFileSync(CART_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { items: [] };
  }
}

function writeCart(cart: Cart) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2), "utf-8");
}

export async function GET() {
  const cart = readCart();
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const productId = Number(body.productId);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  const cart = readCart();
  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += 1; // always increment by 1 on add
  } else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // new items start at 1
    });
  }
  writeCart(cart);
  return NextResponse.json(cart, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const productId = Number(body.productId);
  const quantity = Number(body.quantity);
  if (!productId || quantity === undefined || Number.isNaN(quantity)) {
    return NextResponse.json({ error: "productId and quantity required" }, { status: 400 });
  }
  const cart = readCart();
  const idx = cart.items.findIndex((i) => i.productId === productId);
  if (idx === -1) {
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }
  if (quantity <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].quantity = quantity;
  }
  writeCart(cart);
  return NextResponse.json(cart);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = Number(searchParams.get("productId"));
  if (!productId) {
    return NextResponse.json({ error: "productId query param required" }, { status: 400 });
  }
  const cart = readCart();
  const before = cart.items.length;
  cart.items = cart.items.filter((i) => i.productId !== productId);
  if (cart.items.length === before) {
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }
  writeCart(cart);
  return NextResponse.json(cart);
}
