import { useEffect, useState } from 'react'
import { useTheme } from '../lib/theme'
import { useI18n } from '../lib/i18n'

const STORAGE_KEY = 'kriative.topnavsafe.collapsed'

export default function TopNavSafe() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || '#'
  const { theme, setTheme, cycleTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()

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

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] pointer-events-none">
      <div className="mx-auto mt-2 flex w-full max-w-6xl justify-end px-2">
        <div
          className="pointer-events-auto rounded-2xl shadow-lg border border-neutral-200/70 bg-white/80 backdrop-blur dark:bg-neutral-900/80 dark:border-neutral-700"
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => setCollapsed(c => !c)}
              className="rounded-xl border border-neutral-300 px-2 py-1 text-xs font-medium hover:bg-neutral-50 active:scale-[0.98] transition dark:border-neutral-600 dark:hover:bg-neutral-800"
              aria-label={collapsed ? 'Expandir shell' : 'Recolher shell'}
              title={collapsed ? 'Expandir' : 'Recolher'}
            >
              {collapsed ? '▼' : '▲'}
            </button>

            <div className="text-[11px] md:text-xs text-neutral-700 dark:text-neutral-200">
              <span className="font-semibold">{t('shellTitle')}</span>
              <span className="mx-2 opacity-40">•</span>
              <span className="opacity-80">{t('appName')}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {!collapsed && (
                <>
                  {/* Idioma */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-neutral-600 dark:text-neutral-300">{t('language')}:</span>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value as any)}
                      className="rounded-lg border border-neutral-300 px-2 py-1 text-xs bg-white dark:bg-neutral-900 dark:border-neutral-700"
                    >
                      <option value="pt-BR">PT-BR</option>
                      <option value="en-US">EN-US</option>
                    </select>
                  </div>

                  {/* Tema */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-neutral-600 dark:text-neutral-300">{t('theme')}:</span>
                    <button
                      onClick={cycleTheme}
                      className="rounded-xl border border-neutral-300 px-2 py-1 text-xs font-medium hover:bg-neutral-50 transition dark:border-neutral-700 dark:hover:bg-neutral-800"
                      title={`${t('system')} / ${t('light')} / ${t('dark')}`}
                    >
                      {theme === 'system' ? '🖥️' : theme === 'light' ? '🌞' : '🌙'}
                    </button>
                  </div>

                  <a
                    href={dashboardUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition"
                  >
                    {t('openDashboard')}
                  </a>
                  <a
                    href="/"
                    className="rounded-xl border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 transition dark:border-neutral-700 dark:hover:bg-neutral-800 dark:text-neutral-200"
                  >
                    {t('backToApp')}
                  </a>
                </>
              )}
            </div>
          </div>

          {!collapsed && (
            <div className="h-[6px] w-full rounded-b-2xl bg-gradient-to-r from-teal-600 via-orange-500 to-teal-600 opacity-80" />
          )}
        </div>
      </div>
    </div>
  )
}
