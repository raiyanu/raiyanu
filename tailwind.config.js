/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          bg: "var(--primary-bg)",
          content: "var(--primary-content)",
        },
        secondary: {
          bg: "var(--secondary-bg)",
          content: "var(--secondary-content)",
        },
        accent: "var(--accent)",
        light: {
          bg: "var(--light-bg)",
        },
        muted: {
          content: "var(--muted-content)",
        },
      },
      fontFamily: {
        'sans': ['poppins', 'system-ui', ...defaultTheme.fontFamily.sans],
        // 'serif': ['ui-serif', 'Georgia', ],
        // 'mono': ['ui-monospace', 'SFMono-Regular',],
        // 'display': ['Oswald',],
        // 'body': ['"Open Sans"',],
      }
    },
  },
  plugins: [],
};
