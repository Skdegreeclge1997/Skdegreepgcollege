import React from 'react';
import NoticeCard from '@/components/NoticeCard';
import noticesData from '@/lib/data/notices.json';
import { Notice } from '@/lib/types';

// Cast JSON data to Notice array
const notices = noticesData as Notice[];

export const metadata = {
  title: 'Notice Board | SK Degree College',
  description: 'Stay updated with the latest news, events, and academic announcements from SK Degree College.',
};

export default function NoticeBoardPage() {
  // Sort notices: Pinned first, then by date descending
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-academic-navy mb-6 leading-tight text-balance">
            Notice Board & <br />
            <span className="text-academic-gold">Recent Announcements</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay informed about admission schedules, examination dates, cultural events, 
            and important college updates. We ensure our students and staff never miss a beat.
          </p>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>

        {/* Contact/Help Section */}
        <div className="mt-20 p-8 md:p-12 bg-academic-navy rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Didn't find what you were looking for?</h2>
            <p className="text-slate-300 max-w-xl">
              Our administrative office is open from Monday to Saturday, 9:00 AM to 4:30 PM. 
              Feel free to reach out for specific queries.
            </p>
          </div>
          <button className="relative z-10 px-8 py-3 bg-academic-gold text-academic-navy font-bold rounded-lg hover:bg-white transition-colors duration-300 whitespace-nowrap">
            Contact Administration
          </button>
          
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-academic-gold/10 rounded-full blur-3xl -mr-32 -mt-32" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
