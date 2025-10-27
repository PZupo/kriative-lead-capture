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

function App() {
  // filtros da busca atual
  const [categoria, setCategoria] = useState('');
  const [nicho, setNicho] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');

  // paginação
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // campanhas salvas
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // carregar campanhas
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

  // gerar muitos leads mock para visualizar paginação
  const allLeads: Lead[] = useMemo(() => {
    // base de 4 exemplos
    const base = [
      { nome: 'Clínica Bem Viver', cidade: 'São Paulo', uf: 'SP', segmento: 'Terapias integrativas' },
      { nome: 'Espaço Harmonia', cidade: 'Campinas', uf: 'SP', segmento: 'Acupuntura' },
      { nome: 'Vida Plena', cidade: 'Rio de Janeiro', uf: 'RJ', segmento: 'Coaching e bem estar' },
      { nome: 'Alma Leve Studio', cidade: 'Belo Horizonte', uf: 'MG', segmento: 'Yoga e mindfulness' }
    ];

    // multiplica a base para ter ~40–60 itens
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

    // aplica filtros simples
    const filtered = big
      .filter(x => !cidade || x.cidade.toLowerCase().includes(cidade.toLowerCase()))
      .filter(x => !uf || x.uf === uf.toUpperCase())
      .filter(x => !nicho || x.segmento.toLowerCase().includes(nicho.toLowerCase()))
      // categoria e cep são cosméticos em mock (sem efeito real por ora)
      ;

    return filtered;
  }, [cidade, uf, nicho, categoria, cep]);

  // sempre que filtros mudarem, volta para a 1ª página
  useEffect(() => {
    setPage(1);
  }, [cidade, uf, nicho, categoria, cep]);

  const total = allLeads.length;
  const start = total ? (page - 1) * pageSize : 0;
  const end = Math.min(start + pageSize, total);
  const pageLeads = allLeads.slice(start, end);

  // ações de campanhas
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

  // exportar CSV da página atual (poderemos trocar para "todos" depois)
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
        />
        <Results
          leads={pageLeads}
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
