// src/ui/Sidebar.tsx
import React, { useState } from "react";
import { useI18n } from "../lib/i18n";
import DeleteConfirm from "./DeleteConfirm";
import Footer from "./Footer";
import SaveModelModal from "./SaveModelModal";

type Campaign = {
  id: string;
  nome: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
  createdAt: string;
  status?: "draft" | "active" | "archived";
};

type Template = {
  id: string;
  label: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
  createdAt: string;
};

type SidebarProps = {
  values: { categoria: string; nicho: string; cidade: string; uf: string; cep: string };
  onChange: {
    setCategoria: React.Dispatch<React.SetStateAction<string>>;
    setNicho: React.Dispatch<React.SetStateAction<string>>;
    setCidade: React.Dispatch<React.SetStateAction<string>>;
    setUf: React.Dispatch<React.SetStateAction<string>>;
    setCep: React.Dispatch<React.SetStateAction<string>>;
  };
  actions: { saveCampaign: () => void; exportCSV: () => void };

  campaigns: Campaign[];
  onLoadCampaign: (c: Campaign) => void;
  onDeleteCampaign: (id: string) => void;
  onDuplicateCampaign: (id: string) => void;
  onSetCampaignStatus: (id: string, status: Campaign["status"]) => void;

  onExportCampaignsJSON: () => void;
  onImportCampaignsJSON: (file: File) => void;

  templates: Template[];
  onApplyTemplate: (id: string) => void;
  onDeleteTemplate: (id: string) => void;

  /** legado: mantém para fallback (usa prompt nativo) */
  onSaveCurrentAsTemplate: () => void;

  /** novo: se vier, salva usando o nome informado no modal */
  onSaveCurrentAsTemplateNamed?: (name: string) => void;

  quickTemplates: Omit<Template, "id" | "createdAt">[];
  onApplyQuickTemplate: (label: string) => void;

  onClearFilters: () => void;
  onOpenWizard: () => void;

  onExportAllCSV: () => void;
  onFetchPlacesMock: () => void;
  onClearExternalResults: () => void;
  hasExternalResults: boolean;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    values, onChange, actions, campaigns,
    onLoadCampaign, onDeleteCampaign, onDuplicateCampaign, onSetCampaignStatus,
    onExportCampaignsJSON, onImportCampaignsJSON,
    templates, onApplyTemplate, onDeleteTemplate,
    onSaveCurrentAsTemplate, onSaveCurrentAsTemplateNamed,
    quickTemplates, onApplyQuickTemplate,
    onClearFilters, onOpenWizard, onExportAllCSV,
    onFetchPlacesMock, onClearExternalResults, hasExternalResults,
  } = props;

  const { t } = useI18n();

  // spinner local do mock
  const [pendingMock, setPendingMock] = useState(false);

  // modal de confirmação (excluir)
  const [confirmState, setConfirmState] = useState<
    | { type: "campaign"; id: string; name?: string }
    | { type: "template"; id: string; name?: string }
    | null
  >(null);

  // modal salvar modelo
  const [saveModelOpen, setSaveModelOpen] = useState(false);

  async function handleFetchMock() {
    try {
      setPendingMock(true);
      await Promise.resolve(onFetchPlacesMock() as unknown);
    } finally {
      setPendingMock(false);
    }
  }

  function askDeleteCampaign(id: string, name?: string) {
    setConfirmState({ type: "campaign", id, name });
  }
  function askDeleteTemplate(id: string, name?: string) {
    setConfirmState({ type: "template", id, name });
  }
  function confirmDelete() {
    if (!confirmState) return;
    if (confirmState.type === "campaign") onDeleteCampaign(confirmState.id);
    if (confirmState.type === "template") onDeleteTemplate(confirmState.id);
    setConfirmState(null);
  }

  // sugestão padrão do nome do modelo (igual ao que você já exibia)
  const suggestedLabel =
    `${values.categoria || "Geral"} • ${values.nicho || "Todos"} • ${values.cidade || values.uf || ""}`.trim();

  function openSaveModel() {
    // se não existir handler novo, usa o legado (abre prompt nativo)
    if (!onSaveCurrentAsTemplateNamed) {
      onSaveCurrentAsTemplate();
      return;
    }
    setSaveModelOpen(true);
  }

  function submitSaveModel(name: string) {
    if (onSaveCurrentAsTemplateNamed) {
      onSaveCurrentAsTemplateNamed(name);
    } else {
      onSaveCurrentAsTemplate(); // fallback seguro
    }
    setSaveModelOpen(false);
  }

  return (
    <>
      <aside className="space-y-4 lg:sticky lg:top-[calc(var(--nav-h,64px)+16px)]">
        {/* Filtros */}
        <section className="p-4 rounded-xl border bg-card overflow-x-hidden shadow-sm">
          <h2 className="font-semibold mb-3">{t("filters")}</h2>
          <div className="space-y-2">
            <input className="w-full p-2" placeholder={t("category")} value={values.categoria} onChange={(e)=>onChange.setCategoria(e.target.value)} />
            <input className="w-full p-2" placeholder={t("niche")}     value={values.nicho}     onChange={(e)=>onChange.setNicho(e.target.value)} />
            <input className="w-full p-2" placeholder={t("city")}      value={values.cidade}    onChange={(e)=>onChange.setCidade(e.target.value)} />
            <input className="w-full p-2" placeholder={t("uf")}        value={values.uf}        onChange={(e)=>onChange.setUf(e.target.value)} />
            <input className="w-full p-2" placeholder={t("cep")}       value={values.cep}       onChange={(e)=>onChange.setCep(e.target.value)} />
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              className="px-3 py-2 rounded text-white bg-[#008080] hover:brightness-110 transition shadow-sm"
              onClick={actions.saveCampaign}
            >
              {t("saveCampaign")}
            </button>
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={onClearFilters}>
              {t("clear")}
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={actions.exportCSV}>
              {t("exportCsvPage")}
            </button>
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={onExportAllCSV}>
              {t("exportCsvAll")}
            </button>
          </div>
        </section>

        {/* Modelos */}
        <section className="p-4 rounded-xl border bg-card overflow-x-hidden shadow-sm">
          <h2 className="font-semibold mb-3">{t("models")}</h2>
          <div className="flex gap-2 flex-wrap">
            {props.quickTemplates.map((q) => (
              <button
                key={q.label}
                className="px-2 py-1 rounded border hover:bg-[var(--muted)] transition"
                onClick={() => props.onApplyQuickTemplate(q.label)}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={openSaveModel}>
              {t("saveAsModel")}
            </button>
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={onExportCampaignsJSON}>
              {t("exportCampaignsJson")}
            </button>
            <label className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition cursor-pointer">
              {t("importCampaignsJson")}
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && props.onImportCampaignsJSON(e.target.files[0])}
              />
            </label>
          </div>

          <ul className="mt-3 space-y-2">
            {props.templates.map((tpl) => (
              <li key={tpl.id} className="flex items-center justify-between">
                <span className="whitespace-normal break-normal">{tpl.label}</span>
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded border text-sm hover:bg-[var(--muted)] transition" onClick={() => props.onApplyTemplate(tpl.id)}>
                    {t("apply")}
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-sm hover:bg-[var(--muted)] transition"
                    onClick={() => askDeleteTemplate(tpl.id, tpl.label)}
                  >
                    {t("remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Campanhas */}
        <section className="p-4 rounded-xl border bg-card overflow-x-hidden shadow-sm">
          <h2 className="font-semibold mb-3">{t("campaigns")}</h2>

          <ul className="space-y-3">
            {campaigns.map((c) => (
              <li
                key={c.id}
                className="border rounded-lg p-3 bg-white/50 dark:bg-white/5 overflow-x-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-[160px] whitespace-normal break-normal leading-tight">
                      <div className="font-medium">{c.nome}</div>
                      <div className="opacity-70 text-xs">
                        {new Date(c.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      <button
                        className="px-2 py-1 rounded border text-sm hover:bg-[var(--muted)] transition"
                        onClick={() => onLoadCampaign(c)}
                      >
                        {t("load")}
                      </button>
                      <button
                        className="px-2 py-1 rounded border text-sm hover:bg-[var(--muted)] transition"
                        onClick={() => onDuplicateCampaign(c.id)}
                      >
                        {t("duplicate")}
                      </button>
                      <button
                        className="px-2 py-1 rounded border text-sm hover:bg-[var(--muted)] transition"
                        onClick={() => askDeleteCampaign(c.id, c.nome)}
                      >
                        {t("remove")}
                      </button>
                      <select
                        className="px-2 py-1 rounded border text-sm w-28"
                        value={c.status || "active"}
                        onChange={(e) =>
                          onSetCampaignStatus(c.id, e.target.value as Campaign["status"])
                        }
                      >
                        <option value="draft">{t("statusDraft")}</option>
                        <option value="active">{t("statusActive")}</option>
                        <option value="archived">{t("statusArchived")}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Outras ações */}
        <section className="p-4 rounded-xl border bg-card overflow-x-hidden shadow-sm">
          <h2 className="font-semibold mb-2">{t("others")}</h2>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition" onClick={onOpenWizard}>
              {t("newWizard")}
            </button>

            {!hasExternalResults ? (
              <button
                className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={handleFetchMock}
                disabled={pendingMock}
              >
                {pendingMock && (
                  <span
                    className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                    aria-hidden
                  />
                )}
                {pendingMock ? "Buscando…" : t("searchMock")}
              </button>
            ) : (
              <button
                className="px-3 py-2 rounded border hover:bg-[var(--muted)] transition"
                onClick={onClearExternalResults}
              >
                {t("clearExternal")}
              </button>
            )}
          </div>
        </section>
      </aside>

      {/* Modal excluir */}
      {confirmState && (
        <DeleteConfirm
          title={confirmState.type === "campaign" ? "Excluir campanha?" : "Excluir modelo?"}
          message={
            confirmState.type === "campaign"
              ? `Você está prestes a excluir a campanha ${confirmState.name ?? ""}.`
              : `Você está prestes a excluir o modelo ${confirmState.name ?? ""}.`
          }
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmState(null)}
        />
      )}

      {/* Modal salvar modelo (bonito) */}
      {saveModelOpen && (
        <SaveModelModal
          initialValue={suggestedLabel}
          onCancel={() => setSaveModelOpen(false)}
          onConfirm={submitSaveModel}
          title="Salvar como modelo"
          placeholder="Nome do modelo…"
          confirmLabel="Salvar"
          cancelLabel="Cancelar"
        />
      )}

      {/* Footer fixo */}
      <Footer />
    </>
  );
};

export default Sidebar;
