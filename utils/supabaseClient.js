import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseService = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.API_KEY_SECRET
  );
