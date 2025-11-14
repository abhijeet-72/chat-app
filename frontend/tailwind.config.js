/** @type {import('tailwindcss').Config} */
export default {
  // 1. Update the content array
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  // 2. We will handle dark mode manually
};
