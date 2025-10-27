/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        card: "var(--card)",
        border: "var(--border)",
        teal: "#008080",
        orange: "#FF8C00"
      },
      borderRadius: { base: "12px" }
    }
  },
  plugins: []
}
