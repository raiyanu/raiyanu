/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          surface: "var(--bg-surface)",
          "surface-hover": "var(--bg-surface-hover)",
          elevated: "var(--bg-elevated)",
          inverted: "var(--bg-inverted)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          soft: "var(--accent-soft)",
          secondary: "var(--accent-secondary)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
          accent: "var(--border-accent)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", ...defaultTheme.fontFamily.sans],
        display: ["Syne", "Poppins", "system-ui", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", "ui-monospace", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
        "label": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.06em" }],
      },
      spacing: {
        section: "var(--section-padding)",
        nav: "var(--nav-height)",
      },
      maxWidth: {
        content: "var(--content-max-width)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        surface: "var(--shadow-sm)",
        "surface-md": "var(--shadow-md)",
        "surface-lg": "var(--shadow-lg)",
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee var(--marquee-duration, 30s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 30s) linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s var(--ease-out-expo) forwards",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-expo": "var(--ease-in-expo)",
        "in-out-expo": "var(--ease-in-out-expo)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
    },
  },
  plugins: [],
};
