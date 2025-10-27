import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Navbar from './ui/Navbar'
import Sidebar from './ui/Sidebar'
import Results from './ui/Results'

export type Campaign = {
  id: string
  nome: string
  categoria: string
  nicho: string
  cidade: string
  uf: string
  cep?: string
  createdAt: string
}

export type Lead = {
  id: string
  nome: string
  endereco?: string
  telefone?: string
  website?: string
  segmento: string
  cidade: string
  uf: string
  fonte: 'Mock'
  data: string
}

function App() {
  // Estado da busca atual
  const [categoria, setCategoria] = useState('')
  const [nicho, setNicho] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')
  const [cep, setCep] = useState('')

  // Mock de leads para visual
  const leads: Lead[] = useMemo(() => {
    if (!categoria && !cidade && !uf && !nicho) return []
    const base = [
      { nome: 'Clínica Bem Viver', cidade: 'São Paulo', uf: 'SP', segmento: 'Terapias integrativas' },
      { nome: 'Espaço Harmonia', cidade: 'Campinas', uf: 'SP', segmento: 'Acupuntura' },
      { nome: 'Vida Plena', cidade: 'Rio de Janeiro', uf: 'RJ', segmento: 'Coaching e bem estar' },
      { nome: 'Alma Leve Studio', cidade: 'Belo Horizonte', uf: 'MG', segmento: 'Yoga e mindfulness' }
    ]
    return base
      .filter(x => !cidade || x.cidade.toLowerCase().includes(cidade.toLowerCase()))
      .filter(x => !uf || x.uf === uf.toUpperCase())
      .filter(x => !nicho || x.segmento.toLowerCase().includes(nicho.toLowerCase()))
      .map((x, i) => ({
        id: String(i + 1),
        nome: x.nome,
        endereco: `${x.cidade} - ${x.uf}`,
        telefone: '(11) 90000-0000',
        website: undefined,
        segmento: x.segmento,
        cidade: x.cidade,
        uf: x.uf,
        fonte: 'Mock' as const,
        data: new Date().toISOString()
      }))
  }, [cidade, uf, nicho, categoria])

  // Salvar campanha no localStorage
  function saveCampaign() {
    const campaigns: Campaign[] = JSON.parse(localStorage.getItem('kriative_campaigns') || '[]')
    const newCamp: Campaign = {
      id: crypto.randomUUID(),
      nome: `${categoria || 'Geral'} - ${cidade || uf || 'Brasil'}`,
      categoria,
      nicho,
      cidade,
      uf,
      cep: cep || undefined,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('kriative_campaigns', JSON.stringify([newCamp, ...campaigns]))
    alert('Campanha salva com sucesso')
  }

  // Exportar CSV dos leads da busca atual
  function exportCSV() {
    if (!leads.length) {
      alert('Nenhum lead para exportar')
      return
    }
    const header = ['nome', 'segmento', 'cidade', 'uf', 'telefone', 'fonte', 'data']
    const rows = leads.map(l => [l.nome, l.segmento, l.cidade, l.uf, l.telefone || '', l.fonte, l.data])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Navbar />
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 p-4">
        <Sidebar
          values={{ categoria, nicho, cidade, uf, cep }}
          onChange={{ setCategoria, setNicho, setCidade, setUf, setCep }}
          actions={{ saveCampaign, exportCSV }}
        />
        <Results leads={leads} />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
