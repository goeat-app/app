
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["PoppinsRegular"],
        "poppins-medium": ["PoppinsMedium"],
        "poppins-semi-bold": ["PoppinsSemiBold"],
      },
    },
  },
  plugins: [],
}