"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';

type FeaturedProduct = {
  id: number;
  name: string;
  description?: string;
  price: string; // formatted
  originalPrice?: string;
  image: string;
  badge?: string | null;
  href?: string;
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);
  const { items: wishItems, toggleWishlist } = useWishlist();
  const inWishlist = (id: number) => wishItems.some(w => w.productId === id);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products?featured=true', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load featured products');
        const data = await res.json();
        type ApiProduct = {
          id: number; name: string; description?: string; price: string; originalPrice?: string; image: string; badge?: string | null; href?: string;
        };
        const list: FeaturedProduct[] = (data.products || []).map((p: ApiProduct) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          badge: p.badge ?? null,
          href: p.href,
        }));
        if (mounted) setProducts(list);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to load featured products';
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="bg-white py-28 md:py-28 px-4 md:px-28">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center gap-16 md:gap-16">
          {/* Section Title */}
          <div className="flex flex-col items-center gap-4 max-w-[640px] text-center">
            <h2 className="text-4xl md:text-[48px] font-semibold leading-tight md:leading-[52px] text-[#1F2937]">
              Handpicked Highlights
            </h2>
            <p className="text-base font-normal leading-6 text-[#6B7280] tracking-[-0.2px]">
              There are many variations of available but the majority have suffered alteration in some form.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-7 w-full">
            {loading && (
              <div className="col-span-1 md:col-span-4 text-center text-[#6B7280]">Loading featured products...</div>
            )}
            {error && !loading && (
              <div className="col-span-1 md:col-span-4 text-center">
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    (async () => {
                      try {
                        const res = await fetch('/api/products?featured=true', { cache: 'no-store' });
                        if (!res.ok) throw new Error('Failed to load featured products');
                        const data = await res.json();
                        type ApiProduct = {
                          id: number; name: string; description?: string; price: string; originalPrice?: string; image: string; badge?: string | null; href?: string;
                        };
                        const list: FeaturedProduct[] = (data.products || []).map((p: ApiProduct) => ({
                          id: p.id,
                          name: p.name,
                          description: p.description,
                          price: p.price,
                          originalPrice: p.originalPrice,
                          image: p.image,
                          badge: p.badge ?? null,
                          href: p.href,
                        }));
                        setProducts(list);
                      } catch (e: unknown) {
                        const message = e instanceof Error ? e.message : 'Failed to load featured products';
                        setError(message);
                      } finally {
                        setLoading(false);
                      }
                    })();
                  }}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Retry
                </button>
              </div>
            )}
            {!loading && !error && products.map((product) => (
              <div key={product.id} className="group">
                <div className="flex flex-col gap-4">
                  {/* Product Image */}
                  <div className="relative w-full h-[378px] md:h-[326px] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-[18px] left-[18px]">
                        <div className="bg-[#FEF2F2] text-[#B91C1C] text-sm font-medium px-3 py-1 rounded-full">
                          {product.badge}
                        </div>
                      </div>
                    )}

                    {/* Heart Icon */}
                    <div className="absolute top-4 right-4 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={inWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        className={`w-11 h-11 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow ${inWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-[#1F2937]'}`}
                      >
                        <svg className="w-5 h-5" fill={inWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-5">
                    {/* Name, Description, and Price */}
                    <div className="flex flex-row justify-between items-start gap-4">
                      <div className="flex flex-col gap-1 flex-1">
                        <h3 className="text-base font-semibold leading-6 text-[#1F2937] tracking-[-0.2px]">
                          {product.name}
                        </h3>
                        <p className="text-sm font-normal leading-5 text-[#6B7280] tracking-[-0.2px]">
                          {product.description}
                        </p>
                    </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-base font-medium leading-6 text-[#1F2937] tracking-[-0.2px]">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm font-normal leading-5 text-[#9CA3AF] line-through tracking-[-0.2px]">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={async () => {
                          setAddingId(product.id);
                          try {
                            await addToCart(product.id, 1);
                          } finally {
                            setAddingId((prev) => (prev === product.id ? null : prev));
                          }
                        }}
                        disabled={addingId === product.id}
                        className="w-full flex items-center justify-center gap-1.5 md:gap-1 px-4 py-2.5 md:py-2.5 border border-[#D1D5DB] text-[#1F2937] rounded-lg text-sm md:text-base font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors group/button disabled:opacity-60"
                      >
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.816406 1H1.99696C2.74468 1 3.37822 1.55068 3.48234 2.29112L3.63429 3.37161M3.63429 3.37161L4.73641 11.2089C4.84053 11.9493 5.47407 12.5 6.22179 12.5L15.5833 12.5C16.1803 12.5 16.7205 12.146 16.9587 11.5986L19.626 5.47023C20.0572 4.4795 19.3312 3.37161 18.2507 3.37161H3.63429Z" stroke="#374151" className="group-hover/button:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.2832 16.5H6.2932M14.8203 16.5H14.8303" stroke="#374151" className="group-hover/button:stroke-white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {addingId === product.id ? 'Adding...' : 'Add to cart'}
                      </button>
                      {product.href && (
                        <Link className="hidden md:inline-flex items-center justify-center px-4 py-2.5 text-sm text-indigo-600 hover:underline whitespace-nowrap" href={product.href}>View</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
