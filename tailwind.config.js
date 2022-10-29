const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0D986A",
      },
      fontFamily: {
        sans: ["'Rubik'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
