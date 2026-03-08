import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A8F00',
          light: '#38B238',
          dark: '#076B00',
        },
        secondary: {
          DEFAULT: '#FFD700',
          light: '#FFE866',
          dark: '#CCAA00',
        },
        accent: {
          DEFAULT: '#007BFF',
          light: '#3399FF',
          dark: '#0056B3',
        },
        marajo: {
          'terra-vermelha': '#A0522D',
          'agua-doce': '#00BFFF',
          'ceu-azul': '#87CEEB',
          'folha-verde': '#228B22',
          'por-do-sol': '#FF8C00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
