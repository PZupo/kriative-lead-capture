// src/components/billing/AddCreditsButton.tsx
import React, { useState } from "react";
import { useCredits } from "@/lib/credits";
import { useToast } from "@/lib/toast";

type Plan = {
  id: string;
  label: string;
  credits: number;
  price: string;     // só UI
  priceCents: number; // meta (opcional)
};

// catálogos visíveis no modal
const PLANS: Plan[] = [
  { id: "starter_20", label: "Starter 20", credits: 20, price: "R$ 9,00",  priceCents: 900 },
  { id: "pro_60",     label: "Pro 60",     credits: 60, price: "R$ 24,00", priceCents: 2400 },
  { id: "boss_150",   label: "Boss 150",   credits: 150, price: "R$ 55,00", priceCents: 5500 },
];

export default function AddCreditsButton() {
  const { add, loading } = useCredits();
  const { success, error, info } = useToast();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Plan | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleConfirm() {
  if (!selected) return info("Selecione um plano.");
  try {
    setBusy(true);
    // Adiciona créditos com meta (será gravado na transactions via add_credits)
    // OBS: isto requer 'add' aceitar meta — ver ajuste abaixo em credits.tsx
    await add(selected.credits, {
      planId: selected.id,
      priceCents: selected.priceCents,
      label: selected.label,
      source: "mock_checkout",
    });
    success(`+${selected.credits} créditos adicionados (${selected.label}).`);
    setOpen(false);
    setSelected(null);
  } catch {
    error("Falha ao adicionar créditos");
  } finally {
    setBusy(false);
  }
}


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded-md bg-white/15 text-white hover:bg-white/25 transition disabled:opacity-50"
        disabled={loading}
        title="Adicionar Créditos"
      >
        Adicionar Créditos
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-black/10 dark:border-white/10">
            <div className="px-5 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-semibold">Escolha um plano</h3>
              <button
                onClick={() => { if (!busy) { setOpen(false); setSelected(null); } }}
                className="text-sm opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              {PLANS.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition
                    ${selected?.id === p.id
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"}`}
                  onClick={() => setSelected(p)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{p.label}</span>
                    <span className="text-sm opacity-70">{p.credits} créditos</span>
                  </div>
                  <div className="text-right font-semibold">{p.price}</div>
                </label>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-2">
              <button
                onClick={() => { if (!busy) { setOpen(false); setSelected(null); } }}
                className="px-3 py-2 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                disabled={busy}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                disabled={!selected || busy}
              >
                {busy ? "Processando..." : "Confirmar"}
              </button>
            </div>

            <div className="px-5 pb-4 text-xs opacity-70">
              * Checkout de teste (mock). No Stripe real, este botão abrirá o
              Checkout e, ao retornar, creditará automaticamente.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
