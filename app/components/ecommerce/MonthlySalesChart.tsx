"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../dropdown/Dropdown";
import { useTheme } from "@/app/context/ThemeContext";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


export default function MonthlySalesChart() {
  const { theme } = useTheme();
  const options: ApexOptions = {
    colors: ["var(--brand)"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "var(--secondary)",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: {
        colors: "var(--foreground)",
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        style: {
          colors: "var(--secondary)",
          fontSize: "12px",
        },
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      borderColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(15, 23, 42, 0.05)",
      strokeDashArray: 0,
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Sales",
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className={`dashboard-theme overflow-hidden rounded-2xl border border-[var(--border)] ${theme === "dark"? "bg-white/[0.03]": "bg-[var(--panel)]"}  px-5 pt-5 sm:px-6 sm:pt-6`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Monthly Sales
        </h3>

        <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className={`w-44 p-3 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-[#0F172A] shadow-none'
                  : 'bg-white border border-slate-300 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
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

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
