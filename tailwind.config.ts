import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aurelia: {
          ivory: "#fbf8f1",
          cream: "#f2eadc",
          porcelain: "#fffdf8",
          sand: "#dac7ad",
          champagne: "#cda75a",
          gold: "#b48735",
          ink: "#1e1914",
          charcoal: "#312a24",
          blush: "#d9b6a8",
          sage: "#a8afa0"
        }
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        aurelia: "0 22px 60px rgba(64, 48, 31, 0.12)",
        soft: "0 14px 36px rgba(45, 35, 24, 0.08)"
      },
      backgroundImage: {
        "champagne-line":
          "linear-gradient(90deg, transparent, rgba(205, 167, 90, 0.55), transparent)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "image-reveal": {
          "0%": { opacity: "0", transform: "scale(1.025)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        "image-reveal": "image-reveal 900ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
