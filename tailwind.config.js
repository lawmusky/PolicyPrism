/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'class' if you want to manually control dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors for our app
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#2563eb", // Our primary blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Dark mode colors
        dark: {
          bg: "#111827",
          "bg-secondary": "#1f2937",
          border: "#374151",
          text: "#f9fafb",
          "text-secondary": "#9ca3af",
        },
      },
      spacing: {
        18: "4.5rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 0, 0, 0.05)",
        card: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
  // Safelist classes that might be dynamically created
  safelist: [
    "bg-primary-600",
    "text-primary-600",
    "border-primary-600",
    {
      pattern: /bg-(red|green|blue|yellow)-(100|200|300|400|500)/,
      variants: ["hover", "focus", "dark"],
    },
  ],
};
