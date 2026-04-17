"use client";

import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-academic-navy p-8 text-center text-white">
            <div className="w-16 h-16 bg-academic-gold rounded-full flex items-center justify-center text-academic-navy font-bold text-2xl mx-auto mb-4 shadow-lg">
              SK
            </div>
            <h1 className="text-2xl font-bold">Student Portal</h1>
            <p className="text-slate-400 text-sm mt-2">Login to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold focus:ring-2 focus:ring-academic-gold/20 outline-none transition-all"
                  placeholder="name@student.com"
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-academic-gold focus:ring-2 focus:ring-academic-gold/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-academic-gold focus:ring-academic-gold" />
                Remember me
              </label>
              <a href="#" className="text-academic-gold font-bold hover:underline">Forgot?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-academic-navy text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Login Now"}
            </button>

            <div className="text-center pt-4">
              <p className="text-slate-500 text-sm">
                Don't have an account? <Link href="/admissions" className="text-academic-gold font-bold hover:underline">Apply Here</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-blue-700 text-sm leading-relaxed">
          <div className="shrink-0 pt-0.5 font-bold">Note:</div>
          <p>This is a secure area. If you've forgotten your student ID or password, please contact the IT helpdesk in the library building.</p>
        </div>
      </div>
    </main>
  );
}
