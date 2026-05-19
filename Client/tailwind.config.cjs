const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: {
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',
        },
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          light: '#e0e7ff',
          dark: '#4338ca',
        },
        secondary: {
          DEFAULT: '#64748b',
          light: '#f1f5f9',
          dark: '#94a3b8',
        },
        success: {
          DEFAULT: '#10b981',
          light: '#d1fae5',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
        },
        text: {
          main: '#0f172a',
          muted: '#64748b',
          inverted: '#f8fafc',
        },
      },

      /* ✅ ADDED HERE — this was missing */
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
};
