"use client";
 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
 
interface AuthContextType {
  user: SupabaseUser | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
 
  useEffect(() => {
    // Check active session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
 
    checkSession();
 
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
 
    return () => {
      subscription.unsubscribe();
    };
  }, []);
 
  const signIn = async (email: string, password?: string) => {
    setIsLoading(true);
    // If no password provided, it's a mock student login (for now)
    if (!password) {
      // Create a mock user object to satisfy the UI
      const mockUser = { id: 'student-id', email, user_metadata: { name: email.split('@')[0] } } as any;
      setUser(mockUser);
      setIsLoading(false);
      return { error: null };
    }
 
    // Real Supabase Auth for Admin
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
 
    if (!error) {
      setUser(data.user);
    }
    
    setIsLoading(false);
    return { error };
  };
 
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };
 
  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
