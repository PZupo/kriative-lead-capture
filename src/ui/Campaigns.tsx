type Campaign = {
  id: string;
  nome: string;
  categoria: string;
  nicho: string;
  cidade: string;
  uf: string;
  cep?: string;
  createdAt: string;
  status?: 'draft' | 'active' | 'archived';
};

export default function Campaigns({
  items, onLoad, onDelete, onDuplicate, onSetStatus
}: {
  items: Campaign[];
  onLoad: (c: Campaign) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSetStatus: (id: string, status: Campaign['status']) => void;
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
          <li
            key={c.id}
            className="rounded-base border border-border p-3 bg-white shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{c.nome}</div>
                  <StatusBadge status={c.status || 'active'} />
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {c.categoria || 'Geral'} • {c.nicho || 'Todos'} • {c.cidade || c.uf || 'Brasil'}
                </div>
                <div className="text-[11px] opacity-60 mt-1">
                  Criada em {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <button className="text-sm px-2 py-1 rounded-base bg-teal text-white" onClick={() => onLoad(c)}>
                  Carregar
                </button>
                <button className="text-sm px-2 py-1 rounded-base border border-border" onClick={() => onDuplicate(c.id)}>
                  Duplicar
                </button>
                {c.status !== 'active' && (
                  <button className="text-sm px-2 py-1 rounded-base border border-border" onClick={() => onSetStatus(c.id, 'active')}>
                    Ativar
                  </button>
                )}
                {c.status !== 'archived' && (
                  <button className="text-sm px-2 py-1 rounded-base border border-border" onClick={() => onSetStatus(c.id, 'archived')}>
                    Arquivar
                  </button>
                )}
                {c.status !== 'draft' && (
                  <button className="text-sm px-2 py-1 rounded-base border border-border" onClick={() => onSetStatus(c.id, 'draft')}>
                    Rascunho
                  </button>
                )}
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

function StatusBadge({ status }: { status: NonNullable<Campaign['status']> }) {
  const map: Record<typeof status, { label: string; cls: string }> = {
    active: { label: 'Ativa', cls: 'bg-teal text-white' },
    draft: { label: 'Rascunho', cls: 'bg-orange text-white' },
    archived: { label: 'Arquivada', cls: 'bg-gray-200 text-gray-700' }
  };
  return (
    <span className={`text-[11px] px-2 py-[2px] rounded-base ${map[status].cls}`}>
      {map[status].label}
    </span>
  );
}
