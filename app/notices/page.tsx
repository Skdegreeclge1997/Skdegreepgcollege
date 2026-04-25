import React from 'react';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Bell, GraduationCap, Calendar, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Notice Board | S.K. Degree & P.G. College',
  description: 'Stay updated with the latest news, events, and academic announcements from S.K. Degree & P.G. College.',
};

export default async function NoticeBoardPage() {
  // Fetch from Supabase
  const { data: dbNotices } = await supabase
    .from('notices')
    .select('*')
    .order('isPinned', { ascending: false })
    .order('date', { ascending: false });

  // Use DB data if available, otherwise fallback to local JSON
  const isLiveData = dbNotices && dbNotices.length > 0;
  const allNotices = isLiveData
    ? (dbNotices as Notice[]) 
    : (noticesData as Notice[]);

  // Split notices into categories matching home page
  const academicNotices = allNotices.filter(n => ['Exam', 'General'].includes(n.category) || n.isPinned);
  const admissionEvents = allNotices.filter(n => ['Admission', 'Event', 'Holiday'].includes(n.category));

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section - Home Page Style */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-academic-gold/10 border border-academic-gold/20 rounded-full text-academic-navy text-[10px] font-black uppercase tracking-[0.2em]">
            <Bell size={12} className="text-academic-gold" />
            Official Bulletin
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-academic-navy tracking-tight">
            College <span className="text-academic-gold">Notice Board</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium">
            Stay informed with the latest academic schedules, admission updates, and campus events. 
            All official announcements are posted here in real-time.
          </p>
          <div className="flex justify-center mt-4">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${isLiveData ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {isLiveData ? '● Live Feed Connected' : '○ Demo Archive Mode'}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 1. Academic Notices Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academic-navy rounded-xl flex items-center justify-center text-academic-gold shadow-lg shadow-academic-navy/10">
                     <GraduationCap size={20} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-academic-navy leading-none">Academic Notices</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Exams & Curriculum</p>
                  </div>
               </div>
               <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                  {academicNotices.length} Items
               </span>
            </div>

            <div className="space-y-4">
              {academicNotices.map((notice) => (
                <div key={notice.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <NoticeCard notice={notice} />
                </div>
              ))}
              {academicNotices.length === 0 && (
                <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold italic">
                   No recent academic notices.
                </div>
              )}
            </div>
          </div>

          {/* 2. Admission & Events Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academic-navy rounded-xl flex items-center justify-center text-academic-gold shadow-lg shadow-academic-navy/10">
                     <Calendar size={20} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-academic-navy leading-none">Admission & Events</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Campus Life & Updates</p>
                  </div>
               </div>
               <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                  {admissionEvents.length} Items
               </span>
            </div>

            <div className="space-y-4">
              {admissionEvents.map((notice) => (
                <div key={notice.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <NoticeCard notice={notice} />
                </div>
              ))}
              {admissionEvents.length === 0 && (
                <div className="p-10 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold italic">
                   No recent admission or event updates.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-20 p-1 bg-gradient-to-r from-academic-navy to-blue-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
           <div className="bg-academic-navy/95 backdrop-blur-xl rounded-[2.3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center gap-2 text-academic-gold text-xs font-black uppercase tracking-widest mb-2 justify-center md:justify-start">
                   <Info size={14} />
                   Administrative Help
                </div>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white">Missing some information?</h2>
                <p className="text-slate-400 max-w-xl font-medium">
                  Our administrative office is open Monday to Saturday (9:00 AM - 4:30 PM). 
                  Visit us or call for any specific inquiries.
                </p>
              </div>
              <button className="px-10 py-4 bg-academic-gold text-academic-navy font-black rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95 whitespace-nowrap">
                Contact Office
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
