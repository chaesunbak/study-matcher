/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      red: {
        500: '#EF4444',
        600: '#DC2626',
      },
      white: '#ffffff',
      black: '#212124',
      primary: '#00CC99',
      gray: {
        100: '#f8f9fa',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#868e96',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
      },
      slate: {
        100: '#f9f9f9',
        200: '#f4f4f4',
        300: '#e9ecef',
        400: '#dee2e6',
        500: '#ced4da',
        600: '#adb5bd',
        700: '#868e96',
        800: '#495057',
        900: '#343a40',
      },
      blue: {
        300: '#93c5fd',
        400: '#60a5fa',
      },
      green: {
        500: '#22c55e',
      },
    },
    extend: {},
  },
  plugins: [],
};
