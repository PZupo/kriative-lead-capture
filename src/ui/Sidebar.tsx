import { useState } from 'react';
import Campaigns from './Campaigns';

type Values = { categoria: string; nicho: string; cidade: string; uf: string; cep: string };
type Change = {
  setCategoria: (v: string) => void;
  setNicho: (v: string) => void;
  setCidade: (v: string) => void;
  setUf: (v: string) => void;
  setCep: (v: string) => void;
};
type Actions = { saveCampaign: () => void; exportCSV: () => void };

type Campaign = {
  id: string; nome: string; categoria: string; nicho: string; cidade: string; uf: string; cep?: string; createdAt: string;
};

type Template = {
  id: string; label: string; categoria: string; nicho: string; cidade: string; uf: string; cep?: string;
};

export default function Sidebar({
  values, onChange, actions,
  campaigns, onLoadCampaign, onDeleteCampaign, onDuplicateCampaign,
  onExportCampaignsJSON, onImportCampaignsJSON,
  templates, onApplyTemplate, onClearFilters
}: {
  values: Values; onChange: Change; actions: Actions;
  campaigns: Campaign[];
  onLoadCampaign: (c: Campaign) => void;
  onDeleteCampaign: (id: string) => void;
  onDuplicateCampaign: (id: string) => void;
  onExportCampaignsJSON: () => void;
  onImportCampaignsJSON: (file: File) => void;
  templates: Template[];
  onApplyTemplate: (id: string) => void;
  onClearFilters: () => void;
}) {
  const { categoria, nicho, cidade, uf, cep } = values;
  const { setCategoria, setNicho, setCidade, setUf, setCep } = onChange;
  const { saveCampaign, exportCSV } = actions;

  const tabs = [
    { id: 'filtros', label: 'Filtros' },
    { id: 'campanhas', label: 'Campanhas' }
  ] as const;
  type Tab = typeof tabs[number]['id'];
  const [active, setActive] = useState<Tab>('filtros');

  return (
    <aside className="bg-card rounded-base border border-border p-4 h-fit sticky top-4">
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`px-3 py-1 rounded-base border border-border text-sm ${active === t.id ? 'bg-teal text-white' : 'bg-white'}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === 'filtros' && (
        <>
          <h2 className="font-semibold mb-3">Filtros da campanha</h2>

          {/* Modelos rápidos */}
          <div className="mb-3">
            <label className="text-sm opacity-70 block mb-1">Modelos rápidos</label>
            <div className="flex flex-wrap gap-2">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => onApplyTemplate(t.id)}
                  className="text-sm px-3 py-1 rounded-base border border-border bg-white hover:shadow-sm"
                  title={`${t.categoria} • ${t.nicho} • ${t.cidade}/${t.uf}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <label className="text-sm opacity-70">Categoria</label>
          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            className="w-full rounded-base border border-border bg-white px-3 py-2 mb-3"
          >
            <option value="">Selecione</option>
            <option>Clínicas e terapias</option>
            <option>Estúdios de bem estar</option>
            <option>Academias e yoga</option>
            <option>Coaching e consultorias</option>
          </select>

          <label className="text-sm opacity-70">Nicho</label>
          <input
            value={nicho}
            onChange={e => setNicho(e.target.value)}
            placeholder="ex.: acupuntura, reiki, yoga"
            className="w-full rounded-base border border-border bg-white px-3 py-2 mb-3"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm opacity-70">Cidade</label>
              <input
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="ex.: São Paulo"
                className="w-full rounded-base border border-border bg-white px-3 py-2 mb-3"
              />
            </div>
            <div>
              <label className="text-sm opacity-70">UF</label>
              <input
                value={uf}
                onChange={e => setUf(e.target.value.toUpperCase())}
                placeholder="SP"
                maxLength={2}
                className="w-full rounded-base border border-border bg-white px-3 py-2 mb-3 uppercase"
              />
            </div>
          </div>

          <label className="text-sm opacity-70">CEP (opcional)</label>
          <input
            value={cep}
            onChange={e => setCep(e.target.value)}
            placeholder="ex.: 01310-000"
            className="w-full rounded-base border border-border bg-white px-3 py-2 mb-4"
          />

          <div className="flex flex-col gap-2">
            <button onClick={saveCampaign} className="rounded-base bg-teal text-white px-4 py-2">
              Salvar Campanha
            </button>
            <button onClick={exportCSV} className="rounded-base bg-orange text-white px-4 py-2">
              Exportar CSV (página)
            </button>
            <button onClick={onClearFilters} className="rounded-base border border-border bg-white px-4 py-2">
              Limpar filtros
            </button>
          </div>
        </>
      )}

      {active === 'campanhas' && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Campanhas salvas</h2>
            <div className="flex gap-2">
              <button
                onClick={onExportCampaignsJSON}
                className="text-sm px-3 py-1 rounded-base border border-border bg-white"
                title="Exportar campanhas (.json)"
              >
                Exportar JSON
              </button>

              <label className="text-sm px-3 py-1 rounded-base border border-border bg-white cursor-pointer">
                Importar JSON
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) onImportCampaignsJSON(f);
                    e.currentTarget.value = '';
                  }}
                />
              </label>
            </div>
          </div>

          <Campaigns
            items={campaigns}
            onLoad={onLoadCampaign}
            onDelete={onDeleteCampaign}
            onDuplicate={onDuplicateCampaign}
          />
        </>
      )}
    </aside>
  );
}
