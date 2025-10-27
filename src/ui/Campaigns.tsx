type Campaign = {
  id: string;
  nome: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
  createdAt: string;
};

export default function Campaigns({
  items, onLoad, onDelete, onDuplicate
}: {
  items: Campaign[];
  onLoad: (c: Campaign) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold mb-3">Campanhas salvas</h2>

      {!items.length && (
        <p className="text-sm opacity-70">
          Você ainda não salvou nenhuma campanha.
        </p>
      )}

      <ul className="space-y-3">
        {items.map(c => (
          <li key={c.id} className="rounded-base border border-border p-3 bg-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{c.nome}</div>
                <div className="text-xs opacity-70 mt-1">
                  {c.categoria || 'Geral'} • {c.nicho || 'Todos'} • {c.cidade || c.uf || 'Brasil'}
                </div>
                <div className="text-[11px] opacity-60 mt-1">
                  Criada em {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-2 py-1 rounded-base bg-teal text-white" onClick={() => onLoad(c)}>
                  Carregar
                </button>
                <button className="text-sm px-2 py-1 rounded-base border border-border" onClick={() => onDuplicate(c.id)}>
                  Duplicar
                </button>
                <button className="text-sm px-2 py-1 rounded-base bg-[#F44336] text-white" onClick={() => onDelete(c.id)}>
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
