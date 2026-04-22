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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Featured News */}
      <div className="lg:col-span-2">
        {newsItems[0] && (
          <div className="bg-cream rounded-3xl overflow-hidden shadow-lg border border-academic-gold/10 group h-full">
            <div className="relative h-64 md:h-80 bg-academic-navy flex items-center justify-center overflow-hidden">
              {newsItems[0].image_url ? (
                <img 
                  src={newsItems[0].image_url} 
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
              ) : (
                <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-700">🎓</div>
              )}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1 bg-academic-gold text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-academic-gold text-[10px] font-black uppercase tracking-widest mb-3">
                {newsItems[0].category || 'Campus News'} · {new Date(newsItems[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-academic-navy mb-4 leading-tight group-hover:text-academic-gold transition-colors">
                {newsItems[0].title}
              </h3>
              <p className="text-slate-600 line-clamp-3 mb-6 text-sm md:text-base leading-relaxed">
                {newsItems[0].description}
              </p>
              <Link href="/news" className="inline-flex items-center gap-2 text-academic-navy font-bold text-sm uppercase tracking-widest border-b-2 border-academic-gold pb-1 hover:gap-4 transition-all">
                Read Full Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar News */}
      <div className="lg:col-span-1 space-y-6">
        <h4 className="font-display font-bold text-xl text-academic-navy mb-6 border-b border-slate-200 pb-2">More Updates</h4>
        <div className="space-y-2">
          {newsItems.slice(1, 4).map((news) => (
            <div key={news.id} className="news-list-item group">
              <div className="text-academic-gold text-[10px] font-black uppercase tracking-widest mb-1.5">
                {news.category}
              </div>
              <h5 className="font-bold text-academic-navy group-hover:text-academic-gold transition-colors line-clamp-2 leading-snug mb-2">
                {news.title}
              </h5>
              <div className="text-[11px] text-slate-500 font-medium">
                {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
        <Link href="/news" className="block text-center py-4 bg-slate-100 rounded-xl text-academic-navy font-bold text-xs uppercase tracking-widest hover:bg-academic-gold transition-all mt-8">
          View All News
        </Link>
      </div>
    </div>
  );
}
