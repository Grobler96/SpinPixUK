/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#03040A',
        midnight: '#07142D',
        electric: '#168BFF',
        cyan: '#54C8FF',
        violet: '#7C3CFF',
        purple: '#B23CFF',
        magenta: '#E143FF',
        ice: '#F7F9FF',
        silver: '#B8C7E6',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
