import { GOOGLE_PLACES_API_KEY } from './env';

// Tipos mínimos para a resposta "normalizada"
export type PlaceResult = {
  name: string;
  city?: string;
  uf?: string;
  phone?: string;
  category?: string;
};

// Filtros básicos
export type PlaceFilters = {
  categoria?: string;
  nicho?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
};

// Mock: simula latência e retorna resultados sintéticos
export async function searchPlacesMock(filters: PlaceFilters): Promise<PlaceResult[]> {
  const base = [
    { name: 'Clínica Bem Viver', city: 'São Paulo', uf: 'SP', category: 'Terapias integrativas' },
    { name: 'Espaço Harmonia', city: 'Campinas', uf: 'SP', category: 'Acupuntura' },
    { name: 'Vida Plena', city: 'Rio de Janeiro', uf: 'RJ', category: 'Coaching e bem estar' },
    { name: 'Alma Leve Studio', city: 'Belo Horizonte', uf: 'MG', category: 'Yoga e mindfulness' }
  ];

  // Aumenta o volume para dar “cara” de busca
  const big = Array.from({ length: 8 }).flatMap((_, k) =>
    base.map(x => ({
      name: `${x.name} ${k + 1}`,
      city: x.city,
      uf: x.uf,
      phone: '(11) 90000-0000',
      category: x.category
    }))
  );

  // Aplica filtros simples
  const filtered = big
    .filter(x => !filters.cidade || x.city?.toLowerCase().includes(filters.cidade.toLowerCase()))
    .filter(x => !filters.uf || x.uf === filters.uf.toUpperCase())
    .filter(x => !filters.nicho || x.category?.toLowerCase().includes(filters.nicho.toLowerCase()));

  // Simula latência de rede
  await new Promise(r => setTimeout(r, 600));
  return filtered;
}

/**
 * Pré-wire para produção:
 * Quando você colocar a chave em .env (VITE_GOOGLE_PLACES_API_KEY),
 * vamos trocar esta função para bater na API real (via backend/edge).
 * Aqui, mantemos um “stub” seguro.
 */
export async function searchPlaces(filters: PlaceFilters): Promise<PlaceResult[]> {
  if (!GOOGLE_PLACES_API_KEY) {
    // Sem chave: fica no mock sem custo
    return searchPlacesMock(filters);
  }

  // Esboço para produção (desativado no frontend por segurança):
  // 1) Crie uma rota de API (vercel edge ou serverless) que utilize a chave
  // 2) Faça fetch para essa rota passando "filters"
  // 3) Normalize a resposta em PlaceResult[]
  //
  // Por ora, seguimos no mock mesmo:
  return searchPlacesMock(filters);
}
