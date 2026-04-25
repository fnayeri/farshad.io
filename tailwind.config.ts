import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      colors: {
        ink: "#1d1d1f",
        muted: "#86868b",
        secondary: "#6e6e73",
        hairline: "#d2d2d7",
        surface: "#f5f5f7",
      },
      maxWidth: {
        site: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
