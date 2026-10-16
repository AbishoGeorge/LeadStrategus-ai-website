import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// IMPORTANT: fail fast in the browser if env is missing. During build-time
// prerendering (SSR) the client is never called, so use a placeholder there.
if (!import.meta.env.SSR) {
  if (!supabaseUrl) {
    throw new Error('Missing VITE_SUPABASE_URL');
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY');
  }
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'prerender-placeholder'
);
