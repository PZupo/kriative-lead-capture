import { useState } from 'react';

type Form = {
  categoria?: string;
  nicho?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  nome?: string;
};

export default function Wizard({
  onClose, onCreate
}: {
  onClose: () => void;
  onCreate: (data: Form) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<Form>({});

  function next() {
    setStep(2);
  }
  function back() {
    setStep(1);
  }
  function create() {
    onCreate(form);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-base border border-border shadow-lg">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Criar campanha</h3>
          <button onClick={onClose} className="text-sm underline">Fechar</button>
        </div>

        {step === 1 && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm opacity-70">Categoria</label>
                <select
                  value={form.categoria || ''}
                  onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                  className="w-full rounded-base border border-border bg-white px-3 py-2"
                >
                  <option value="">Selecione</option>
                  <option>Clínicas e terapias</option>
                  <option>Estúdios de bem estar</option>
                  <option>Academias e yoga</option>
                  <option>Coaching e consultorias</option>
                </select>
              </div>
              <div>
                <label className="text-sm opacity-70">Nicho</label>
                <input
                  value={form.nicho || ''}
                  onChange={e => setForm(f => ({ ...f, nicho: e.target.value }))}
                  placeholder="ex.: acupuntura, yoga…"
                  className="w-full rounded-base border border-border bg-white px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm opacity-70">Cidade</label>
                <input
                  value={form.cidade || ''}
                  onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))}
                  placeholder="ex.: São Paulo"
                  className="w-full rounded-base border border-border bg-white px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm opacity-70">UF</label>
                <input
                  value={form.uf || ''}
                  onChange={e => setForm(f => ({ ...f, uf: e.target.value.toUpperCase() }))}
                  placeholder="SP"
                  maxLength={2}
                  className="w-full rounded-base border border-border bg-white px-3 py-2 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-sm opacity-70">CEP (opcional)</label>
              <input
                value={form.cep || ''}
                onChange={e => setForm(f => ({ ...f, cep: e.target.value }))}
                placeholder="01310-000"
                className="w-full rounded-base border border-border bg-white px-3 py-2"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={next} className="rounded-base bg-orange text-white px-4 py-2">
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 space-y-3">
            <div className="rounded-base border border-border p-3 bg-[#fafafa]">
              <div className="font-semibold mb-1">Resumo</div>
              <div className="text-sm opacity-80">
                {form.categoria || 'Geral'} • {form.nicho || 'Todos'} • {form.cidade || form.uf || 'Brasil'}
              </div>
            </div>

            <div>
              <label className="text-sm opacity-70">Nome da campanha</label>
              <input
                value={form.nome || ''}
                onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                placeholder="Ex.: Psicologia SP - Agosto"
                className="w-full rounded-base border border-border bg-white px-3 py-2"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button onClick={back} className="rounded-base border border-border bg-white px-4 py-2">
                Voltar
              </button>
              <button onClick={create} className="rounded-base bg-teal text-white px-4 py-2">
                Criar campanha
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
