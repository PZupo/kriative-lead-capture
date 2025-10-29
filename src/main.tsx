import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import './index.css'
import { ThemeProvider } from './lib/theme'
import { I18nProvider } from './lib/i18n'

const shell = import.meta.env.VITE_KRIATIVE_SHELL

async function mount() {
  const root = ReactDOM.createRoot(document.getElementById('root')!)

  if (shell === 'topnav') {
    const { default: TopNavSafe } = await import('./components/TopNavSafe')
    root.render(
      <React.StrictMode>
        <ThemeProvider>
          <I18nProvider>
            <TopNavSafe />
            <App />
          </I18nProvider>
        </ThemeProvider>
      </React.StrictMode>
    )
    return
  }

  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

mount()
