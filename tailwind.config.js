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
      colors: {
        custom: {
          orange:{
            'default': "#DDA95A",
            'light-dark': "#602D15",
            'dark': "#764928",
          }
        }
      }
    },
  },
  plugins: [],
}

