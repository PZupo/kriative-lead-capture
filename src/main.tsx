import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Lead Capture — Health Check</h1>
      <p>Se você vê isso, o React está renderizando.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
