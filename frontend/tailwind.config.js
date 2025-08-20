/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'poker-dark': '#0a0a0a',
        'poker-felt': '#1a4d3a',
        'poker-felt-light': '#2d6b4d',
        'poker-red': '#dc2626',
        'poker-gold': '#f59e0b',
        'poker-silver': '#e5e5e5',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
