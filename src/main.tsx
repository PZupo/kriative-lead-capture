import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './ui/Navbar';
import Sidebar from './ui/Sidebar';
import Results, { type Lead } from './ui/Results';

export type Campaign = {
  id: string;
  nome: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
  createdAt: string;
};

const LS_KEY = 'kriative_campaigns';

type Template = {
  id: string;
  label: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
};

// Modelos rápidos (pode editar/expandir depois)
const TEMPLATES: Template[] = [
  {
    id: 'psicologia_sp',
    label: 'Psicologia • São Paulo SP',
    categoria: 'Clínicas e terapias',
    nicho: 'Psicologia',
    cidade: 'São Paulo',
    uf: 'SP'
  },
  {
    id: 'acupuntura_rj',
    label: 'Acupuntura • Rio de Janeiro RJ',
    categoria: 'Estúdios de bem estar',
    nicho: 'Acupuntura',
    cidade: 'Rio de Janeiro',
    uf: 'RJ'
  },
  {
    id: 'yoga_bh',
    label: 'Yoga • Belo Horizonte MG',
    categoria: 'Academias e yoga',
    nicho: 'Yoga',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  }
];

function App() {
  // filtros
  const [categoria, setCategoria] = useState('');
  const [nicho, setNicho] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');

  // paginação
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // loading curto ao mudar filtros
  const [loading, setLoading] = useState(false);

  // campanhas
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setCampaigns(JSON.parse(raw));
    } catch {}
  }, []);

  function persist(next: Campaign[]) {
    setCampaigns(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  // leads mock + filtros
  const allLeads: Lead[] = useMemo(() => {
    const base = [
      { nome: 'Clínica Bem Viver', cidade: 'São Paulo', uf: 'SP', segmento: 'Terapias integrativas' },
      { nome: 'Espaço Harmonia', cidade: 'Campinas', uf: 'SP', segmento: 'Acupuntura' },
      { nome: 'Vida Plena', cidade: 'Rio de Janeiro', uf: 'RJ', segmento: 'Coaching e bem estar' },
      { nome: 'Alma Leve Studio', cidade: 'Belo Horizonte', uf: 'MG', segmento: 'Yoga e mindfulness' }
    ];

    const big = Array.from({ length: 12 }).flatMap((_, k) =>
      base.map((x, i) => ({
        id: `${k + 1}-${i + 1}`,
        nome: `${x.nome} ${k + 1}`,
        segmento: x.segmento,
        cidade: x.cidade,
        uf: x.uf,
        telefone: '(11) 90000-0000',
        fonte: 'Mock' as const,
        data: new Date().toISOString()
      }))
    );

    return big
      .filter(x => !cidade || x.cidade.toLowerCase().includes(cidade.toLowerCase()))
      .filter(x => !uf || x.uf === uf.toUpperCase())
      .filter(x => !nicho || x.segmento.toLowerCase().includes(nicho.toLowerCase()));
  }, [cidade, uf, nicho, categoria, cep]);

  // reset pagina/mostrar loading nos filtros
  useEffect(() => {
    setPage(1);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [cidade, uf, nicho, categoria, cep]);

  const total = allLeads.length;
  const start = total ? (page - 1) * pageSize : 0;
  const end = Math.min(start + pageSize, total);
  const pageLeads = allLeads.slice(start, end);

  // ações de campanha
  function saveCampaign() {
    const newCamp: Campaign = {
      id: crypto.randomUUID(),
      nome: `${categoria || 'Geral'} • ${nicho || 'Todos'} • ${cidade || uf || 'Brasil'}`,
      categoria, nicho, cidade, uf, cep: cep || undefined,
      createdAt: new Date().toISOString()
    };
    persist([newCamp, ...campaigns]);
    alert('Campanha salva com sucesso');
  }

  function loadCampaign(c: Campaign) {
    setCategoria(c.categoria || '');
    setNicho(c.nicho || '');
    setCidade(c.cidade || '');
    setUf(c.uf || '');
    setCep(c.cep || '');
  }

  function deleteCampaign(id: string) {
    if (!confirm('Excluir esta campanha?')) return;
    persist(campaigns.filter(c => c.id !== id));
  }

  function duplicateCampaign(id: string) {
    const found = campaigns.find(c => c.id === id);
    if (!found) return;
    const copy: Campaign = {
      ...found,
      id: crypto.randomUUID(),
      nome: `${found.nome} (cópia)`,
      createdAt: new Date().toISOString()
    };
    persist([copy, ...campaigns]);
  }

  // CSV da página atual
  function exportCSV() {
    if (!pageLeads.length) {
      alert('Nenhum lead para exportar');
      return;
    }
    const header = ['nome', 'segmento', 'cidade', 'uf', 'telefone', 'fonte', 'data'];
    const rows = pageLeads.map(l => [l.nome, l.segmento, l.cidade, l.uf, l.telefone || '', l.fonte, l.data]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // JSON das campanhas
  function exportCampaignsJSON() {
    const blob = new Blob([JSON.stringify(campaigns, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campanhas.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importCampaignsJSON(file: File) {
    try {
      const text = await file.text();
      const arr = JSON.parse(text) as Campaign[];
      const valid = Array.isArray(arr) ? arr.filter(x => x && x.id && x.nome) : [];
      const exists = new Set(campaigns.map(c => c.id));
      const merged = [...valid.filter(v => !exists.has(v.id)), ...campaigns];
      persist(merged);
      alert(`Importadas ${merged.length - campaigns.length} campanha(s).`);
    } catch {
      alert('Arquivo inválido. Selecione um JSON exportado pelo app.');
    }
  }

  // aplicar modelo
  function applyTemplate(id: string) {
    const tpl = TEMPLATES.find(t => t.id === id);
    if (!tpl) return;
    setCategoria(tpl.categoria);
    setNicho(tpl.nicho);
    setCidade(tpl.cidade);
    setUf(tpl.uf);
    setCep(tpl.cep || '');
  }

  // limpar filtros
  function clearFilters() {
    setCategoria('');
    setNicho('');
    setCidade('');
    setUf('');
    setCep('');
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Navbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 p-4">
        <Sidebar
          values={{ categoria, nicho, cidade, uf, cep }}
          onChange={{ setCategoria, setNicho, setCidade, setUf, setCep }}
          actions={{ saveCampaign, exportCSV }}
          campaigns={campaigns}
          onLoadCampaign={loadCampaign}
          onDeleteCampaign={deleteCampaign}
          onDuplicateCampaign={duplicateCampaign}
          onExportCampaignsJSON={exportCampaignsJSON}
          onImportCampaignsJSON={importCampaignsJSON}
          templates={TEMPLATES}
          onApplyTemplate={applyTemplate}
          onClearFilters={clearFilters}
        />
        <Results
          leads={pageLeads}
          loading={loading}
          page={page}
          pageSize={pageSize}
          total={total}
          onPrev={() => setPage(p => Math.max(1, p - 1))}
          onNext={() => setPage(p => (start + pageSize < total ? p + 1 : p))}
        />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
