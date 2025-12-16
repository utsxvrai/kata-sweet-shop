/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF5E1',
        saffron: '#FFB300',
        maroon: '#800000',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}
