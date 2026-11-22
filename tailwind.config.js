/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%":   { "background-position": "-200% center" },
          "100%": { "background-position":  "200% center" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.4" },
          "50%":     { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        fadeUp:  "fadeUp 0.4s ease forwards",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
