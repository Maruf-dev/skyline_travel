import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !serviceKey || !anonKey) {
  throw new Error("Missing Supabase env vars. Copy .env.example to .env and fill in values.");
}

// Service-role client — full access, used only in backend
export const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// Anon client — respects RLS, safe to expose in public contexts if needed
export const supabaseAnon = createClient(url, anonKey, {
  auth: { persistSession: false },
});
