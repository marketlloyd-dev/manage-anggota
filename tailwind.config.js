// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        himmah: {
          900: '#051912',
          800: '#0D261C',
          700: '#1A4C39',
          500: '#319B72',
        },
      },
    },
  },
  plugins: [],
};