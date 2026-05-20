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
        burgundy: {
          DEFAULT: "#810B38",
          light: "#9d1045",
          dark: "#5c0828",
          muted: "#f5e6ec",
        },
        cream: {
          DEFAULT: "#FAF6F2",
          dark: "#F0E9E1",
          deeper: "#E8D5C4",
        },
        gold: {
          DEFAULT: "#C4956A",
          light: "#D4A97C",
          champagne: "#F0D5B5",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
          muted: "#6B6B6B",
        },
        blush: "#FDF0F4",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.15em",
        ultra: "0.25em",
        wide: "0.08em",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "burgundy-gradient": "linear-gradient(135deg, #810B38 0%, #5c0828 100%)",
        "cream-gradient": "linear-gradient(180deg, #FAF6F2 0%, #F0E9E1 100%)",
        "luxury-gradient": "linear-gradient(135deg, #FAF6F2 0%, #FDF0F4 50%, #FAF6F2 100%)",
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(129, 11, 56, 0.08)",
        "luxury-hover": "0 30px 80px rgba(129, 11, 56, 0.15)",
        soft: "0 4px 30px rgba(0, 0, 0, 0.06)",
        card: "0 8px 40px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.12)",
        burgundy: "0 8px 30px rgba(129, 11, 56, 0.25)",
        "burgundy-glow": "0 0 40px rgba(129, 11, 56, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
