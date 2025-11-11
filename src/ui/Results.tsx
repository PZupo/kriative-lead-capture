// src/ui/Results.tsx
import React, { useMemo, useState } from 'react';

export type Lead = {
  id: string;
  nome: string;
  segmento: string;
  cidade: string;
  uf: string;
  telefone?: string;
  fonte: string;
  data: string; // ISO string
};

type ResultsProps = {
  leads: Lead[] | null;     // já paginado pelo pai
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;            // total geral (para cabeçalho/paginação)
  onPrev: () => void;
  onNext: () => void;
};

export default function Results({
  leads,
  loading,
  page,
  pageSize,
  total,
  onPrev,
  onNext,
}: ResultsProps) {
  const [q, setQ] = useState('');

  // filtro local só para busca de vitrine (não altera o dataset do pai)
  const visible = useMemo(() => {
    if (!leads) return [];
    if (!q.trim()) return leads;
    const t = q.toLowerCase();
    return leads.filter(
      (l) =>
        l.nome.toLowerCase().includes(t) ||
        l.segmento.toLowerCase().includes(t) ||
        l.cidade.toLowerCase().includes(t) ||
        l.uf.toLowerCase().includes(t)
    );
  }, [leads, q]);

  // faixa exibida baseada na paginação do pai
  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = total === 0 ? 0 : Math.min(page * pageSize, total);

  return (
    <section className="bg-surface/60 rounded-xl border border-border shadow-sm">
      {/* cabeçalho */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
        <h2 className="text-lg font-semibold text-fg/90">Resultados</h2>
        <div className="text-sm text-fg/60">
          {`Exibindo ${startIndex}–${endIndex} de ${total} lead(s)`}
        </div>
      </div>

      {/* busca */}
      <div className="px-4 sm:px-6 pb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou segmento..."
          className="w-full rounded-lg border border-border/70 bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* tabela */}
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100">
              <tr>
                <Th>Nome</Th>
                <Th>Segmento</Th>
                <Th>Cidade/UF</Th>
                <Th>Telefone</Th>
                <Th>Fonte</Th>
                <Th>Data</Th>
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr
                  key={l.id}
                  className="
                    odd:bg-white even:bg-neutral-50
                    dark:odd:bg-neutral-800/60 dark:even:bg-neutral-700/60
                    hover:bg-neutral-100 dark:hover:bg-neutral-700
                    transition-colors
                  "
                >
                  <Td className="font-medium">{l.nome}</Td>
                  <Td>{l.segmento}</Td>
                  <Td>{`${l.cidade} / ${l.uf}`}</Td>
                  <Td>{l.telefone || '—'}</Td>
                  <Td>{l.fonte}</Td>
                  <Td>{formatDate(l.data)}</Td>
                </tr>
              ))}

              {!loading && visible.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-fg/60 italic"
                  >
                    Nenhum lead encontrado com esse termo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* overlay de loading */}
        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-bg/40 backdrop-blur-[1px] rounded-b-xl">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2 shadow">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
              <span className="text-sm text-fg/80">Carregando…</span>
            </div>
          </div>
        )}
      </div>

      {/* paginação */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm disabled:opacity-50"
        >
          <span className="i-lucide-chevron-left" />
          Anterior
        </button>
        <div className="text-xs text-fg/60">{`Página ${page}`}</div>
        <button
          onClick={onNext}
          disabled={endIndex >= total}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm disabled:opacity-50"
        >
          Próxima
          <span className="i-lucide-chevron-right" />
        </button>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function formatDate(iso: string) {
  // mantém compatível com seu mock (ISO). Se já vier formatado, cai no catch.
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return iso;
  }
}
