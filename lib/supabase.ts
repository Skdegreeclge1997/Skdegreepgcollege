import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const createMockQuery = () => {
  const mock: any = {
    select: () => mock,
    order: () => mock,
    limit: () => mock,
    eq: () => mock,
    neq: () => mock,
    in: () => mock,
    single: () => mock,
    maybeSingle: () => mock,
    insert: () => mock,
    update: () => mock,
    delete: () => mock,
    match: () => mock,
    then: (resolve: any) => resolve({ data: [], error: null }),
    catch: (resolve: any) => mock,
  };
  return mock;
};

// Only create the real client if keys are present to prevent build errors
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getUser: async () => ({ data: { user: null } }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase keys missing' } }),
        signOut: async () => ({}),
      },
      from: () => createMockQuery(),
    } as any);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Admin module will be in mock mode.');
}
