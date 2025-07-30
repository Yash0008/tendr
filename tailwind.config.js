/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kulfam:["Kufam", "sans-serif"]
      },
      screens: {
        xs: '450px'
      }
    },
  },
  plugins: [],
}
