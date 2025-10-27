// Leitura segura das envs do Vite
export const GOOGLE_PLACES_API_KEY =
  (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY || '';
