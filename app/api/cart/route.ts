import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { products } from "../_data/products";
import { getUserId } from "../../lib/userSession";

const DATA_DIR = path.join(process.cwd(), "app", "api", "_data");
const CART_FILE = path.join(DATA_DIR, "cart.json");

export type CartItem = {
  productId: number;
  name: string;
  price: string; // formatted price
  image: string;
  quantity: number;
};

export type UserCart = {
  userId: string;
  items: CartItem[];
};

export type CartData = {
  carts: UserCart[];
};

function readCartData(): CartData {
  try {
    const raw = fs.readFileSync(CART_FILE, "utf-8");
    const data = JSON.parse(raw);
    // Handle migration from old format
    if (data.items && !data.carts) {
      return { carts: [] };
    }
    return data;
  } catch {
    return { carts: [] };
  }
}

function writeCartData(cartData: CartData) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(CART_FILE, JSON.stringify(cartData, null, 2), "utf-8");
}

function getUserCart(userId: string): UserCart {
  const cartData = readCartData();
  let userCart = cartData.carts.find((cart: UserCart) => cart.userId === userId);
  
  if (!userCart) {
    userCart = { userId, items: [] };
    cartData.carts.push(userCart);
    writeCartData(cartData);
  }
  
  return userCart;
}

export async function GET() {
  const userId = await getUserId();
  const userCart = getUserCart(userId);
  return NextResponse.json({ items: userCart.items });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const productId = Number(body.productId);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  
  const userId = await getUserId();
  const cartData = readCartData();
  let userCart = cartData.carts.find((cart: UserCart) => cart.userId === userId);
  
  if (!userCart) {
    userCart = { userId, items: [] };
    cartData.carts.push(userCart);
  }
  
  const existing = userCart.items.find((i: CartItem) => i.productId === productId);
  if (existing) {
    existing.quantity += 1; // always increment by 1 on add
  } else {
    userCart.items.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // new items start at 1
    });
  }
  
  writeCartData(cartData);
  return NextResponse.json({ items: userCart.items }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const productId = Number(body.productId);
  const quantity = Number(body.quantity);
  if (!productId || quantity === undefined || Number.isNaN(quantity)) {
    return NextResponse.json({ error: "productId and quantity required" }, { status: 400 });
  }
  
  const userId = await getUserId();
  const cartData = readCartData();
  let userCart = cartData.carts.find((cart: UserCart) => cart.userId === userId);
  
  if (!userCart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }
  
  const idx = userCart.items.findIndex((i: CartItem) => i.productId === productId);
  if (idx === -1) {
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }
  
  if (quantity <= 0) {
    userCart.items.splice(idx, 1);
  } else {
    userCart.items[idx].quantity = quantity;
  }
  
  writeCartData(cartData);
  return NextResponse.json({ items: userCart.items });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = Number(searchParams.get("productId"));
  if (!productId) {
    return NextResponse.json({ error: "productId query param required" }, { status: 400 });
  }
  
  const userId = await getUserId();
  const cartData = readCartData();
  let userCart = cartData.carts.find((cart: UserCart) => cart.userId === userId);
  
  if (!userCart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }
  
  const before = userCart.items.length;
  userCart.items = userCart.items.filter((i: CartItem) => i.productId !== productId);
  if (userCart.items.length === before) {
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }
  
  writeCartData(cartData);
  return NextResponse.json({ items: userCart.items });
}
