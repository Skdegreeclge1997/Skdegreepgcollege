"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/login');
  }, [router]);

  return (
    <main className="min-h-screen bg-[#08090a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-academic-gold" size={40} />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Redirecting to Admin Console...</p>
      </div>
    </main>
  );
}
