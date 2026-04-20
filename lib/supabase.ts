import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const createMockQuery = () => {
  const mock = {
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
    then: (resolve: (val: unknown) => void) => {
      resolve({ data: [], error: null });
      return mock;
    },
    catch: () => mock,
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
      storage: {
        from: () => ({
          upload: async () => ({ data: {}, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          remove: async () => ({ data: {}, error: null }),
        })
      }
    } as unknown as ReturnType<typeof createClient>);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Admin module will be in mock mode.');
}
