// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../lib/toast";


export default function LoginForm() {
const toast = useToast();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);


async function onSubmit(e: React.FormEvent) {
e.preventDefault();
setLoading(true);
const { error } = await supabase.auth.signInWithPassword({ email, password });
setLoading(false);
if (error) return toast.error(error.message);
toast.success("Login efetuado!");
}


return (
<form onSubmit={onSubmit} className="flex gap-2 items-center">
<input
className="border rounded px-3 py-2 text-sm"
placeholder="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<input
className="border rounded px-3 py-2 text-sm"
placeholder="senha"
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<button disabled={loading} className="px-3 py-2 rounded bg-black text-white disabled:opacity-50">
{loading ? "..." : "Entrar"}
</button>
</form>
);
}