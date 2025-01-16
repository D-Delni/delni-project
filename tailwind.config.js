/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transform: {
        "rotate-y-30": "rotateY(30deg)",
      },
    },
  },
  plugins: [],
}

