/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#34CAA5",
        gray: "#B2ABAB",
        dark_blue: "#6160DC",
        blue: "#54C5EB",
        yellow: "#FFB74A",
        red: "#FF4A55",
        light: {
          400: "#FAFAFA",
          DEFAULT: "#FFFFFF",
        },
        dark: {
          400: "#1e293b",
          DEFAULT: "#0f172a",
        }
      }
    },
  },
  plugins: [],
}

