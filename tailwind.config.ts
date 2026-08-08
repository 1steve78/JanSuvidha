import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        health: "#ec4899",
        housing: "#f59e0b",
        education: "#3b82f6",
        civic: "#6366f1",
        safety: "#1e3a8a",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
