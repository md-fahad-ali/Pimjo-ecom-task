"use client";
import React from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/app/components/ecommerce/Table";
import Badge from "@/app/components/badge/Badge";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
};

export default function ProductsPage() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const currentPage = 1;
  const totalPages = 10;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        if (mounted) setProducts(data.products ?? []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load products";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [] as Product[];
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = q
        ? [p.name, p.variants, p.category, p.price]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchesSearch;
    });
  }, [products, search]);
  return (
    <div className="dashboard-theme">
      {/* Toolbar card */}
      <div
        className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white/90">All products</h2>
            <p className="text-theme-sm text-[var(--secondary)] dark:text-gray-400">
              {loading ? "Loading…" : error ? "" : `${filteredProducts.length} of ${products?.length ?? 0} items`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:w-auto w-full">
            {/* Search input */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-theme-xs flex-1 min-w-[200px] border border-[var(--border)] bg-[var(--panel)] dark:border-gray-700 dark:bg-[#101828]">
              <svg className={`${theme === "dark"? "stroke-gray-400":"stroke-[var(---background)]"}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3823 13.3831L16.7074 16.7081M15.4584 8.37412C15.4584 12.2852 12.2871 15.4558 8.37508 15.4558C4.46306 15.4558 1.29175 12.2852 1.29175 8.37412C1.29175 4.46304 4.46306 1.29248 8.37508 1.29248C12.2871 1.29248 15.4584 4.46304 15.4584 8.37412Z" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none w-full bg-transparent placeholder:text-[var(--secondary)] text-[var(--foreground)] dark:bg-[#101828] dark:placeholder:text-gray-400 dark:text-white/90"
                placeholder="Search products, categories…"
              />
            </div>

            {/* Date button */}
            <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm font-medium shadow-theme-xs whitespace-nowrap border-[var(--border)] bg-[var(--panel)] text-[var(--secondary)] hover:bg-[var(--hover)] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
              <svg className="stroke-[var(--secondary)] dark:stroke-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 2.5V5M15 2.5V5M3.333 8.333h13.334M4.167 4.167h11.666A1.667 1.667 0 0 1 17.5 5.833v10A1.667 1.667 0 0 1 15.833 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833v-10A1.667 1.667 0 0 1 4.167 4.167Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              05 Feb - 06 March
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className={`border-y ${theme === "dark" ? "border-gray-800" : "border-[var(--border)]"}`}>
              <TableRow>
                <TableCell isHeader className="py-3 px-4 sm:px-6 text-start text-theme-xs font-medium text-[var(--secondary)]">Products</TableCell>
                <TableCell isHeader className="py-3 px-4 sm:px-6 text-start text-theme-xs font-medium text-[var(--secondary)] hidden sm:table-cell">Category</TableCell>
                <TableCell isHeader className="py-3 px-4 sm:px-6 text-start text-theme-xs font-medium text-[var(--secondary)] hidden sm:table-cell">Price</TableCell>
                <TableCell isHeader className="py-3 px-4 sm:px-6 text-start text-theme-xs font-medium text-[var(--secondary)]">Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className={`divide-y ${theme === "dark" ? "divide-gray-800" : "divide-[var(--border)]"}`}>
              {loading && (
                <TableRow>
                  <TableCell className="py-4" colSpan={4}>
                    <span className={theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}>Loading products...</span>
                  </TableCell>
                </TableRow>
              )}
              {error && !loading && (
                <TableRow>
                  <TableCell className="py-4" colSpan={4}>
                    <span className="text-red-500">{error}</span>
                  </TableCell>
                </TableRow>
              )}
              {!loading && !error && filteredProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="py-3 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 sm:h-[50px] sm:w-[50px] overflow-hidden rounded-md border ${theme === "dark" ? "bg-white/[0.03] border-gray-800" : "bg-[var(--background)] border-[var(--border)]"
                          }`}
                      >
                        <Image src={p.image} alt={p.name} width={50} height={50} className="h-10 w-10 sm:h-[50px] sm:w-[50px] object-cover" />
                      </div>
                      <div>
                        <p className={`text-theme-sm font-medium ${theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"}`}>{p.name}</p>
                        <span className={`text-theme-xs ${theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}`}>{p.variants}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm hidden sm:table-cell ${theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}`}>{p.category}</TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm hidden sm:table-cell ${theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}`}>{p.price}</TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm ${theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}`}>
                    <Badge size="sm" color={p.status === "Delivered" ? "success" : p.status === "Pending" ? "warning" : "error"}>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between border-t px-4 py-3 sm:px-6 sm:py-4 ${theme === "dark" ? "border-gray-800" : "border-[var(--border)]"}`}>
          <button className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm hover:bg-[var(--hover)] ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-400" : "border-[var(--border)] bg-[var(--panel)] text-[var(--secondary)]"}`}>
            Prev
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <button className={`h-10 w-10 rounded-lg border hover:bg-[var(--hover)] ${theme === "dark" ? "border-gray-700 text-gray-400 bg-gray-800" : "border-[var(--border)] text-[var(--secondary)]"}`}>1</button>
            <button className={`h-10 w-10 rounded-lg border hover:bg-[var(--hover)] ${theme === "dark" ? "border-gray-700 text-gray-400 bg-gray-800" : "border-[var(--border)] text-[var(--secondary)]"}`}>2</button>
            <button className={`h-10 w-10 rounded-lg border hover:bg-[var(--hover)] ${theme === "dark" ? "border-gray-700 text-gray-400 bg-gray-800" : "border-[var(--border)] text-[var(--secondary)]"}`}>3</button>
          </div>
          {/* Mobile page text */}
          <div className={`sm:hidden text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-[var(--foreground)]"}`}>
            Page {currentPage} of {totalPages}
          </div>
          <button className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm hover:bg-[var(--hover)] ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-400" : "border-[var(--border)] bg-[var(--panel)] text-[var(--secondary)]"}`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
