import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          main: "#871829",
          light: "#B94A5B",
          error: "#FF7070",
          darkBg: "#5E0D19",
          lightText: "#FAE1E5",
        },
        blue: {
          darkest: "#2C2A43",
          light: "#CACAEA",
          lightest: "#E8E8F5",
          dark: "#A2A2C2",
        },
        beige: "#F5E9DB",
      },
    },
  },
  plugins: [],
} satisfies Config;
