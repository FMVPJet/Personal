import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f1217",
        knight: "#2a2f35",
      },
      fontFamily: {
        oleo: ["var(--font-oleo)", "cursive"],
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fade: "fade 1s ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
