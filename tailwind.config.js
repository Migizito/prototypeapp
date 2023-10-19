/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0090EB",
        secondary: {
          100: "#1E1F25",
          900: "#131517",
        },
        third: "#3F93A2",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@headlessui/tailwindcss")],
};
