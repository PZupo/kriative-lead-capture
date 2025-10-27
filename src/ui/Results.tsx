import { useState, useMemo } from 'react';

export type Lead = {
  id: string;
  nome: string;
  segmento: string;
  cidade: string;
  uf: string;
  telefone?: string;
  fonte: 'Mock';
  data: string;
};

function mapsUrl(nome: string, cidade: string, uf: string) {
  const q = `${nome}, ${cidade} - ${uf}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export default function Results({
  leads, page, pageSize, total, onPrev, onNext, loading = false
}: {
  leads: Lead[];
  page: number;
  pageSize: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  loading?: boolean;
}) {
  const [search, setSearch] = useState('');

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return leads;
    const s = search.toLowerCase();
    return leads.filter(l =>
      l.nome.toLowerCase().includes(s) ||
      l.segmento.toLowerCase().includes(s)
    );
  }, [search, leads]);

  const visible = filteredLeads;

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="bg-card rounded-base border border-border p-4 relative">
      {/* overlay de loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-base flex items-center justify-center z-10">
          <div className="animate-spin w-6 h-6 rounded-full border-2 border-teal border-t-transparent"></div>
          <span className="ml-2 text-sm opacity-70">Carregando…</span>
        </div>
      )}

      {/* topo */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="font-semibold">Resultados</h2>
        <div className="text-sm opacity-70">
          {total ? `Exibindo ${from}–${to} de ${total} lead(s)` : '0 lead(s)'}
        </div>
      </div>

      {/* busca */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome ou segmento..."
        className="w-full rounded-base border border-border bg-white px-3 py-2 mb-4"
      />

      {!visible.length && !loading && (
        <p className="opacity-70">Nenhum lead encontrado com esse termo.</p>
      )}

      <ul className="space-y-3">
        {visible.map(l => (
          <li key={l.id} className="rounded-base border border-border p-3">
            <div className="font-semibold">{l.nome}</div>
            <div className="text-sm opacity-80">
              {l.segmento} • {l.cidade} - {l.uf}
            </div>
            {l.telefone && <div className="text-sm opacity-80">Tel: {l.telefone}</div>}
            <div className="text-xs opacity-60 mt-1">Fonte: {l.fonte}</div>
            <a
              className="inline-block mt-2 text-sm underline"
              href={mapsUrl(l.nome, l.cidade, l.uf)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir no Google Maps
            </a>
          </li>
        ))}
      </ul>

      {/* paginação */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={page <= 1 || loading}
          className={`px-4 py-2 rounded-base border border-border ${page <= 1 || loading ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          ◀ Anterior
        </button>
        <div className="text-sm opacity-70">
          Página {page} de {totalPages}
        </div>
        <button
          onClick={onNext}
          disabled={page >= totalPages || loading}
          className={`px-4 py-2 rounded-base border border-border ${page >= totalPages || loading ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Próxima ▶
        </button>
      </div>
    </section>
  );
}
