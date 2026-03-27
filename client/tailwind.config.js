/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf2f8',
          500: '#f472b6',
          600: '#ec4899',
          700: '#db2777',
          900: '#851c56',
        },
        pink: {
          50: '#fdf2f8',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#581c87',
        },
        dark: {
          900: '#08060e',
          800: '#111111', 
          700: '#1a1a2e',
          600: '#242424',
        },
        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
        },
        gold: {
          50: '#fef7e8',
          500: '#c9a84c',
          600: '#b8943f',
          700: '#a67e36',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'slideIn': 'slideIn 0.6s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(201,168,76,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

