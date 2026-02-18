import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabaseInstance: SupabaseClient | null = null;

export function createSupabaseClient() {
    // En el servidor (SSR) siempre creamos una nueva instancia
    if (typeof window === 'undefined') {
        return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // En el cliente (Browser) usamos singleton para evitar múltiples instancias y sus listeners
    if (!supabaseInstance) {
        supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    return supabaseInstance;
}
