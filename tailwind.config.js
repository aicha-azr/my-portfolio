/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
"path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
       
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        }, blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      colors:{
        "BRoyal": "#1e0f75",
        "b1": "#1c1dab",
        "b2": "#3785d8",
        "b3": "#adc6e5",
        "violet": "#bf8ce1",
        "v1":"#e893c5",
        "v2":"#ebb2c3",
        "b4":"#cbd8e8",
        "bleuGreen": "#506c8a",
        "beige": "#f0dab6",
        "green": "#023246",

      }
    },
    fontFamily: {
      'pacifico': ['Pacifico', 'cursive'],
      'lugrasimo': ['Lugrasimo', 'sans-serif'],
      'greatVibes': ['Great Vibes', 'cursive'],
    },
  },
  variants: {
    // Other variants...
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
});