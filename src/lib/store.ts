// src/lib/store.ts
import { create } from "zustand";


export type SessionUser = {
id: string;
email?: string | null;
display_name?: string | null;
};


type AuthState = {
user: SessionUser | null;
setUser: (u: SessionUser | null) => void;
};


export const useAuthStore = create<AuthState>((set) => ({
user: null,
setUser: (u) => set({ user: u }),
}));


// Créditos (mock)
interface CreditsState {
balance: number;
setBalance: (n: number) => void;
add: (n: number) => void;
consume: (n: number) => boolean; // retorna true se ok
}


export const useCreditsStore = create<CreditsState>((set, get) => ({
balance: 0,
setBalance: (n) => set({ balance: n }),
add: (n) => set({ balance: get().balance + n }),
consume: (n) => {
const b = get().balance;
if (b < n) return false;
set({ balance: b - n });
return true;
},
}));