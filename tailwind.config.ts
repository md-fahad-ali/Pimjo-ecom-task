import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg-custom': '1288px',
        'xl-custom': '1386px',
      },
      colors: {
        background: "var(--background)",
        panel: "var(--panel)",
        border: "var(--border)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        brand: {
          50: "#F0F2FF",
          400: "#9CB9FF",
          500: "#465FFF",
        },
        success: {
          50: "#ECFDF3",
          500: "#12B76A",
          600: "#027A48",
        },
        error: {
          50: "#FEF3F2",
          500: "#F04438",
          600: "#D92D20",
        },
      },
    },
  },
  plugins: [],
};
export default config;
