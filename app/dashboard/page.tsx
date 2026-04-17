"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import DigitalID from '@/components/DigitalID';
import { 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Bell, 
  Settings,
  Download,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const resources = [
  { title: "Academic Calendar 2026-27", size: "1.2 MB", type: "PDF" },
  { title: "B.Sc. Honours Syllabus", size: "2.4 MB", type: "PDF" },
  { title: "Examination Rules & Regs", size: "850 KB", type: "PDF" },
  { title: "Holiday List 2026", size: "400 KB", type: "PDF" }
];

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-academic-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-academic-navy flex-col text-white fixed h-full pt-20">
        <div className="p-8 flex flex-col h-full">
          <nav className="space-y-2 flex-1">
            <Link href="/dashboard" className="flex items-center gap-4 p-4 rounded-xl bg-academic-gold text-academic-navy font-bold">
              <LayoutDashboard size={20} />
              Overview
            </Link>
            <Link href="#" className="flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <FileText size={20} />
              Resources
            </Link>
            <Link href="#" className="flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Calendar size={20} />
              Schedule
            </Link>
            <Link href="#" className="flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={20} />
              Notices
            </Link>
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <Link href="#" className="flex items-center gap-4 p-4 text-slate-400 hover:text-white transition-all">
              <Settings size={20} />
              Settings
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-4 p-4 w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 p-8 pt-28">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-academic-navy mb-2">Welcome back, {user.name}!</h1>
              <p className="text-slate-500">Academic Year 2026-27 | Semester I</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-green-500" />
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Status: Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Left: ID Card & Info */}
            <div className="xl:col-span-1 space-y-8">
              <DigitalID 
                student={{
                  name: user.name,
                  id: "SKD-2026-101",
                  course: "B.Sc. Honours (Comp. Science)",
                  batch: "2026-2029"
                }} 
              />
              
              <div className="bg-academic-navy p-8 rounded-3xl text-white shadow-xl">
                 <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="text-academic-gold" size={20} />
                    Recent Alerts
                 </h3>
                 <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <p className="text-sm font-bold text-academic-gold mb-1">Fee Reminder</p>
                       <p className="text-xs text-slate-400">Library security deposit due by end of month.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <p className="text-sm font-bold text-academic-gold mb-1">New Assignment</p>
                       <p className="text-xs text-slate-400">Digital Logic lab reports to be submitted.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Quick Actions & Resources */}
            <div className="xl:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Attendance", value: "85%", color: "text-blue-600" },
                  { label: "Internal Score", value: "A+", color: "text-green-600" },
                  { label: "Credits", value: "24/120", color: "text-academic-gold" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Resource Downloads */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-academic-navy">Academic Resources</h3>
                  <button className="text-academic-gold font-bold flex items-center gap-2 hover:underline">
                    View Library <ExternalLink size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-academic-gold transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-academic-navy shadow-sm group-hover:bg-academic-navy group-hover:text-white transition-all">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-academic-navy">{res.title}</p>
                          <p className="text-xs text-slate-400">{res.type} • {res.size}</p>
                        </div>
                      </div>
                      <button className="p-3 bg-white rounded-full text-slate-400 hover:text-academic-gold shadow-sm">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-academic-gold p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="text-academic-navy">
                    <h3 className="text-2xl font-black mb-2">Examination Portal</h3>
                    <p className="font-medium opacity-70">Download your Hall Tickets and view Semester Results.</p>
                 </div>
                 <button className="px-8 py-4 bg-academic-navy text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-xl">
                    Go to Portal
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
