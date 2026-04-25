"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  GraduationCap, 
  Bell, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    inquiries: 0,
    notices: 0,
    faculty: 0,
  });
  interface Inquiry {
    id: string;
    name: string;
    course: string;
    created_at: string;
  }

  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch counts
        const [inqRes, notRes, facRes] = await Promise.all([
          supabase.from('inquiries').select('id', { count: 'exact', head: true }),
          supabase.from('notices').select('id', { count: 'exact', head: true }),
          supabase.from('faculty').select('id', { count: 'exact', head: true })
        ]);

        // Fetch recent inquiries
        const { data: recentInq } = await supabase
          .from('inquiries')
          .select('id, name, course, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        setStats({
          inquiries: inqRes.count || 0,
          notices: notRes.count || 0,
          faculty: facRes.count || 0,
        });

        if (recentInq) {
          setRecentInquiries(recentInq);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const statCards = [
    { name: 'Total Inquiries', value: stats.inquiries, icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: 'Live Data' },
    { name: 'Active Notices', value: stats.notices, icon: Bell, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: 'Live Data' },
    { name: 'Faculty Members', value: stats.faculty, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: 'Live Data' },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-academic-navy tracking-tight mb-2">System Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back. Here&apos;s your mission control for S.K. College today.</p>
        </div>
        <div className="flex items-center gap-4 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50 shadow-sm relative z-10 backdrop-blur-sm">
           <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <ShieldCheck size={24} />
           </div>
           <div className="pr-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Sync</p>
              <p className="text-sm font-black text-emerald-700 uppercase">Live Connected</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center border border-current/10 shadow-inner`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-tighter bg-emerald-50 px-2 py-1 rounded-lg">
                 <TrendingUp size={12} />
                 {stat.trend}
              </div>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-1 relative z-10">{stat.name}</p>
            <h2 className="text-5xl font-black text-academic-navy tracking-tighter relative z-10">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg p-8">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-academic-navy tracking-tight">Recent Inquiries</h3>
              <Link href="/admin/admissions" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
                 View All <ArrowUpRight size={14} />
              </Link>
           </div>
           
           <div className="space-y-4">
              {recentInquiries.length > 0 ? recentInquiries.map((inq, i) => {
                const date = new Date(inq.created_at);
                const isToday = date.toDateString() === new Date().toDateString();
                const timeStr = isToday ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : date.toLocaleDateString();

                return (
                 <div key={inq.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       {inq.name ? inq.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="font-black text-academic-navy leading-tight truncate">{inq.name || 'Unknown'}</p>
                       <p className="text-xs text-slate-500 font-medium truncate">{inq.course || 'Not specified'}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{timeStr}</p>
                       <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto mt-1 shadow-sm shadow-blue-500/50" />
                    </div>
                 </div>
              )}) : (
                <div className="text-center py-10">
                  <GraduationCap className="mx-auto text-slate-300 mb-3" size={40} />
                  <p className="text-slate-500 font-bold">No recent inquiries found.</p>
                </div>
              )}
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0A0F1C] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl border border-white/5">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-overlay" />
           <h3 className="text-xl font-black mb-8 relative z-10">Quick Actions</h3>
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <Link href="/admin/notices" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm active:opacity-80 active:translate-y-[1px]">
                 <Bell className="mb-4 text-blue-400 group-hover:scale-110 transition-transform drop-shadow-md" size={28} />
                 <p className="font-bold text-sm tracking-wide">Post Notice</p>
              </Link>
              <Link href="/admin/faculty" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm active:opacity-80 active:translate-y-[1px]">
                 <Users className="mb-4 text-purple-400 group-hover:scale-110 transition-transform drop-shadow-md" size={28} />
                 <p className="font-bold text-sm tracking-wide">Manage Staff</p>
              </Link>
              <Link href="/" target="_blank" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm active:opacity-80 active:translate-y-[1px]">
                 <Globe className="mb-4 text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-md" size={28} />
                 <p className="font-bold text-sm tracking-wide">Live Website</p>
              </Link>
              <Link href="/admin/videos" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm active:opacity-80 active:translate-y-[1px]">
                 <Clock className="mb-4 text-amber-400 group-hover:scale-110 transition-transform drop-shadow-md" size={28} />
                 <p className="font-bold text-sm tracking-wide">Add Video</p>
              </Link>
           </div>
           
           {/* Decorative Background Icon */}
           <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
