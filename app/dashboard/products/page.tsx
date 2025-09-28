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
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Product["status"]>("all");
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
  
  const categories = useMemo(() => {
    if (!products) return ["all"];
    const set = new Set(products.map(p => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [] as Product[];
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = q
        ? [p.name, p.variants, p.category, p.price]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
        : true;
      const matchesCategory = categoryFilter === "all" ? true : p.category === categoryFilter;
      const matchesStatus = statusFilter === "all" ? true : p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);
  return (
    <div className="dashboard-theme">
      {/* Toolbar card */}
      <div
        className={`overflow-hidden rounded-2xl border ${
          theme === "dark" ? "border-gray-800 bg-white/[0.03]" : "border-[var(--border)] bg-[var(--panel)]"
        }`}
      >
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex flex-col gap-1">
            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"}`}>All products</h2>
            <p className={`text-theme-sm ${theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}`}>
              {loading ? "Loading…" : error ? "" : `${filteredProducts.length} of ${products?.length ?? 0} items`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:w-auto w-full">
            {/* Search input */}
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 shadow-theme-xs flex-1 min-w-[200px] border ${
                theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[var(--border)] bg-[var(--panel)]"
              }`}
            >
              <svg className={`${theme === "dark" ? "stroke-gray-400" : "stroke-[var(--secondary)]"}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`bg-transparent text-sm outline-none w-full ${
                  theme === "dark" ? "placeholder:text-gray-400 text-white/90" : "placeholder:text-[var(--secondary)] text-[var(--foreground)]"
                }`}
                placeholder="Search products, categories…"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`rounded-lg border px-3 py-2 text-theme-sm shadow-theme-xs ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-white/[0.03]"
                  : "border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] hover:bg-[var(--hover)]"
              }`}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Product['status'])}
              className={`rounded-lg border px-3 py-2 text-theme-sm shadow-theme-xs ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-white/[0.03]"
                  : "border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] hover:bg-[var(--hover)]"
              }`}
            >
              <option value="all">All status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Canceled">Canceled</option>
            </select>
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
                        className={`h-10 w-10 sm:h-[50px] sm:w-[50px] overflow-hidden rounded-md border ${
                          theme === "dark" ? "bg-white/[0.03] border-gray-800" : "bg-[var(--background)] border-[var(--border)]"
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
