// src/components/auth/UserMenu.tsx
import React from "react";
import { supabase } from "../../lib/supabase";
import { useSessionUser } from "../../lib/auth";


export default function UserMenu() {
const user = useSessionUser();
if (!user) return null;
return (
<div className="flex items-center gap-3 text-sm">
<span className="opacity-70">{user.email}</span>
<button
onClick={() => supabase.auth.signOut()}
className="px-2 py-1 border rounded"
>Sair</button>
</div>
);
}