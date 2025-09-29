"use client";
import React from "react";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/app/components/ecommerce/Table";
import Badge from "@/app/components/badge/Badge";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/products?page=${page}&limit=${limit}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        if (mounted) {
          setProducts(data.products ?? []);
          setTotalPages(data.totalPages ?? 1);
        }
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
  }, [page]);

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


  const pageList = useMemo<(number | string)[]>(() => {
    const total = totalPages;
    const current = page;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const list: (number | string)[] = [1, 2];
    if (current > 4) list.push("…");
    const start = Math.max(3, current - 1);
    const end = Math.min(total - 2, current + 1);
    for (let i = start; i <= end; i++) list.push(i);
    if (current < total - 3) list.push("…");
    list.push(total - 1, total);
    return list;
  }, [page, totalPages]);
  return (
    <div className="dashboard-theme">
      {/* Toolbar card */}
      <div
        className={`overflow-hidden rounded-2xl border ${theme === "dark"
            ? "border-[#1D2939] bg-[rgba(255,255,255,0.03)]"
            : "border-[#E4E7EC] bg-[#FFFFFF]"
          }`}
      >
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex flex-col gap-1">
            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white/90" : "text-[#1D2939]"}`}>All products</h2>
            
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:w-auto w-full">
            {/* Search input */}
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 shadow-theme-xs flex-1 min-w-[200px] border ${theme === "dark"
                ? "border-[#344054] bg-[#101828]"
                : "border-[#D0D5DD] bg-[#FFFFFF]"
              }`}>
              <svg className="" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3823 13.3831L16.7074 16.7081M15.4584 8.37412C15.4584 12.2852 12.2871 15.4558 8.37508 15.4558C4.46306 15.4558 1.29175 12.2852 1.29175 8.37412C1.29175 4.46304 4.46306 1.29248 8.37508 1.29248C12.2871 1.29248 15.4584 4.46304 15.4584 8.37412Z" stroke={theme === "dark" ? "#98A2B3" : "#667085"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`text-sm outline-none w-full bg-transparent ${theme === "dark"
                    ? "placeholder:text-[#475467] text-white/90"
                    : "placeholder:text-[#98A2B3] text-[#1D2939]"
                  }`}
                placeholder="Search…"
              />
            </div>

            {/* Date button */}
            <button className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm font-medium shadow-theme-xs whitespace-nowrap ${theme === "dark"
                ? "border-[#344054] bg-[#1D2939] text-[#98A2B3] hover:bg-[rgba(255,255,255,0.03)]"
                : "border-[#D0D5DD] bg-[#FFFFFF] text-[#344054] hover:bg-[#F9FAFB]"
              }`}>
              <svg className={theme === "dark" ? "stroke-[#98A2B3]" : "stroke-[#667085]"} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 2.5V5M15 2.5V5M3.333 8.333h13.334M4.167 4.167h11.666A1.667 1.667 0 0 1 17.5 5.833v10A1.667 1.667 0 0 1 15.833 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833v-10A1.667 1.667 0 0 1 4.167 4.167Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              05 Feb - 06 March
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className={`border-y ${theme === "dark" ? "border-[#1D2939]" : "border-[#E4E7EC]"}`}>
              <TableRow>
                <TableCell isHeader className={`py-3 px-4 sm:px-6 text-start text-theme-xs font-medium ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>Products</TableCell>
                <TableCell isHeader className={`py-3 px-4 sm:px-6 text-start text-theme-xs font-medium hidden sm:table-cell ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>Category</TableCell>
                <TableCell isHeader className={`py-3 px-4 sm:px-6 text-start text-theme-xs font-medium hidden sm:table-cell ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>Price</TableCell>
                <TableCell isHeader className={`py-3 px-4 sm:px-6 text-start text-theme-xs font-medium ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className={`divide-y ${theme === "dark" ? "divide-[#1D2939]" : "divide-[#F2F4F7]"}`}>
              {loading && (
                <TableRow>
                  <TableCell className="py-16" colSpan={4}>
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={16} className={theme === "dark" ? "text-gray-400" : "text-[#667085]"} />
                      <span className={theme === "dark" ? "text-gray-400" : "text-[#667085]"}>Loading products...</span>
                    </div>
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
                        className={`h-10 w-10 sm:h-[50px] sm:w-[50px] overflow-hidden rounded-md border ${theme === "dark" ? "bg-white/[0.03] border-[#1D2939]" : "bg-[#FFFFFF] border-[#F2F4F7]"
                          }`}
                      >
                        <Image src={p.image} alt={p.name} width={50} height={50} className="h-10 w-10 sm:h-[50px] sm:w-[50px] object-cover" />
                      </div>
                      <div>
                        <p className={`text-theme-sm font-medium ${theme === "dark" ? "text-white/90" : "text-[#1D2939]"}`}>{p.name}</p>
                        <span className={`text-theme-xs ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>{p.variants}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm hidden sm:table-cell ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>{p.category}</TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm hidden sm:table-cell ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>{p.price}</TableCell>
                  <TableCell className={`py-3 px-4 sm:px-6 text-theme-sm ${theme === "dark" ? "text-[#98A2B3]" : "text-[#667085]"}`}>
                    <Badge size="sm" color={p.status === "Delivered" ? "success" : p.status === "Pending" ? "warning" : "error"}>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between border-t px-4 py-3 sm:px-6 sm:py-4 ${theme === "dark" ? "border-[#1D2939]" : "border-[#E4E7EC]"}`}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={loading || page <= 1}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark"
              ? "border-[#344054] bg-[#1D2939] text-[#98A2B3] hover:bg-[rgba(255,255,255,0.03)]"
              : "border-[#D0D5DD] bg-[#FFFFFF] text-[#344054] hover:bg-[#F9FAFB]"
            }`}
          >
            <FaArrowLeft color={`${theme === "dark" ? "#98A2B3" :"#344054"}`}/>
            Previous
          </button>
          <div className="hidden sm:flex items-center gap-3">
            {pageList.map((token, idx) => {
              if (typeof token === 'string') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className={`${theme === 'dark' ? 'text-[#98A2B3]' : 'text-[#667085]'} text-sm select-none`}
                  >
                    {token}
                  </span>
                );
              }
              const isActive = token === page;
              return (
                <button
                  key={token}
                  onClick={() => setPage(token)}
                  disabled={loading}
                  className={
                    `h-10 w-10 rounded-xl text-sm font-medium disabled:cursor-not-allowed ` +
                    (theme === 'dark'
                      ? isActive
                        ? 'bg-[#3758F9] text-white border border-transparent'
                        : 'text-[#98A2B3] border border-transparent hover:bg-white/[0.03]'
                      : isActive
                        ? 'bg-[#3758F9] text-white border border-transparent'
                        : 'border border-[#D0D5DD] text-[#667085] bg-[#FFFFFF] hover:bg-[#F9FAFB]')
                  }
                >
                  {token}
                </button>
              );
            })}
          </div>
          {/* Mobile page text */}
          <div className={`sm:hidden text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-[#1D2939]"}`}>
            Page {page} of {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={loading || page >= totalPages}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-theme-sm disabled:opacity-50 disabled:cursor-not-allowed ${theme === "dark"
                ? "border-[#344054] bg-[#1D2939] text-[#98A2B3] hover:bg-[rgba(255,255,255,0.03)]"
                : "border-[#D0D5DD] bg-[#FFFFFF] text-[#344054] hover:bg-[#F9FAFB]"
              }`}
          >
            Next

            <FaArrowRight color={`${theme === "dark" ? "#98A2B3" :"#344054"}`}/>

          </button>
        </div>
      </div>
    </div>
  );
}
