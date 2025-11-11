// src/ui/Wizard.tsx
import React, { useState } from 'react';

type WizardProps = {
  onClose: () => void;
  onCreate: (data: {
    categoria?: string;
    nicho?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    nome?: string;
  }) => void;
};

const Wizard: React.FC<WizardProps> = ({ onClose, onCreate }) => {
  const [categoria, setCategoria] = useState('');
  const [nicho, setNicho] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [nome, setNome] = useState('');

  function submit() {
    onCreate({ categoria, nicho, cidade, uf, cep, nome });
  }

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-[9999] w-[min(720px,92vw)] rounded-2xl border border-card bg-card text-fg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-card px-5 py-3">
          <h3 className="text-lg font-semibold">Novo Wizard</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm border border-card hover:bg-[var(--muted)]"
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="Nicho"
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="UF"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full rounded-lg border border-card bg-card text-fg px-3 py-2"
              placeholder="Nome da Campanha (opcional)"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-card px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-card px-4 py-2 hover:bg-[var(--muted)]"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            className="rounded-lg px-4 py-2 text-white"
            style={{ background: 'var(--orange)' }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
