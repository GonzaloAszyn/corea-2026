/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EA580C',
        'primary-soft': '#FB923C',
        'on-primary': '#FFFFFF',
        secondary: '#0891B2',
        'secondary-soft': '#22D3EE',
        accent: '#D97706',
        background: '#FFF1F5',
        surface: '#FFFFFF',
        ink: '#0F172A',
        'ink-soft': '#475569',
        'ink-faint': '#94A3B8',
        muted: '#FBEAF1',
        line: '#F3DCE6',
        destructive: '#DC2626',
        korea: '#E23F57',
        blush: '#F9A8D4',
        'blush-soft': '#FCE7F3'
      },
      fontFamily: {
        display: ['Gluten', 'ui-rounded', 'system-ui', 'cursive'],
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem'
      },
      boxShadow: {
        soft: '0 4px 20px -6px rgba(234, 88, 12, 0.16)',
        card: '0 8px 30px -12px rgba(15, 23, 42, 0.18)',
        float: '0 12px 34px -8px rgba(15, 23, 42, 0.28)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'sheet-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'pop': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-up': 'sheet-up 0.32s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.4s linear infinite'
      }
    }
  },
  plugins: []
}
