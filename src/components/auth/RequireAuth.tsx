// src/components/auth/RequireAuth.tsx
import React from "react";
import { useSessionUser } from "../../lib/auth";


export default function RequireAuth({ children }: { children: React.ReactNode }) {
const user = useSessionUser();
if (!user) return <div className="p-6 text-sm opacity-70">Faça login para continuar.</div>;
return <>{children}</>;
}