/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "BRoyal": "#1e0f75",
        "b1": "#1c1dab",
        "b2": "#3785d8",
        "b3": "#adc6e5",
        "violet": "#bf8ce1",
        "v1":"#e893c5",
        "v2":"#ebb2c3",
        "b4":"#cbd8e8",
      }
    },
    fontFamily: {
      'pacifico': ['Pacifico', 'cursive'],
      'lugrasimo': ['Lugrasimo', 'sans-serif'],
      'greatVibes': ['Great Vibes', 'cursive'],
    },
  },
  plugins: [],
}