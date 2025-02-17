/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          mint: "#03ceb3",
          cyan: "#08fcdb",
          pink: "#ff1493",
          magenta: "#ff69b4",
          lavender: "#e6e6fa",
          purple: "#9370db",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#03ceb3",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#ff1493",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#9370db",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "cosmic-gradient":
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-14%20at%2017.26.38-UsfCPrQJvSy46s2cB8M55eJI1NAE4W.jpeg")',
      },
    },
  },
}

