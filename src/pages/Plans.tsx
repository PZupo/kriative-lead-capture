// src/pages/Plans.tsx
import React from "react";

type PlansProps = {
  onClose: () => void;
};

export default function Plans({ onClose }: PlansProps) {
  return (
    <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* Cabeçalho do modal */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
        <div>
          <h2 className="text-lg font-semibold">Planos KS • Lead Capture</h2>
          <p className="text-xs opacity-70">
            Fluxo de teste (mock), preparado para futura integração com Stripe / KS-Core.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-lg leading-none hover:bg-black/10 dark:hover:bg-white/20"
          aria-label="Fechar"
        >
          ×
        </button>
      </div>

      {/* Conteúdo */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] px-6 py-6">
        {/* Coluna esquerda – cards de plano */}
        <div className="space-y-4">
          {/* Plano PRÓ */}
          <div className="border rounded-2xl p-4 shadow-sm bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div>
                <p className="text-xs font-semibold tracking-wide">PLANO</p>
                <h3 className="text-lg font-bold">PRÓ</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">R$ 49,99</p>
                <p className="text-xs opacity-70">por mês</p>
              </div>
            </div>
            <ul className="text-xs space-y-1 opacity-80 mb-3">
              <li>• Até 3 projetos ativos</li>
              <li>• Templates básicos de criativos</li>
              <li>• Exportação em CSV</li>
            </ul>
            <button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 font-medium">
              Plano selecionado
            </button>
          </div>

          {/* Plano STUDIO */}
          <div className="border rounded-2xl p-4 shadow-sm bg-slate-50/60 dark:bg-slate-900/40">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div>
                <p className="text-xs font-semibold tracking-wide">PLANO</p>
                <h3 className="text-lg font-bold">STUDIO</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">R$ 89,00</p>
                <p className="text-xs opacity-70">por mês</p>
              </div>
            </div>
            <ul className="text-xs space-y-1 opacity-80 mb-3">
              <li>• Até 10 projetos ativos</li>
              <li>• Biblioteca avançada de presets</li>
              <li>• Rotina de exportação em lote</li>
            </ul>
            <button className="w-full rounded-full border border-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs py-2 font-medium hover:bg-emerald-50/60 dark:hover:bg-emerald-900/40">
              Selecionar plano
            </button>
          </div>

          {/* Plano EXCLUSIVE */}
          <div className="border rounded-2xl p-4 shadow-sm bg-slate-50/60 dark:bg-slate-900/40">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div>
                <p className="text-xs font-semibold tracking-wide">PLANO</p>
                <h3 className="text-lg font-bold">EXCLUSIVE</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">R$ 149,00</p>
                <p className="text-xs opacity-70">por mês</p>
              </div>
            </div>
            <ul className="text-xs space-y-1 opacity-80 mb-3">
              <li>• Projetos ilimitados</li>
              <li>• Prioridade em novidades KS</li>
              <li>• Pronto para integração com KS-Core</li>
            </ul>
            <button className="w-full rounded-full border border-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs py-2 font-medium hover:bg-emerald-50/60 dark:hover:bg-emerald-900/40">
              Selecionar plano
            </button>
          </div>
        </div>

        {/* Coluna direita – formulário mock */}
        <div className="border rounded-2xl p-4 md:p-6 shadow-sm bg-slate-50 dark:bg-slate-900/60 space-y-4">
          <div>
            <h3 className="text-base font-semibold">Assinar plano PRÓ</h3>
            <p className="text-xs opacity-70">
              Valor simulado: <strong>R$ 49,99 / mês</strong>. Nenhuma cobrança
              real é feita neste ambiente.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs font-medium mb-1">
                Nome completo
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">E-mail</label>
              <input
                type="email"
                className="input w-full"
                placeholder="voce@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Negócio / Nicho
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Ex: agência, infoprodutor, social media…"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Observações (opcional)
              </label>
              <textarea
                className="input w-full h-24 resize-y"
                placeholder="Algum detalhe sobre como pretende usar o LC?"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                // mock apenas
                alert("Fluxo de assinatura mock – nenhuma cobrança realizada.");
                onClose();
              }}
            >
              Prosseguir (mock)
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>

          <p className="text-[11px] opacity-70 pt-2">
            Este fluxo é apenas demonstrativo. Na integração real, o pagamento
            será processado via Stripe / KS-Core.
          </p>
        </div>
      </div>
    </div>
  );
}
