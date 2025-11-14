/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316', // Laranja Âmbar Principal
          dark: '#EA580C',   // Tom mais escuro para hover/active
        },
        text: {
          main: '#2D3748',   // Cinza Carvão para textos
          light: '#718096',  // Cinza mais claro para subtextos
        },
        background: {
          subtle: '#F7FAFC', // Fundo sutil
        },
        success: '#16A34A',      // Verde para confirmação
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}