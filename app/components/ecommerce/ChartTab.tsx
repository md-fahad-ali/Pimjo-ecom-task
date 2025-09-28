import { useTheme } from "@/app/context/ThemeContext";
import React, { useState } from "react";

const ChartTab: React.FC = () => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

  const { theme } = useTheme();

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree") => {
    const isDark = theme === "dark";
    if (selected === option) {
      return isDark
        ? "shadow-theme-xs text-white bg-gray-800"
        : "shadow-theme-xs text-gray-900 bg-white";
    }
    return isDark ? "text-gray-400" : "text-gray-500";
  };

  return (
    <div className={`flex items-center gap-0.5 rounded-lg ${ theme === "dark" ? "bg-gray-900" : "bg-gray-100"}  p-0.5 `}>
      <button
        onClick={() => setSelected("optionOne")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${theme === "dark" ? "hover:text-white" : "hover:text-gray-900"} ${getButtonClass(
          "optionOne"
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setSelected("optionTwo")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${theme === "dark" ? "hover:text-white" : "hover:text-gray-900"} ${getButtonClass(
          "optionTwo"
        )}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => setSelected("optionThree")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${theme === "dark" ? "hover:text-white" : "hover:text-gray-900"} ${getButtonClass(
          "optionThree"
        )}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;
