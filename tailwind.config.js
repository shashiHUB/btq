/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#cc73f9',
          dark: '#b44ee4',
          light: '#d68ffa'
        },
        secondary: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
};