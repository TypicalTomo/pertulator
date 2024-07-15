import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--color-black)',
        darker: 'var(--color-darker)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        lighter: 'var(--color-lighter)',
        white: 'var(--color-white)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          lighter: 'var(--color-primary-lighter)',
          darker: 'var(--color-primary-darker)',
        },
        foreground: {
          DEFAULT: 'var(--color-foreground)',
          hihglighted: 'var(--color-foreground-highlighted)',
          inverted: 'var(--color-foreground-inverted)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          hihglighted: 'var(--color-background-highlighted)',
          inverted: 'var(--color-background-inverted)',
        },
      },
      fontFamily: {
        sans: 'var(--family-sans)',
        serif: 'var(--family-serif)',
        monospace: 'var(--family-monospace)',
        heading: 'var(--family-heading)',
        body: 'var(--family-body)',
        code: 'var(--family-code)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
