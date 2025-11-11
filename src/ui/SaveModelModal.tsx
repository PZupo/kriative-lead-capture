// src/ui/SaveModelModal.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  initialValue: string;
  onCancel: () => void;
  onConfirm: (name: string) => void;
  title?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const SaveModelModal: React.FC<Props> = ({
  initialValue,
  onCancel,
  onConfirm,
  title = "Salvar como modelo",
  placeholder = "Nome do modelo…",
  confirmLabel = "Salvar",
  cancelLabel = "Cancelar",
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  function handleConfirm() {
    const name = value.trim();
    if (!name) return;
    onConfirm(name);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") onCancel();
  }

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-[9999] w-[min(560px,92vw)] rounded-2xl border border-card bg-card text-fg shadow-2xl">
        <div className="px-5 py-4 border-b border-card">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <div className="px-5 py-5 space-y-2">
          <label className="text-sm opacity-80">{placeholder}</label>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full rounded-lg border px-3 py-2"
            placeholder={placeholder}
          />
        </div>

        <div className="px-5 py-4 border-t border-card flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-card px-4 py-2 hover:bg-[var(--muted)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-lg px-4 py-2 text-white"
            style={{ background: "#008080" }}
            disabled={!value.trim()}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModelModal;
