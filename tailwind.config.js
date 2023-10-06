/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'currentlocation': "url('assets/currentlocation.jpg')",
        'Frankfurt': "url('assets/Frankfurt.jpg')",
        'Dubai': "url('assets/Dubai.jpg')",
        'Madrid': "url('assets/Madrid.jpg')",
        'Singapur': "url('assets/Singapur.jpg')",
      }
    },
  },
  
  plugins: [require("daisyui")],
}
