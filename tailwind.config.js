const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#0D986A", darker: "#0E7B57" },
      },
      fontFamily: {
        sans: ["'Rubik'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
