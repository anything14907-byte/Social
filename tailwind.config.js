/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vyapar: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        terracotta: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
        },
        sand: {
          50: '#FAF9F6',
          100: '#F4F1EA',
          200: '#EAE5D9',
          300: '#DCD4C0',
          800: '#2C271E',
          900: '#1B1712',
        },
        dark: {
          bg: '#090D0C',
          surface: '#111716',
          card: '#161F1D',
          border: '#243330',
          hover: '#1D2A27',
          textMuted: '#94A3A0',
        },
        light: {
          bg: '#F8FAF9',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8E5',
          hover: '#F0F4F2',
          textMuted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'heart-burst': 'heartBurst 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        heartBurst: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.25)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
