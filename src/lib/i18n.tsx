import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { translations } from '../translations'

type Locale = 'pt-BR' | 'en-US'
type Ctx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<Ctx | null>(null)
const STORAGE = 'kriative.locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR')

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE) as Locale) || 'pt-BR'
    setLocaleState(saved)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE, l)
  }

  const t = useMemo(() => {
    return (key: string) => {
      const entry = (translations as any)[key]
      if (!entry) return key
      return entry[locale] ?? entry['pt-BR'] ?? key
    }
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
