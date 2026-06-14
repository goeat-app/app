const { theme } = require('./styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        poppins: ['PoppinsRegular'],
        'poppins-medium': ['PoppinsMedium'],
        'poppins-semi-bold': ['PoppinsSemiBold'],
        'plus-jakarta-sans': ['PlusJakartaRegular'],
        'plus-jakarta-medium': ['PlusJakartaMedium'],
        'plus-jakarta-semi-bold': ['PlusJakartaSemiBold'],
        'be-vietnam-pro': ['BeVietnamProRegular'],
        'be-vietnam-pro-medium': ['BeVietnamProMedium'],
        'be-vietnam-pro-semi-bold': ['BeVietnamProSemiBold'],
      },
    },
  },
  plugins: [],
};
