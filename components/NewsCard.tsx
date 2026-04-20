"use client";
 
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { News } from '@/lib/types';
 
interface NewsCardProps {
  news: News;
}
 
export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={news.image_url || news.image}
          alt={news.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-academic-navy text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
            {news.category}
          </span>
        </div>
      </div>
 
      {/* Content */}
      <div className="p-5 pb-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold mb-2">
          <Calendar size={12} className="text-academic-gold" />
          {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="text-lg font-bold text-academic-navy mb-2 group-hover:text-academic-gold transition-colors line-clamp-2 leading-snug">
          {news.title}
        </h3>
        
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
          {news.description}
        </p>
 
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <Link 
            href={`/news/${news.id}`}
            aria-label={`Read More - ${news.title}`}
            className="text-academic-navy font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all group/btn"
          >
            Read More
            <ArrowRight size={14} className="text-academic-gold group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          {news.pdf_url && (
            <a 
              href={news.pdf_url} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Download PDF Document"
              className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
            >
              <FileText size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
