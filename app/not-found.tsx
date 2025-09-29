"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

// Global 404 page (Figma: 404 Error sections / Type=V1, View=Desktop)
// Theme-independent: fixed colors, not using CSS variables
export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Decorative Shapes from Figma (exported SVGs) */}
      {/* Hide on small screens to avoid overflow; show from sm and up */}
      <div className="pointer-events-none select-none absolute right-0 top-0 hidden sm:block" style={{ width: 450, height: 254 }}>
        <Image src="/assets/404_top_shape.svg" alt="Top decorative shape" width={450} height={254} priority />
      </div>
      <div className="pointer-events-none select-none absolute left-0 hidden sm:block" style={{ width: 450, height: 254, bottom: 0 }}>
        <Image src="/assets/404_bottom_shape.svg" alt="Bottom decorative shape" width={450} height={254} />
      </div>

      {/* Container (max-w 1280), responsive paddings */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:py-28">
        <div className="w-full flex flex-col items-center gap-4 sm:gap-5 text-center">
          <span className="uppercase text-[96px] md:text-[200px] -tracking-[0.03em] text-xs font-[500] text-gray-800">404</span>
          <h1 className="font-bold text-gray-900 text-3xl sm:text-4xl md:text-5xl leading-tight">
            Page not found
          </h1>
          <p className="max-w-prose text-gray-500 text-base sm:text-lg leading-relaxed">
            The page you’re looking for doesn’t exist or has been moved. Check the URL or go back home.
          </p>
          <div className="mt-3 flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            
            <Link
              href="/dashboard/products"
              className="inline-flex gap-2 w-full sm:w-auto items-center justify-center rounded-lg px-5 py-3 text-sm font-medium border border-[#D1D5DB] text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <FaChevronLeft/>
              Go Back
            </Link>
            <Link
              href="/"
              className="inline-flex gap-2 w-full sm:w-auto items-center justify-center rounded-lg px-5 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
