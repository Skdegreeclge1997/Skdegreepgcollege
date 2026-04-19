"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
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
  Loader2,
  Newspaper,
  Video,
  KeyRound,
  UserCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Admissions', href: '/admin/admissions', icon: GraduationCap },
  { name: 'Notices', href: '/admin/notices', icon: Bell },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Faculty', href: '/admin/faculty', icon: Users },
  { name: 'Photo Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Video Gallery', href: '/admin/videos', icon: Video },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;

      if (!user) {
        setIsVerifying(false);
        if (pathname !== '/admin/login') router.push('/admin/login');
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        const currentRole = profile?.role || user?.app_metadata?.role;
        setRole(currentRole);
        
        const isAdmin = currentRole === 'admin';

        if (!isAdmin && pathname !== '/admin/login') {
          router.push('/admin/login?error=unauthorized');
        }
      } catch (err) {
        // Silent catch
      } finally {
        setIsVerifying(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading, pathname, router]);

  // Inactivity Timeout
  useEffect(() => {
    if (!user || pathname === '/admin/login') return;

    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      // 10 minutes = 600,000 ms
      timeoutId = setTimeout(() => {
        supabase.auth.signOut().then(() => {
          router.push('/admin/login?message=Session expired due to inactivity');
        });
      }, 600000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((evt) => document.addEventListener(evt, resetTimeout));
    
    resetTimeout(); // Initialize the timer

    return () => {
      clearTimeout(timeoutId);
      events.forEach((evt) => document.removeEventListener(evt, resetTimeout));
    };
  }, [user, pathname, router]);

  if (authLoading || (isVerifying && pathname !== '/admin/login')) {
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-academic-gold" size={40} />
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  // If on login page, just render the login form
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Double check admin status before rendering dashboard
  const isAdmin = role === 'admin';
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <ShieldCheck size={48} className="text-red-500 mx-auto opacity-50" />
          <p className="text-white font-bold">Access Restricted</p>
          <p className="text-slate-500 text-xs">You are logged in as {user?.email}, but you do not have Admin privileges.</p>
          <button 
            onClick={() => signOut()} 
            className="text-academic-gold text-xs font-black uppercase tracking-widest hover:underline"
          >
            Sign Out & Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0F1C] border-r border-white/5 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full relative">
          {/* Subtle Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3 relative z-10">
            <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center ring-2 ring-white/10">
               <Image src="/images/logo.jpeg" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <div>
               <h2 className="font-black text-sm tracking-tight text-white">ADMIN PORTAL</h2>
               <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none mt-1">S.K. Degree College</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto p-2 hover:bg-white/10 rounded-lg text-white">
               <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto relative z-10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2 mt-2">Main Menu</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group relative overflow-hidden active:scale-[0.97]
                    ${isActive 
                      ? 'text-white bg-blue-600/10 border border-blue-500/20 shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />}
                  <item.icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight size={16} className="text-blue-500" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
               <h1 className="text-lg font-black text-academic-navy tracking-tight">Dashboard</h1>
               <p className="text-xs font-bold text-slate-400">Welcome back, system active.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
             <button className="relative w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-academic-navy hover:bg-slate-100 transition-all active:scale-90">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>

             {/* Profile Dropdown Container */}
             <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                     {user?.email?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="hidden md:flex flex-col items-start text-left">
                     <span className="text-sm font-black text-academic-navy leading-none">{user?.email?.split('@')[0] || 'Admin'}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Master Admin</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 transform origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-slate-100">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                       <p className="text-sm font-black text-academic-navy truncate">{user?.email}</p>
                    </div>
                    
                    <div className="p-2">
                       <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-academic-navy font-bold text-sm transition-colors text-left">
                         <UserCircle size={18} className="text-slate-400" />
                         Account Settings
                       </button>
                       <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-academic-navy font-bold text-sm transition-colors text-left">
                         <KeyRound size={18} className="text-slate-400" />
                         Change Password
                       </button>
                    </div>

                    <div className="p-2 border-t border-slate-100">
                       <button 
                         onClick={handleSignOut}
                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-bold text-sm transition-colors text-left"
                       >
                         <LogOut size={18} />
                         Sign Out Securely
                       </button>
                    </div>
                  </div>
                )}
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
