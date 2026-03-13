import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003366",
          light: "#0066CC",
          dark: "#00264D",
        },
        secondary: {
          DEFAULT: "#0066CC",
          light: "#3385D6",
          dark: "#004C99",
        },
        accent: {
          DEFAULT: "#FF6600",
          light: "#FF8533",
          dark: "#E55A00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

export default config
