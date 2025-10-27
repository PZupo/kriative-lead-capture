type Values = { categoria: string; nicho: string; cidade: string; uf: string; cep: string }
type Change = {
  setCategoria: (v: string) => void
  setNicho: (v: string) => void
  setCidade: (v: string) => void
  setUf: (v: string) => void
  setCep: (v: string) => void
}
type Actions = { saveCampaign: () => void; exportCSV: () => void }

export default function Sidebar({
  values, onChange, actions
}: { values: Values; onChange: Change; actions: Actions }) {
  const { categoria, nicho, cidade, uf, cep } = values
  const { setCategoria, setNicho, setCidade, setUf, setCep } = onChange
  const { saveCampaign, exportCSV } = actions

  return (
    <aside className="bg-card rounded-base border border-border p-4 h-fit sticky top-4">
      <h2 className="font-semibold mb-4">Filtros da campanha</h2>

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
        <button
          onClick={saveCampaign}
          className="rounded-base bg-teal text-white px-4 py-2"
        >
          Salvar Campanha
        </button>
        <button
          onClick={exportCSV}
          className="rounded-base bg-orange text-white px-4 py-2"
        >
          Exportar CSV
        </button>
      </div>
    </aside>
  )
}
