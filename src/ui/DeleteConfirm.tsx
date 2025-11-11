// src/ui/DeleteConfirm.tsx
import React from "react";

type DeleteConfirmProps = {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  title = "Confirmar exclusão",
  message = "Tem certeza que deseja excluir? Esta ação não pode ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-[9999] w-[min(520px,92vw)] rounded-2xl border border-card bg-card text-fg shadow-2xl">
        <div className="px-5 py-4 border-b border-card">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="px-5 py-4">
          <p className="opacity-90">{message}</p>
        </div>
        <div className="px-5 py-4 border-t border-card flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-card px-4 py-2 hover:bg-[var(--muted)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg px-4 py-2 text-white"
            style={{ background: "#d14343" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
