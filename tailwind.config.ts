import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ["var(--font-bodoni)", "Georgia", "serif"],
        inter:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        gold:    { DEFAULT: "#D4A843", light: "#F0CC7A", pale: "#F7E4B0", dim: "#9A7830", muted: "#6B5520" },
        ivory:   { DEFAULT: "#F9F5EE", mid: "#D8D0C0", low: "#A09080", dim: "#706050" },
        ink:     { DEFAULT: "#050505", mid: "#0E0E0E", soft: "#161616", border: "#222222", border2: "#2C2C2C" },
      },
      animation: {
        "fade-up":    "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 1.2s ease forwards",
        "shimmer":    "shimmer 5s linear infinite",
        "grain":      "grainShift 6s steps(2) infinite",
        "dot-pulse":  "dotPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity:"0", transform:"translateY(28px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        fadeIn:  { "0%": { opacity:"0" }, "100%": { opacity:"1" } },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        back: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
