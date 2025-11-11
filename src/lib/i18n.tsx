import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = 'pt-BR' | 'en-US';

type Dict = Record<string, { "pt-BR": string; "en-US": string }>;

const dictionary: Dict = {
  appTitle: { "pt-BR": "Kriative Lead Capture", "en-US": "Kriative Lead Capture" },
  modeMock: { "pt-BR": "(mock)", "en-US": "(mock)" },
  language: { "pt-BR": "Idioma", "en-US": "Language" },
  toggleTheme: { "pt-BR": "Alternar tema", "en-US": "Toggle theme" },

  // Sidebar — Filtros
  filters: { "pt-BR": "Filtros", "en-US": "Filters" },
  category: { "pt-BR": "Categoria", "en-US": "Category" },
  niche: { "pt-BR": "Nicho", "en-US": "Niche" },
  city: { "pt-BR": "Cidade", "en-US": "City" },
  uf: { "pt-BR": "UF", "en-US": "State" },
  cep: { "pt-BR": "CEP", "en-US": "ZIP" },
  saveCampaign: { "pt-BR": "Salvar Campanha", "en-US": "Save Campaign" },
  clear: { "pt-BR": "Limpar", "en-US": "Clear" },
  exportCsvPage: { "pt-BR": "Exportar CSV (página)", "en-US": "Export CSV (page)" },
  exportCsvAll: { "pt-BR": "Exportar CSV (todos)", "en-US": "Export CSV (all)" },

  // Modelos
  models: { "pt-BR": "Modelos", "en-US": "Models" },
  saveAsModel: { "pt-BR": "Salvar como Modelo", "en-US": "Save as Model" },
  exportCampaignsJson: { "pt-BR": "Exportar Campanhas (JSON)", "en-US": "Export Campaigns (JSON)" },
  importCampaignsJson: { "pt-BR": "Importar Campanhas (JSON)", "en-US": "Import Campaigns (JSON)" },
  apply: { "pt-BR": "Aplicar", "en-US": "Apply" },
  remove: { "pt-BR": "Excluir", "en-US": "Delete" },

  // Campanhas
  campaigns: { "pt-BR": "Campanhas", "en-US": "Campaigns" },
  load: { "pt-BR": "Carregar", "en-US": "Load" },
  duplicate: { "pt-BR": "Duplicar", "en-US": "Duplicate" },
  statusDraft: { "pt-BR": "Rascunho", "en-US": "Draft" },
  statusActive: { "pt-BR": "Ativa", "en-US": "Active" },
  statusArchived: { "pt-BR": "Arquivada", "en-US": "Archived" },

  // Outros
  others: { "pt-BR": "Outros", "en-US": "Others" },
  newWizard: { "pt-BR": "Novo Wizard", "en-US": "New Wizard" },
  searchMock: { "pt-BR": "Buscar (Mock)", "en-US": "Fetch (Mock)" },
  clearExternal: { "pt-BR": "Limpar Resultados Externos", "en-US": "Clear External Results" },

  // Results
  results: { "pt-BR": "Resultados", "en-US": "Results" },
  searchPlaceholder: { "pt-BR": "Buscar por nome ou segmento...", "en-US": "Search by name or segment..." },
  showing: { "pt-BR": "Exibindo", "en-US": "Showing" },
  prev: { "pt-BR": "Anterior", "en-US": "Previous" },
  next: { "pt-BR": "Próxima", "en-US": "Next" },

  // Table headers
  thName: { "pt-BR": "Nome", "en-US": "Name" },
  thSegment: { "pt-BR": "Segmento", "en-US": "Segment" },
  thCityUf: { "pt-BR": "Cidade/UF", "en-US": "City/UF" },
  thPhone: { "pt-BR": "Telefone", "en-US": "Phone" },
  thSource: { "pt-BR": "Fonte", "en-US": "Source" },
  thDate: { "pt-BR": "Data", "en-US": "Date" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dictionary) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt-BR");
  const t = useMemo(
    () => (key: keyof typeof dictionary) => dictionary[key]?.[lang] ?? key,
    [lang]
  );
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: "pt-BR" as Lang,
      setLang: () => {},
      t: (k: keyof typeof dictionary) => dictionary[k]?.["pt-BR"] ?? String(k),
    };
  }
  return ctx;
}
