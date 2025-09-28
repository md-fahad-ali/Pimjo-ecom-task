export type Product = {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string; // formatted price for UI
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
  featured?: boolean;
  // Optional fields for landing featured products
  description?: string;
  originalPrice?: string;
  href?: string;
  badge?: string | null;
};

export const products: Product[] = [
  { id: 1, name: "MacBook Pro 13”", variants: "2 Variants", category: "Laptop", price: "$2399.00", status: "Delivered", image: "/assets/product-macbook.png", featured: false },
  { id: 2, name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending", image: "/assets/product-watch.png", featured: false },
  { id: 3, name: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: "$1869.00", status: "Delivered", image: "/assets/product-iphone.png", featured: false },
  { id: 4, name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1699.00", status: "Canceled", image: "/assets/product-ipad.png", featured: false },
  { id: 5, name: "AirPods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered", image: "/assets/product-airpods.png", featured: false },
  // Landing featured showcase items
  { id: 101, name: "White Jacket", variants: "1 Variant", category: "Apparel", price: "$249.00", status: "Delivered", image: "/assets/featured-product-1.png", featured: true, description: "Lightweight & water-resistant", href: "/product/white-jacket", badge: null },
  { id: 102, name: "Denim Jacket", variants: "1 Variant", category: "Apparel", price: "$189.00", status: "Delivered", image: "/assets/featured-product-2.png", featured: true, description: "Classic vintage style", originalPrice: "$229.00", href: "/product/denim-jacket", badge: "Hot Item" },
  { id: 103, name: "Black Hoodie", variants: "1 Variant", category: "Apparel", price: "$129.00", status: "Delivered", image: "/assets/featured-product-3.png", featured: true, description: "Comfortable cotton blend", href: "/product/black-hoodie", badge: null },
  { id: 104, name: "Blue Shirt", variants: "1 Variant", category: "Apparel", price: "$79.00", status: "Delivered", image: "/assets/featured-product-4.png", featured: true, description: "Premium cotton fabric", href: "/product/blue-shirt", badge: null },
];
