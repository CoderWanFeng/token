/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        'primary-light': '#818CF8',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
        background: '#0F172A',
        surface: '#1E293B',
        'surface-light': '#334155',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        success: '#10B981',
        warning: '#F59E0B',
        border: '#475569',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
