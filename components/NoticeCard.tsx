import React from 'react';
import { Calendar, Pin, Bell, ArrowRight, FileText } from 'lucide-react';
import { Notice, NoticeCategory } from '@/lib/types';

interface NoticeCardProps {
  notice: Notice;
}

const getCategoryStyles = (category: NoticeCategory) => {
  switch (category) {
    case 'Admission':
      return 'bg-academic-navy text-white';
    case 'Exam':
      return 'bg-red-600 text-white';
    case 'Event':
      return 'bg-academic-gold text-academic-navy';
    case 'Holiday':
      return 'bg-green-600 text-white';
    default:
      return 'bg-slate-200 text-slate-800';
  }
};

export default function NoticeCard({ notice }: NoticeCardProps) {
  const date = new Date(notice.date);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-IN', { month: 'short' });

  return (
    <div id={notice.id} className="group flex items-start gap-5 p-5 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
      <div className="notice-date-box">
        <span className="notice-date-day">{day}</span>
        <span className="notice-date-month">{month}</span>
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${getCategoryStyles(notice.category)}`}>
            {notice.category}
          </span>
          {notice.isPinned && (
            <Pin size={12} className="text-academic-gold fill-current" />
          )}
        </div>

        <h3 className="text-sm md:text-base font-bold text-academic-navy leading-snug group-hover:text-academic-gold transition-colors duration-300 line-clamp-2">
          {notice.title}
          {notice.isPinned && <span className="new-badge ml-2">URGENT</span>}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <p className="text-[11px] text-slate-500 font-medium truncate">
            Academic Section
          </p>
          {(notice.image_url || notice.pdf_url) && (
            <div className="flex items-center gap-1 text-academic-gold">
              <FileText size={10} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">Attachment</span>
            </div>
          )}
        </div>
      </div>

      <div className="self-center text-slate-300 group-hover:text-academic-gold group-hover:translate-x-1 transition-all">
        <ArrowRight size={20} />
      </div>
    </div>
  );
}
