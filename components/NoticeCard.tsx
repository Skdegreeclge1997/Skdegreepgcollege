import React from 'react';
import { Calendar, Pin, Bell, ArrowRight } from 'lucide-react';
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
  return (
    <div className="group relative flex flex-col h-full bg-white border border-academic-navy/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Pinned Indicator */}
      {notice.isPinned && (
        <div className="absolute top-3 right-3 z-10 text-academic-gold animate-pulse" aria-hidden="true">
          <Pin size={18} fill="currentColor" />
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${getCategoryStyles(notice.category)}`}>
            {notice.category}
          </span>
          <div className="flex items-center gap-1 text-slate-600 text-xs font-medium" aria-hidden="true">
            <Calendar size={14} />
            <span>{new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-academic-navy mb-3 leading-snug group-hover:text-academic-gold transition-colors duration-300">
          {notice.title}
        </h3>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
          {notice.content}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-academic-navy font-semibold text-sm">
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            Read Full Notice <ArrowRight size={16} aria-hidden="true" />
          </span>
          <Bell size={18} className="text-academic-gold/50 group-hover:text-academic-gold transition-colors duration-300" aria-hidden="true" />
        </div>
      </div>

      {/* Premium Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-academic-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
