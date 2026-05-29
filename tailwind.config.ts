import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "var(--bg-primary)",
        secondaryBg: "var(--bg-secondary)",
        glassBg: "var(--glass-bg)",
        glassBorder: "var(--glass-border)",
        primaryText: "var(--text-primary)",
        secondaryText: "var(--text-secondary)",
        accent: "var(--accent)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(232, 213, 176, 0.28), 0 12px 44px rgba(232, 213, 176, 0.2)"
      },
      animation: {
        driftA: "driftA 24s ease-in-out infinite",
        driftB: "driftB 30s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite"
      },
      keyframes: {
        driftA: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(24px,-18px,0)" }
        },
        driftB: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-18px,20px,0)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".72" }
        }
      }
    }
  },
  plugins: []
};

export default config;
