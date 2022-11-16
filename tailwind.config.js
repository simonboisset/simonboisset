module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Ubuntu', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#6568D9',
          50: '#F8F8FD',
          100: '#E8E8F9',
          200: '#C7C8F1',
          300: '#A6A8E9',
          400: '#8688E1',
          500: '#6568D9',
          600: '#383CCE',
          700: '#292CA5',
          800: '#1E2078',
          900: '#13144B',
        },
        secondary: {
          DEFAULT: '#E86D39',
          50: '#FBE6DD',
          100: '#F9D9CB',
          200: '#F5BEA7',
          300: '#F0A382',
          400: '#EC885E',
          500: '#E86D39',
          600: '#D14F18',
          700: '#9E3C12',
          800: '#6C290D',
          900: '#3A1607',
        },
        tertiary: {
          DEFAULT: '#E4C5BB',
          50: '#FFFFFF',
          100: '#FBF7F5',
          200: '#F0DED8',
          300: '#E4C5BB',
          400: '#D4A393',
          500: '#C4806B',
          600: '#B16046',
          700: '#884A36',
          800: '#603426',
          900: '#381F16',
        },
        background: {
          DEFAULT: '#161723',
          50: '#A5A7C6',
          100: '#989BBE',
          200: '#7F83AF',
          300: '#666A9F',
          400: '#555987',
          500: '#45486E',
          600: '#353855',
          700: '#26273C',
          800: '#161723',
          900: '#040407',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
