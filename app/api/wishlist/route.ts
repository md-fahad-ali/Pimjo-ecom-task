import { NextResponse } from "next/server";
import { products } from "../_data/products";
import { getUserId } from "../../lib/userSession";
import connectDB from "../../lib/mongodb";
import Wishlist, { IWishlistItem } from "../../models/Wishlist";

export type WishlistItem = {
  productId: number;
  name: string;
  price: string;
  image: string;
};

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();
    
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, items: [] });
    }
    
    return NextResponse.json({ items: wishlist.items });
  } catch (error) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json({ error: "Failed to load wishlist" }, { status: 500 });
  }
}

// Toggle add/remove
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const productId = Number(body.productId);
    const product = products.find((p) => p.id === productId);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    const userId = await getUserId();
    let wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, items: [] });
    }
    
    const existingItemIndex = wishlist.items.findIndex((item: IWishlistItem) => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      wishlist.items.splice(existingItemIndex, 1); // remove if exists
    } else {
      wishlist.items.push({ 
        productId, 
        name: product.name, 
        price: product.price, 
        image: product.image 
      });
    }
    
    await wishlist.save();
    return NextResponse.json({ items: wishlist.items }, { status: 201 });
  } catch (error) {
    console.error('Wishlist POST error:', error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = Number(searchParams.get("productId"));
    if (!productId) return NextResponse.json({ error: "productId query param required" }, { status: 400 });
    
    const userId = await getUserId();
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
    }
    
    wishlist.items = wishlist.items.filter((item: IWishlistItem) => item.productId !== productId);
    await wishlist.save();
    return NextResponse.json({ items: wishlist.items });
  } catch (error) {
    console.error('Wishlist DELETE error:', error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
