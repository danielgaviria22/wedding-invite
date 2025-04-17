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
    keyframes: {
      fade: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "fade-in-left": {
        "0%": { opacity: "0", transform: "translateX(-50px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      "fade-in-right": {
        "0%": { opacity: "0", transform: "translateX(50px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      "fade-in-up": {
        "0%": { opacity: "0", transform: "translateY(50px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      fade: "fade 1s ease-out forwards",
      "fade-in-left": "fade-in-left 1s ease-out forwards",
      "fade-in-right": "fade-in-right 1s ease-out forwards",
      "fade-in-up": "fade-in-up 1s ease-out 0.4s forwards",
    },
  },
  plugins: [],
} satisfies Config;
