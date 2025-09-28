import { NextResponse } from "next/server";

export type Order = {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
};

const orders: Order[] = [
  { id: 1, name: "MacBook Pro 13”", variants: "2 Variants", category: "Laptop", price: "$2399.00", status: "Delivered", image: "/assets/product-macbook.png" },
  { id: 2, name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending", image: "/assets/product-watch.png" },
  { id: 3, name: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: "$1869.00", status: "Delivered", image: "/assets/product-iphone.png" },
  { id: 4, name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1699.00", status: "Canceled", image: "/assets/product-ipad.png" },
  { id: 5, name: "AirPods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered", image: "/assets/product-airpods.png" },
];

export async function GET() {
  return NextResponse.json({ orders });
}
