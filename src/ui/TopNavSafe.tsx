import React, { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n";

const THEME_KEY = "lc_theme";
const LANG_KEY = "lc_lang";

const Sun = () => <span aria-hidden>☀️</span>;
const Moon = () => <span aria-hidden>🌙</span>;

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function TopNavSafe() {
  const { lang, setLang, t } = useI18n();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark") || null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as "pt-BR" | "en-US" | null;
    if (saved && saved !== lang) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return (
    <header
      className="w-full shadow-md text-white fixed top-0 left-0 z-50"
      style={{
        background:
          "linear-gradient(90deg, rgba(0,128,128,1) 0%, rgba(255,140,0,1) 100%)",
        height: "64px", // aqui é só 64px mesmo, sem ~
      }}
    >
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        {/* Logo + título */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-white/20 grid place-items-center font-bold">
            LC
          </div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
            {t("appTitle")}
            <span className="ml-2 text-white/70 text-sm font-normal">
              {t("modeMock")}
            </span>
          </h1>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">
          <select
            className="h-8 rounded-md bg-black/20 hover:bg-black/25 focus:outline-none focus:ring-2 focus:ring-white/70 px-2 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value as "pt-BR" | "en-US")}
          >
            <option value="pt-BR">PT-BR</option>
            <option value="en-US">EN-US</option>
          </select>

          <button
            className="h-8 w-8 rounded-md bg-black/20 hover:bg-black/25 grid place-items-center focus:outline-none focus:ring-2 focus:ring-white/70"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={t("toggleTheme")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
    </header>
  );
}
