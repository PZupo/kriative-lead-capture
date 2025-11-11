import React, { useEffect } from "react";
import { supabase } from "./supabase";
import { useAuthStore, useCreditsStore } from "./store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setBalance = useCreditsStore((s) => s.setBalance);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user;
      if (u) {
        setUser({ id: u.id, email: u.email ?? null, display_name: u.user_metadata?.display_name ?? null });
        const { data: c } = await supabase.from("credits").select("balance").eq("user_id", u.id).maybeSingle();
        if (c?.balance != null) setBalance(c.balance);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user;
      if (!u) {
        setUser(null);
        setBalance(0);
        return;
      }
      setUser({ id: u.id, email: u.email ?? null, display_name: u.user_metadata?.display_name ?? null });
      const { data: c } = await supabase.from("credits").select("balance").eq("user_id", u.id).maybeSingle();
      if (c?.balance != null) setBalance(c.balance);
    });

    return () => { sub.subscription.unsubscribe(); };
  }, [setUser, setBalance]);

  return <>{children}</>;
}

export function useSessionUser() {
  return useAuthStore((s) => s.user);
}
