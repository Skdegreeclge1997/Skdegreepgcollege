"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Image as ImageIcon, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Admissions', href: '/admin/admissions', icon: GraduationCap },
  { name: 'Notices', href: '/admin/notices', icon: Bell },
  { name: 'Faculty', href: '/admin/faculty', icon: Users },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      // Bypass for local testing
      if (typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true') {
        setUser({ email: 'admin@skcollege.com' });
        setIsLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
      setIsLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    localStorage.removeItem('isAdmin');
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-academic-navy" size={40} />
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-academic-navy text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center">
               <Image src="/images/logo.jpeg" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <div>
               <h2 className="font-black text-sm tracking-tight">ADMIN PANEL</h2>
               <p className="text-[10px] text-academic-gold font-bold uppercase tracking-widest leading-none">SK Degree College</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto">
               <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group
                    ${isActive 
                      ? 'bg-academic-gold text-academic-navy shadow-lg shadow-academic-gold/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <item.icon size={20} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-white/5 border border-white/10">
               <div className="w-8 h-8 rounded-full bg-academic-gold flex items-center justify-center text-academic-navy font-black text-xs">
                  {user.email?.[0].toUpperCase()}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{user.email}</p>
                  <div className="flex items-center gap-1 text-[8px] font-black text-academic-gold uppercase tracking-tighter">
                     <ShieldCheck size={8} />
                     Master Admin
                  </div>
               </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} className="text-academic-navy" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged in as</span>
                <span className="text-sm font-black text-academic-navy">{user.email}</span>
             </div>
             <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                <Bell size={20} />
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
