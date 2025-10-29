import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kriative.topnavsafe.collapsed'

export default function TopNavSafe() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || '#'

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setCollapsed(saved === '1')
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {}
  }, [collapsed])

  // container fixo, sem tocar no layout existente
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] pointer-events-none">
      <div className="mx-auto mt-2 flex w-full max-w-6xl justify-end px-2">
        {/* card flutuante */}
        <div
          className="pointer-events-auto rounded-2xl shadow-lg border border-neutral-200/70 bg-white/80 backdrop-blur md:max-w-none"
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
          {/* header compacto */}
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => setCollapsed(c => !c)}
              className="rounded-xl border border-neutral-300 px-2 py-1 text-xs font-medium hover:bg-neutral-50 active:scale-[0.98] transition"
              aria-label={collapsed ? 'Expandir shell' : 'Recolher shell'}
            >
              {collapsed ? '▼' : '▲'}
            </button>

            <div className="text-[11px] md:text-xs text-neutral-700">
              <span className="font-semibold">Kriative Shell</span>
              <span className="mx-2 opacity-40">•</span>
              <span className="opacity-80">Lead Capture (mock)</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {!collapsed && (
                <>
                  <a
                    href={dashboardUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition"
                  >
                    Abrir Dashboard
                  </a>
                  <a
                    href="/"
                    className="rounded-xl border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 transition"
                  >
                    Voltar ao App
                  </a>
                </>
              )}
            </div>
          </div>

          {/* barra fina para não cobrir UI quando expandido */}
          {!collapsed && (
            <div className="h-[6px] w-full rounded-b-2xl bg-gradient-to-r from-teal-600 via-orange-500 to-teal-600 opacity-80" />
          )}
        </div>
      </div>
    </div>
  )
}
