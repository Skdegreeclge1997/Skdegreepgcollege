import React from 'react';
import NoticeViewer from '@/components/NoticeViewer';
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
    .order('is_pinned', { ascending: false })
    .order('date', { ascending: false });

  // Only use live DB data
  const allNotices = (dbNotices || []) as Notice[];

  // Split notices into categories matching home page
  const academicNotices = allNotices.filter(n => ['Exam', 'General'].includes(n.category) || n.is_pinned);
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <NoticeViewer 
            notices={academicNotices} 
            title="Academic Notices" 
            subtitle="Exams & Curriculum" 
            icon={<GraduationCap size={20} />} 
          />
          
          <NoticeViewer 
            notices={admissionEvents} 
            title="Admission & Events" 
            subtitle="Campus Life & Updates" 
            icon={<Calendar size={20} />} 
          />
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
