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
        brand: {
          saffron: '#FF6F00',
          pink: '#E1306C',
          purple: '#833AB4',
          gold: '#FFB800',
          blue: '#1DA1F2',
          verified: '#0095F6'
        },
        dark: {
          bg: '#000000',
          surface: '#121212',
          card: '#181818',
          border: '#282828',
          hover: '#1f1f1f',
          textMuted: '#A8A8A8'
        },
        light: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          hover: '#F3F4F6',
          textMuted: '#737373'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'heart-burst': 'heartBurst 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        heartBurst: {
          '0%': { transform: 'scale(0) rotate(-15deg)', opacity: '0' },
          '50%': { transform: 'scale(1.3) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
