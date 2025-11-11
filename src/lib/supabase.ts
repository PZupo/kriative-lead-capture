// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";


type Database = any; // opcional: substituir pelo tipo gerado do Supabase


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
auth: {
persistSession: true,
autoRefreshToken: true,
detectSessionInUrl: true,
},
});