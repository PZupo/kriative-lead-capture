import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const shell = import.meta.env.VITE_KRIATIVE_SHELL

async function mount() {
  const root = ReactDOM.createRoot(document.getElementById('root')!)

  if (shell === 'topnav') {
    // lazy para não pesar quando desligado
    const { default: TopNavSafe } = await import('./components/TopNavSafe')
    root.render(
      <React.StrictMode>
        <TopNavSafe />
        <App />
      </React.StrictMode>
    )
    return
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

mount()
