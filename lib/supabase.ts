import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the real client if keys are present to prevent build errors
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getUser: async () => ({ data: { user: null } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase keys missing' } }),
        signOut: async () => ({}),
      },
      from: () => ({
        select: () => ({ order: () => ({ data: [] }) }),
        insert: () => ({}),
        delete: () => ({ eq: () => ({}) }),
      }),
    } as any);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Admin module will be in mock mode.');
}
