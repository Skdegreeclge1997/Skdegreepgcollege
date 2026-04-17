"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Bell, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { name: 'Total Inquiries', value: '48', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12% this week' },
  { name: 'Active Notices', value: '12', icon: Bell, color: 'text-academic-gold', bg: 'bg-yellow-50', trend: '2 ending soon' },
  { name: 'Faculty Members', value: '24', icon: Users, color: 'text-green-600', bg: 'bg-green-50', trend: 'Full strength' },
];

export default function AdminOverview() {
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-academic-navy tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, Admin. Here's what's happening at SK College today.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <ShieldCheck size={24} />
           </div>
           <div className="pr-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
              <p className="text-sm font-black text-academic-navy uppercase">All Services Online</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-tighter">
                 <TrendingUp size={12} />
                 {stat.trend}
              </div>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-1">{stat.name}</p>
            <h2 className="text-4xl font-black text-academic-navy">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-academic-navy tracking-tight">Recent Inquiries</h3>
              <Link href="/admin/admissions" className="text-xs font-bold text-academic-gold hover:underline flex items-center gap-1">
                 View All <ArrowUpRight size={14} />
              </Link>
           </div>
           <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold group-hover:bg-academic-gold/10 group-hover:text-academic-gold transition-all">
                       # {i}
                    </div>
                    <div className="flex-1">
                       <p className="font-black text-academic-navy leading-tight">Student Inquiry {i}</p>
                       <p className="text-xs text-slate-400 font-medium">Applied for B.Sc Honours</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2h ago</p>
                       <div className="w-2 h-2 bg-academic-gold rounded-full ml-auto mt-1" />
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-academic-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-academic-navy/20">
           <h3 className="text-xl font-black mb-8 relative z-10">Quick Actions</h3>
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <Link href="/admin/notices" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                 <Bell className="mb-4 text-academic-gold group-hover:scale-110 transition-transform" size={24} />
                 <p className="font-bold text-sm">Post Notice</p>
              </Link>
              <Link href="/admin/faculty" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                 <Users className="mb-4 text-academic-gold group-hover:scale-110 transition-transform" size={24} />
                 <p className="font-bold text-sm">Add Faculty</p>
              </Link>
              <Link href="/" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                 <Globe className="mb-4 text-academic-gold group-hover:scale-110 transition-transform" size={24} />
                 <p className="font-bold text-sm">Live Site</p>
              </Link>
              <Link href="/admin/admissions" className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                 <Clock className="mb-4 text-academic-gold group-hover:scale-110 transition-transform" size={24} />
                 <p className="font-bold text-sm">Review Leads</p>
              </Link>
           </div>
           
           {/* Decorative Background Icon */}
           <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
}
