/** @type {import('tailwindcss').Config} */
import "@tailwindcss/container-queries";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/container-queries")],
};
