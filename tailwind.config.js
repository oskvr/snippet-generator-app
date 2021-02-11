const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
      height: {
        "80vh": "80vh",
      },
      colors: {
        primary: colors.lightBlue,
        "primary-dark": colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
    },
  },
  plugins: [],
};
