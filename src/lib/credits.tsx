// src/lib/credits.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSessionUser } from "./auth";
import { supabase } from "./supabase";

type CreditsCtx = {
  credits: number;
  loading: boolean;
  consume: (n?: number) => Promise<boolean>;
  add: (n: number, meta?: Record<string, any>) => Promise<void>;
  reset: (n?: number) => Promise<void>;
};

const CreditsContext = createContext<CreditsCtx | null>(null);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const user = useSessionUser();
  const uid = user?.id ?? "guest";
  const KEY = `kriative_credits_${uid}`;

  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 🔹 Carrega créditos (Supabase se logado; localStorage se guest)
  useEffect(() => {
    let alive = true;
    async function load() {
      if (!uid || uid === "guest") {
        const local = Number(localStorage.getItem(KEY) || "10");
        if (alive) setCredits(local);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("credits")
        .select("balance")
        .eq("user_id", uid)
        .single();

      if (error || !data) {
        await supabase
          .from("credits")
          .upsert({ user_id: uid, balance: 10 }, { onConflict: "user_id" });
        if (alive) setCredits(10);
      } else if (alive) {
        setCredits(data.balance);
      }

      if (alive) setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, [uid, KEY]);

  // 🔹 Backup local sempre atualizado
  useEffect(() => {
    localStorage.setItem(KEY, String(credits));
  }, [credits, KEY]);

  // 🔹 Consome créditos via RPC (atômico)
  async function consume(n = 1): Promise<boolean> {
    if (uid === "guest") {
      if (credits < n) return false;
      const next = credits - n;
      setCredits(next);
      return true;
    }

    setLoading(true);
    const { data, error } = await supabase.rpc("debit_credits", { n });
    setLoading(false);

    if (error) {
      console.error("Erro ao consumir créditos:", error);
      return false;
    }

    if (typeof data === "number") {
      setCredits(data);
      return true;
    }

    return false;
  }

  // 🔹 Adiciona créditos via RPC (já pronto para Stripe)
  async function add(n: number, meta: Record<string, any> = {}) {
    if (uid === "guest") {
      const next = credits + n;
      setCredits(next);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.rpc("add_credits", { n, meta });
    setLoading(false);

    if (error) {
      console.error("Erro ao adicionar créditos:", error);
      return;
    }

    if (typeof data === "number") {
      setCredits(data);
    }
  }

  // 🔹 Reseta créditos (modo dev/teste)
  async function reset(n = 10) {
    if (uid === "guest") {
      setCredits(n);
      return;
    }

    const { error } = await supabase
      .from("credits")
      .upsert({ user_id: uid, balance: n }, { onConflict: "user_id" });

    if (!error) setCredits(n);
  }

  const value = useMemo(
    () => ({ credits, loading, consume, add, reset }),
    [credits, loading]
  );

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error("useCredits must be used within CreditsProvider");
  return ctx;
}
