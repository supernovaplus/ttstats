/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      //mobile first
      // sm: '550px',
      // // => @media (min-width: 640px) { ... }

      // md: '640px',
      // // => @media (min-width: 768px) { ... }


      //desktop first

      // xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "950px" },
			// => @media (max-width: 950px) { ... }

			md: { max: "660px" },
			// => @media (max-width: 640px) { ... }

			sm: { max: "550px" },
			// => @media (max-width: 550px) { ... }
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
          dk: 'rgba(0, 0, 0, 0.2)',
          btn: '#092d4b',
        },
      },
      transitionProperty: {
        width: 'width',
      },
      textDecoration: ['active'],
    },
  },
  plugins: [],
};
