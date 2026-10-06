/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFF7EA',
        cream: '#FFEFD2',
        ink: '#17123A',
        navy: '#0E1A3D',
        pop: '#FF3D81',
        sun: '#FFC62E',
        volt: '#2F5BFF',
        mint: '#2ED9A8',
        grape: '#7A3CFF',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 #17123A',
        'hard-sm': '3px 3px 0 0 #17123A',
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
