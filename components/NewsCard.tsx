"use client";
 
import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { News } from '@/lib/types';
 
interface NewsCardProps {
  news: News;
}
 
export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {news.category}
          </span>
        </div>
      </div>
 
      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
          <Calendar size={14} className="text-academic-gold" />
          {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="text-xl font-bold text-academic-navy mb-4 group-hover:text-academic-gold transition-colors line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8">
          {news.description}
        </p>
 
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <button className="text-academic-navy font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group/btn">
            Read More
            <ArrowRight size={16} className="text-academic-gold group-hover/btn:translate-x-1 transition-transform" />
          </button>
          {news.pdf_url && (
            <a 
              href={news.pdf_url} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              title="Download PDF Report"
            >
              <FileText size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
