/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK: 'true' | 'false' | string
  readonly VITE_KRIATIVE_SHELL: 'off' | 'topnav' | string
  readonly VITE_DASHBOARD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
