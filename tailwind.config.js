/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d4af37", // Updated Gold from user spec
        secondary: "#0a0a0a", // Very Dark / Black
        "secondary-light": "#1a1a1a", // Slightly lighter for sections
        accent: "#d4af37", // Gold
        "gray-light": "#F8FAFC",
        "gray-text": "#9ca3af", // Light gray from spec
        "gray-dark": "#1f2937",
        white: "#FFFFFF",
        black: "#000000",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Segoe UI Symbol', 'serif'],
        display: ['Segoe UI Symbol', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
