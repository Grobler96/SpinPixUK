/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F1FF',
        ink: '#07050C',
        card: '#130B22',
        line: '#3B1E63',
        navy: '#050B1F',
        pop: '#FF2E93',
        sun: '#FF8AD0',
        volt: '#2F7BFF',
        mint: '#4DE1FF',
        grape: '#8B3DFF',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 #8B3DFF',
        'hard-sm': '3px 3px 0 0 #8B3DFF',
        soft: '0 20px 50px -20px rgba(23,18,58,0.35)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        wobble: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        flash: { '0%': { opacity: '0' }, '8%': { opacity: '1' }, '100%': { opacity: '0' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        wobble: 'wobble 4s ease-in-out infinite',
        flash: 'flash 1.2s ease-out',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
