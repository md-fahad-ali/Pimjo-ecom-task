"use client";
import React, { useEffect, useState } from "react";
import Badge from "../badge/Badge";
import { IoCubeOutline } from "react-icons/io5";
import { LuArrowDownRight } from "react-icons/lu";
import { ArrowUpIcon, GroupIcon } from "lucide-react";
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
          <GroupIcon className="text-[var(--foreground)] size-6" />
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
              <ArrowUpIcon />
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
                <LuArrowDownRight className="rotate-180 text-success-500" />
              ) : (
                <LuArrowDownRight className="text-error-500" />
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
