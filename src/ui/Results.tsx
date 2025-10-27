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
  leads, page, pageSize, total, onPrev, onNext
}: {
  leads: Lead[];
  page: number;
  pageSize: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="bg-card rounded-base border border-border p-4">
      {/* topo: título + contagem + (na próxima etapa entra o campo Buscar aqui) */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="font-semibold">Resultados</h2>
        <div className="text-sm opacity-70">
          {total ? `Exibindo ${from}–${to} de ${total} lead(s)` : '0 lead(s)'}
        </div>
      </div>

      {!leads.length && (
        <p className="opacity-70">
          Use os filtros ao lado para simular uma busca. Os dados serão reais quando
          ativarmos o Google Places.
        </p>
      )}

      <ul className="space-y-3">
        {leads.map(l => (
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
          disabled={page <= 1}
          className={`px-4 py-2 rounded-base border border-border ${page <= 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          ◀ Anterior
        </button>
        <div className="text-sm opacity-70">
          Página {page} de {totalPages}
        </div>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded-base border border-border ${page >= totalPages ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Próxima ▶
        </button>
      </div>
    </section>
  );
}
