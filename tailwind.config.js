/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./popup.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#353535",
        primary: "#3c6e71",
        surface: "#ffffff",
        muted: "#d9d9d9",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
