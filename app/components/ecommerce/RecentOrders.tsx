"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./Table";
import Badge from "../badge/Badge";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";

// Define the TypeScript interface for the table rows
interface Order {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

export default function RecentOrders() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        if (mounted) setOrders(data.orders ?? []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load orders";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div
      className={`overflow-hidden rounded-2xl border px-4 pb-3 pt-4 sm:px-6 ${
        theme === "dark"
          ? "border-gray-800 bg-white/[0.03]"
          : "border-[var(--border)] bg-[var(--panel)]"
      }`}
    >
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
            }`}
          >
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-theme-sm font-medium shadow-theme-xs ${
              theme === "dark"
                ? "border-gray-700 bg-gray-800 text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
                : "border-[var(--border)] bg-[var(--panel)] text-[var(--secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            }`}
          >
            <svg
              className={`stroke-current ${
                theme === "dark" ? "fill-gray-800" : "fill-[var(--panel)]"
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-theme-sm font-medium shadow-theme-xs ${
              theme === "dark"
                ? "border-gray-700 bg-gray-800 text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
                : "border-[var(--border)] bg-[var(--panel)] text-[var(--secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            }`}
          >
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader
            className={`border-y ${
              theme === "dark" ? "border-gray-800" : "border-[var(--border)]"
            }`}
          >
            <TableRow>
              <TableCell
                isHeader
                className={`py-3 font-medium text-start text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className={`py-3 font-medium text-start text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className={`py-3 font-medium text-start text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className={`py-3 font-medium text-start text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody
            className={`divide-y ${
              theme === "dark" ? "divide-gray-800" : "divide-[var(--border)]"
            }`}
          >
            {loading && (
              <TableRow>
                <TableCell className="py-6" colSpan={4}>
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span className={theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"}>Loading orders...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {error && !loading && (
              <TableRow>
                <TableCell className="py-6" colSpan={4}>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-red-500">{error}</span>
                    <button
                      onClick={async () => {
                        setLoading(true);
                        setError(null);
                        try {
                          const res = await fetch("/api/orders", { cache: "no-store" });
                          if (!res.ok) throw new Error("Failed to load orders");
                          const data = await res.json();
                          setOrders(data.orders ?? []);
                        } catch (e: unknown) {
                          const message = e instanceof Error ? e.message : "Failed to load orders";
                          setError(message);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="px-3 py-1 text-sm border rounded"
                    >
                      Retry
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && orders && orders.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium text-theme-sm ${
                          theme === "dark"
                            ? "text-white/90"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        {product.name}
                      </p>
                      <span
                        className={`text-theme-xs ${
                          theme === "dark"
                            ? "text-gray-400"
                            : "text-[var(--secondary)]"
                        }`}
                      >
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`py-3 text-theme-sm ${
                    theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                  }`}
                >
                  {product.price}
                </TableCell>
                <TableCell
                  className={`py-3 text-theme-sm ${
                    theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                  }`}
                >
                  {product.category}
                </TableCell>
                <TableCell
                  className={`py-3 text-theme-sm ${
                    theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                  }`}
                >
                  <Badge
                    size="sm"
                    color={
                      product.status === "Delivered"
                        ? "success"
                        : product.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
