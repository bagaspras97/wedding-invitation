import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f6f1ea",
        ivory: "#fbf8f3",
        sand: "#e8dfd2",
        stone: "#8a7e6e",
        ink: "#2b2620",
        accent: "#b89968",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
    },
  },
  plugins: [],
};

export default config;
