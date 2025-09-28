"use client";
import React, { useEffect, useState } from "react";
import Badge from "../badge/Badge";
import { IoCubeOutline } from "react-icons/io5";
import { LuArrowDownRight } from "react-icons/lu";
import { useTheme } from "@/app/context/ThemeContext";
import Spinner from "@/app/components/Spinner";

type Stats = {
  customers: number;
  customersChange: number; // percentage
  orders: number;
  ordersChange: number; // percentage
};

export const EcommerceMetrics = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();
        if (mounted) setStats(data.stats);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load stats";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className={`rounded-2xl border border-[var(--border)] ${theme === "dark"? "bg-white/[0.03]": "bg-[var(--panel)]"}  p-5 md:p-6`}>
        <div className="flex items-center justify-center w-12 h-12 bg-[var(--hover)] rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className={`${theme === "dark" ? "text-white/90":"text-gray-800"} size-6`}><path fill="currentColor" fill-rule="evenodd" d="M8.804 5.602a2.197 2.197 0 1 0 0 4.393 2.197 2.197 0 0 0 0-4.393M5.107 7.799a3.697 3.697 0 1 1 7.394 0 3.697 3.697 0 0 1-7.394 0m-.244 7.522c-.775.767-1.16 1.74-1.346 2.54a.37.37 0 0 0 .09.35c.095.103.26.188.469.188h9.349c.21 0 .374-.085.469-.188a.37.37 0 0 0 .09-.35c-.187-.8-.57-1.773-1.346-2.54-.756-.749-1.948-1.366-3.888-1.366s-3.131.617-3.887 1.366m-1.056-1.066c1.065-1.054 2.649-1.8 4.943-1.8 2.295 0 3.88.746 4.944 1.8 1.046 1.036 1.527 2.306 1.75 3.265.322 1.377-.837 2.379-2.02 2.379H4.077c-1.182 0-2.341-1.002-2.02-2.379.224-.96.705-2.23 1.751-3.265m11.497-2.76a3.68 3.68 0 0 1-2.222-.742c.292-.422.523-.889.681-1.389a2.197 2.197 0 1 0 0-3.132c-.158-.5-.389-.966-.681-1.388a3.697 3.697 0 1 1 2.222 6.652m4.62 8.404H16.39a3.14 3.14 0 0 0 .593-1.5h2.942c.21 0 .374-.085.469-.188a.37.37 0 0 0 .09-.35c-.187-.8-.571-1.773-1.346-2.54-.733-.726-1.877-1.329-3.715-1.364a7.4 7.4 0 0 0-1.431-1.42 9 9 0 0 1 1.258-.082c2.295 0 3.88.746 4.944 1.8 1.046 1.036 1.527 2.306 1.75 3.265.322 1.377-.837 2.379-2.02 2.379" clip-rule="evenodd"></path></svg>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-[var(--secondary)]">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-[var(--foreground)] text-title-sm">
              {loading ? "—" : error ? "—" : stats?.customers?.toLocaleString()}
            </h4>
          </div>
          {loading ? (
            <Badge color="light"><Spinner size={14} className="mr-1 align-middle" /> Loading</Badge>
          ) : error ? (
            <Badge color="error">Failed</Badge>
          ) : (
            <Badge color={stats && stats.customersChange >= 0 ? "success" : "error"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M6.065 1.624a.75.75 0 0 1 .558-.25h.001c.192 0 .384.073.531.22l3 2.998a.75.75 0 1 1-1.06 1.06l-1.722-1.72v6.193a.75.75 0 0 1-1.5 0v-6.19L4.155 5.654a.75.75 0 0 1-1.06-1.061z" clip-rule="evenodd"></path></svg>
              {Math.abs(stats?.customersChange ?? 0).toFixed(2)}%
            </Badge>
          )}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className={`rounded-2xl border border-[var(--border)] ${theme === "dark"? "bg-white/[0.03]": "bg-[var(--panel)]"}  p-5 md:p-6`}>
        <div className={`flex items-center justify-center w-12 h-12 bg-[var(--hover)] rounded-xl`}>
          <IoCubeOutline className="text-[23px] text-[var(--foreground)]" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-[var(--secondary)]">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-[var(--foreground)] text-title-sm">
              {loading ? "—" : error ? "—" : stats?.orders?.toLocaleString()}
            </h4>
          </div>

          {loading ? (
            <Badge color="light"><Spinner size={14} className="mr-1 align-middle" /> Loading</Badge>
          ) : error ? (
            <Badge color="error">Failed</Badge>
          ) : (
            <Badge color={stats && stats.ordersChange >= 0 ? "success" : "error"}>
              {stats && stats.ordersChange >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" class="text-error-500"><path fill="currentColor" fill-rule="evenodd" d="M5.315 10.376c.137.153.336.25.558.25h.001a.75.75 0 0 0 .531-.22l3-2.998a.75.75 0 1 0-1.06-1.06l-1.722 1.72V1.875a.75.75 0 1 0-1.5 0v6.19L3.405 6.346a.75.75 0 0 0-1.06 1.061z" clip-rule="evenodd"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" class="text-error-500"><path fill="currentColor" fill-rule="evenodd" d="M5.315 10.376c.137.153.336.25.558.25h.001a.75.75 0 0 0 .531-.22l3-2.998a.75.75 0 1 0-1.06-1.06l-1.722 1.72V1.875a.75.75 0 1 0-1.5 0v6.19L3.405 6.346a.75.75 0 0 0-1.06 1.061z" clip-rule="evenodd"></path></svg>
              )}
              {Math.abs(stats?.ordersChange ?? 0).toFixed(2)}%
            </Badge>
          )}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
