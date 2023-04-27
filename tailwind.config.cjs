/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '550px',
      // => @media (min-width: 640px) { ... }

      md: '640px',
      // => @media (min-width: 768px) { ... }

      // lg: '800px',
      // => @media (min-width: 1024px) { ... }

      // xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      // '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'regal-blue': '#5394ea',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        kebab: {
          'bg-dm': '#12538b',
          bg: '#0a1e3f',
          bg2: 'rgba(0, 0, 0, 0.315)',
          border: '#005daa',
          border2: '#008cff',
          border3: '#008cff9c',
          border4: '#008cff6b',
          border5: '#008cff34',
          link: '#008cff',
          find: 'rgb(212, 212, 212)',
          th: '#00285c',
          odd: 'rgba(0, 0, 0, 0.1)',
          even: 'rgba(0, 0, 0, 0.05)',
          btn: '#092d4b',
        },
      },
      transitionProperty: {
        width: 'width',
      },
      textDecoration: ['active'],
      minWidth: {
        kanban: '28rem',
      },
    },
  },
  plugins: [],
};
