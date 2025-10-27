import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-bg text-fg p-8">
      <h1 className="text-2xl font-bold">Lead Capture — CSS OK</h1>
      <p className="mt-2">Se você vê fundo cinza e este texto, Tailwind está ativo.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
