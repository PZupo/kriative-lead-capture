import React from 'react';

export default function MockBadge({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="mb-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 ring-1 ring-orange-300 dark:bg-orange-500/15 dark:text-orange-200 dark:ring-orange-500/40">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
        </span>
        Mock ativo
      </span>
    </div>
  );
}
