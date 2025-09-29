"use client";
import Image from "next/image";

import CountryMap from "./CountryMap";
import { useState } from "react";

import { Dropdown } from "../dropdown/Dropdown";
import { DropdownItem } from "../dropdown/DropdownItem";
import { useTheme } from "@/app/context/ThemeContext";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        theme === "dark"
          ? "border-gray-800 bg-white/[0.03]"
          : "border-[var(--border)] bg-[var(--panel)]"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
            }`}
          >
            Customers Demographic
          </h3>
          <p
            className={`mt-1 text-theme-sm ${
              theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
            }`}
          >
            Number of customer based on country
          </p>
        </div>

        <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className={`w-44 p-3 rounded-2xl ${
                theme === 'dark'
                  ? '!bg-[#1f2937] shadow-none'
                  : 'bg-white border !border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
              }`}
            >
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className={`flex w-full font-normal text-left rounded-lg ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                View More
              </DropdownItem>
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className={`flex w-full font-normal text-left rounded-lg ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
      </div>
      <div
        className={`px-4 py-6 my-6 overflow-hidden border rounded-2xl sm:px-6 flex items-center justify-center ${
          theme === "dark"
            ? "border-gray-800 bg-gray-900"
            : "border-[var(--border)] bg-[var(--background)]"
        }`}
      >
        <div
          id="mapOne"
          className="mapOne map-btn mx-auto w-full aspect-[2/1]"
        >
          <CountryMap
            key={theme}
            mapColor={theme === "dark" ? "#374151" : "#E4E7EC"}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-8 h-8 rounded-full overflow-hidden">
              <Image
                width={32}
                height={32}
                src="/assets/flags/us.svg"
                alt="usa"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--border)]"
              />
            </div>
            <div>
              <p
                className={`font-semibold text-theme-sm ${
                  theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
                }`}
              >
                USA
              </p>
              <span
                className={`block text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                2,379 Customers
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div
              className={`relative block h-2 w-full max-w-[100px] rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "bg-[var(--border)]"
              }`}
            >
              <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
            </div>
            <p
              className={`font-medium text-theme-sm ${
                theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
              }`}
            >
              79%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-8 h-8 rounded-full overflow-hidden">
              <Image
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--border)]"
                src="/assets/flags/fr.svg"
                alt="france"
              />
            </div>
            <div>
              <p
                className={`font-semibold text-theme-sm ${
                  theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
                }`}
              >
                France
              </p>
              <span
                className={`block text-theme-xs ${
                  theme === "dark" ? "text-gray-400" : "text-[var(--secondary)]"
                }`}
              >
                589 Customers
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div
              className={`relative block h-2 w-full max-w-[100px] rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "bg-[var(--border)]"
              }`}
            >
              <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
            </div>
            <p
              className={`font-medium text-theme-sm ${
                theme === "dark" ? "text-white/90" : "text-[var(--foreground)]"
              }`}
            >
              23%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
