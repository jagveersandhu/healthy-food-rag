/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gemini-bg": "#0e0e0e",
        "gemini-pill": "#1e1f20",
      },
    },
  },
  plugins: [],
};