import { NextResponse } from "next/server";
import { products } from "../_data/products";
import { getUserId } from "../../lib/userSession";
import connectDB from "../../lib/mongodb";
import Cart, { ICartItem } from "../../models/Cart";

export type CartItem = {
  productId: number;
  name: string;
  price: string; // formatted price
  image: string;
  quantity: number;
};

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();
    
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    
    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Cart GET error:', error);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const productId = Number(body.productId);
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    const userId = await getUserId();
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    
    await cart.save();
    return NextResponse.json({ items: cart.items }, { status: 201 });
  } catch (error) {
    console.error('Cart POST error:', error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const productId = Number(body.productId);
    const quantity = Number(body.quantity);
    if (!productId || quantity === undefined || Number.isNaN(quantity)) {
      return NextResponse.json({ error: "productId and quantity required" }, { status: 400 });
    }
    
    const userId = await getUserId();
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    const itemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Cart PUT error:', error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = Number(searchParams.get("productId"));
    if (!productId) {
      return NextResponse.json({ error: "productId query param required" }, { status: 400 });
    }
    
    const userId = await getUserId();
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    const before = cart.items.length;
    cart.items = cart.items.filter((item: ICartItem) => item.productId !== productId);
    if (cart.items.length === before) {
      return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
    }
    
    await cart.save();
    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Cart DELETE error:', error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}
