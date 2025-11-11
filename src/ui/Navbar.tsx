// src/ui/Navbar.tsx
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useI18n, type Lang } from "../lib/i18n";
import { useCredits } from "../lib/credits";
import AddCreditsButton from "../components/billing/AddCreditsButton";

type NavbarProps = {
  onOpenPlans: () => void;
};

export default function Navbar({ onOpenPlans }: NavbarProps) {
  const { lang, setLang } = useI18n();
  const LANGS: Lang[] = ["pt-BR", "en-US"];
  const { credits } = useCredits();

  return (
    <header
      className="sticky top-0 z-40 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, rgba(5,112,78,1) 0%, rgba(234,179,8,1) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Marca/Título */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-white/25 flex items-center justify-center text-white font-bold">
            LC
          </div>
          <div className="text-white">
            <div className="text-lg font-semibold leading-5">
              Kriative Lead Capture
            </div>
            <div className="text-xs opacity-80">mock</div>
          </div>
        </div>

        {/* Ações (Planos + idioma + tema + créditos) */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Botão Planos */}
          <button
            type="button"
            onClick={onOpenPlans}
            className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-xs md:text-sm text-white font-medium transition"
          >
            Planos
          </button>

          {/* Idioma */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="px-2 py-1 rounded bg-white/20 text-white text-xs md:text-sm outline-none focus:ring-2 focus:ring-white/50"
          >
            {LANGS.map((l) => (
              <option key={l} value={l} className="text-black">
                {l === "pt-BR" ? "PT-BR" : "EN-US"}
              </option>
            ))}
          </select>

          {/* Tema */}
          <ThemeToggle />

          {/* Créditos + Adicionar (mock) */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs bg-teal-700 text-white">
              Créditos: {credits}
            </span>
            <AddCreditsButton />
          </div>
        </div>
      </div>
    </header>
  );
}
