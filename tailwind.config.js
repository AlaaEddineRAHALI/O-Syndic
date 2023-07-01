/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001f3f",
        secondary: "#1BAF08",
        tertiary: "#FFFFFF",
      },
      backgroundImage: {
        "header-bg": "url('/src/assets/images/bg.png.jpg')",
      },
    },
  },
  plugins: [],
};
