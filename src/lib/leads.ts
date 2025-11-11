// src/lib/leads.ts
import { supabase } from "./supabase";
import { useToast } from "./toast";


export type LeadInput = {
name: string;
email: string;
source?: string;
tags?: string[];
notes?: string;
};


export async function insertLead(userId: string, input: LeadInput) {
const { data, error } = await supabase
.from("leads")
.insert({ user_id: userId, ...input })
.select()
.single();
if (error) throw error;
return data;
}


export async function listLeads() {
const { data, error } = await supabase
.from("leads")
.select("id,name,email,source,tags,notes,created_at")
.order("created_at", { ascending: false });
if (error) throw error;
return data ?? [];
}