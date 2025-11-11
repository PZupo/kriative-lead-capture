// src/ui/ThemeToggle.tsx
import { useEffect, useState } from "react";

function getInitial(): boolean {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  // fallback: preferência do SO
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitial);

  // aplica no <html> e persiste
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark(v => !v)}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
                 bg-white/20 hover:bg-white/30 active:bg-white/40
                 dark:bg-black/20 dark:hover:bg-black/30 dark:active:bg-black/40
                 text-white/90 transition-colors"
      aria-label="Alternar tema"
      title={dark ? "Tema escuro" : "Tema claro"}
    >
      <span className="text-base">{dark ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline">{dark ? "Dark" : "Light"}</span>
    </button>
  );
}
