"use client";

import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Loader2, Lock, Mail, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const authError = searchParams?.get('error');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError((signInError as { message: string }).message || 'Sign in failed');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-[#08090a] flex items-start justify-center p-4 pt-32 relative overflow-hidden font-sans">
      {/* Premium Linear Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-academic-gold/10 blur-[150px] rounded-full opacity-50" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full opacity-30" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111214]/80 backdrop-blur-xl rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border border-white/5 p-1">
          <div className="bg-[#1a1b1e]/50 rounded-[31px] border border-white/10 overflow-hidden">
            <div className="p-8 text-center text-white relative">
              <div className="relative w-16 h-16 bg-white rounded-2xl overflow-hidden border-2 border-academic-gold/30 mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(184,146,65,0.2)]">
                 <Image 
                   src="/images/logo.jpeg" 
                   alt="Logo" 
                   width={48} 
                   height={48} 
                   sizes="48px"
                   className="object-contain"
                 />
              </div>
              <h1 className="text-3xl font-black tracking-tighter mb-2">Admin Console</h1>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black">Authorized Personnel Only</p>
              
              <div className="absolute top-6 right-8 text-academic-gold/50">
                 <ShieldAlert size={20} className="animate-pulse" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-8 pt-0 space-y-6">
              {(error || authError) && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {authError === 'unauthorized' ? 'Access Denied: Admin Privileges Required' : error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-academic-gold transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 text-white rounded-xl border border-white/5 focus:border-academic-gold/50 focus:ring-4 focus:ring-academic-gold/5 outline-none transition-all placeholder:text-slate-700"
                    placeholder="admin@skcollege.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-academic-gold transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 text-white rounded-xl border border-white/5 focus:border-academic-gold/50 focus:ring-4 focus:ring-academic-gold/5 outline-none transition-all placeholder:text-slate-700"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-academic-gold text-academic-navy font-black rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(184,146,65,0.15)] disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Unlock Dashboard"}
              </button>

              <div className="text-center">
                 <Link href="/" className="text-[10px] font-black text-slate-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
                    ← Return to Terminal
                 </Link>
              </div>
            </form>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">
          SKC-MGMT-V1 // SECURE_LAYER_7
        </p>
      </div>
    </main>
  );
}
