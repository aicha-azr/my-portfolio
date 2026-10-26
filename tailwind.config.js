/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0d0c0b",
        coal: "#161513",
        line: "#2b2925",
        paper: "#efeae2",
        mute: "#8d877d",
        acid: "#d7ff3a",
      },
      fontFamily: {
        display: ["'Instrument Serif'", "serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        rise: "rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        blink: "blink 1s steps(1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
