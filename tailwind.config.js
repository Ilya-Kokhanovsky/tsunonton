/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./static/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tsun: {
          light: "#fff0f5",
          DEFAULT: "#ff69b4",
          dark: "#db2777",
          soft: "#fce7f3",
        },
        ton: {
          blue: "#0088cc",
        },
      },
      fontFamily: {
        anime: ['"Mochiy Pop One"', "sans-serif"],
        body: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
