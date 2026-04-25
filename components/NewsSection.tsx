"use client";

 
import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { Loader2, ArrowRight } from 'lucide-react';
import initialNews from '@/lib/data/news.json';
 
export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(3); // Only show top 3 for the home page grid
      
      if (!error && data && data.length > 0) {
        setNewsItems(data);
      } else {
        setNewsItems((initialNews as News[]).slice(0, 3));
      }
      setLoading(false);
    };
 
    fetchNews();
  }, []);
 
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-academic-navy" size={40} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Featured News - Spotlight (40%) */}
      <div className="lg:col-span-5">
        {newsItems[0] && (
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group h-full flex flex-col">
            <div className="relative h-56 bg-academic-navy flex items-center justify-center overflow-hidden">
              {newsItems[0].image_url ? (
                <img 
                  src={newsItems[0].image_url} 
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              ) : (
                <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-700">🎓</div>
              )}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1 bg-academic-gold text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Spotlight
                </span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="text-academic-gold text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-academic-gold animate-pulse"></span>
                {newsItems[0].category || 'Campus News'} · {new Date(newsItems[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <h3 className="text-2xl font-display font-bold text-academic-navy mb-4 leading-tight group-hover:text-academic-gold transition-colors line-clamp-2">
                {newsItems[0].title}
              </h3>
              <p className="text-slate-500 line-clamp-3 mb-6 text-sm leading-[1.75]">
                {newsItems[0].description}
              </p>
              <div className="mt-auto">
                <Link href="/news" className="inline-flex items-center gap-2 text-academic-navy font-black text-[11px] uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-xl hover:bg-academic-gold transition-all group/btn">
                  Full Story <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Events List - Wide Length (60%) */}
      <div className="lg:col-span-7 flex flex-col">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <h4 className="font-display font-bold text-xl text-academic-navy">Recent Activities</h4>
          <Link href="/news" className="text-academic-gold font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
            View All Events
          </Link>
        </div>
        
        <div className="space-y-4 flex-1">
          {newsItems.slice(1, 5).map((news) => (
            <Link key={news.id} href="/news" className="flex items-center gap-6 p-4 bg-white rounded-2xl border border-slate-50 hover:border-academic-gold/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all group overflow-hidden">
              {/* Small Thumb */}
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
                {news.image_url ? (
                  <img src={news.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">📅</div>
                )}
              </div>
              
              {/* Content Wide */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-academic-gold bg-academic-gold/5 px-2 py-0.5 rounded">
                    {news.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h5 className="font-bold text-lg text-academic-navy group-hover:text-academic-gold transition-colors truncate whitespace-nowrap">
                  {news.title}
                </h5>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-medium">
                  {news.description}
                </p>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-academic-gold group-hover:text-academic-navy transition-all">
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
