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

export default function Results({ leads }: { leads: Lead[] }) {
  return (
    <section className="bg-card rounded-base border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Resultados</h2>
        <span className="text-sm opacity-70">{leads.length} lead(s)</span>
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
          </li>
        ))}
      </ul>
    </section>
  );
}
