"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Lock, Mail, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-academic-navy p-8 text-center text-white relative">
            <div className="relative w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-academic-gold mx-auto mb-4 flex items-center justify-center shadow-xl">
               <Image 
                 src="/images/logo.jpeg" 
                 alt="Logo" 
                 width={48} 
                 height={48} 
                 className="object-contain"
               />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Admin Console</h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
            
            <div className="absolute top-4 right-4 text-academic-gold">
               <ShieldAlert size={20} className="animate-pulse" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-academic-navy focus:ring-2 focus:ring-academic-navy/10 outline-none transition-all"
                  placeholder="admin@skcollege.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-academic-navy focus:ring-2 focus:ring-academic-navy/10 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-academic-navy text-white font-black rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Unlock Dashboard"}
            </button>

            <div className="text-center">
               <Link href="/" className="text-xs font-bold text-slate-400 hover:text-academic-navy transition-colors uppercase tracking-widest">
                  Back to Website
               </Link>
            </div>
          </form>
        </div>
        
        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          SK Degree & P.G. College Management System
        </p>
      </div>
    </main>
  );
}
