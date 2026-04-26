"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { Loader2, ArrowRight } from 'lucide-react';
import initialNews from '@/lib/data/news.json';

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(10); // Fetch all 10 available slots
      
      if (!error && data && data.length > 0) {
        setNewsItems(data);
      } else {
        setNewsItems((initialNews as News[]).slice(0, 10));
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  // Auto-cycling logic
  useEffect(() => {
    if (!isInView || newsItems.length <= 1) {
      if (!isInView) setActiveIndex(0); // Reset to first when not in view
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % newsItems.length);
    }, 6000); // 6 seconds per event

    return () => clearInterval(interval);
  }, [isInView, newsItems.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-academic-navy" size={40} />
      </div>
    );
  }

  const featured = newsItems[activeIndex] || newsItems[0];

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Featured News - Cycling Spotlight (40%) */}
      <div className="lg:col-span-5 h-full min-h-[480px]">
        <AnimatePresence mode="wait">
          {featured && (
            <motion.div 
              key={featured.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group h-full flex flex-col relative"
            >
              <div className="relative h-64 bg-academic-navy flex items-center justify-center overflow-hidden">
                {featured.image_url ? (
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src={featured.image_url} 
                    alt={featured.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <div className="text-6xl opacity-20">🎓</div>
                )}
                
                {/* Progress bar for cycling */}
                <div className="absolute bottom-0 left-0 h-1 bg-academic-gold/50 z-20 w-full overflow-hidden">
                   <motion.div 
                      key={`progress-${activeIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="h-full bg-academic-gold"
                   />
                </div>

                <div className="absolute top-6 left-6 z-10 flex gap-2">
                  <span className="px-4 py-1 bg-academic-gold text-academic-navy text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Latest News
                  </span>
                  <span className="px-3 py-1 bg-academic-navy/80 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    {activeIndex + 1} / {newsItems.length}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-academic-gold text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-academic-gold animate-pulse"></span>
                  {featured.category || 'Campus News'} · {new Date(featured.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h3 className="text-2xl font-display font-bold text-academic-navy mb-4 leading-tight line-clamp-2">
                  {featured.title}
                </h3>
                <p className="text-slate-500 line-clamp-4 mb-8 text-sm leading-[1.8]">
                  {featured.description}
                </p>
                <div className="mt-auto">
                  <Link href="/news" className="inline-flex items-center gap-2 text-academic-navy font-black text-[11px] uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-xl hover:bg-academic-gold transition-all group/btn">
                    Read Full Story <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent Events List (60%) */}
      <div className="lg:col-span-7 flex flex-col">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <h4 className="font-display font-bold text-xl text-academic-navy">Recent Activities</h4>
          <Link href="/news" className="text-academic-gold font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
            Archive Explorer
          </Link>
        </div>
        
        <div className="space-y-4 flex-1">
          {newsItems.slice(0, 5).map((news, idx) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href="/news" 
                onMouseEnter={() => setActiveIndex(idx)}
                className={`flex items-center gap-6 p-4 rounded-2xl border transition-all group overflow-hidden ${
                  activeIndex === idx 
                  ? 'bg-academic-navy/5 border-academic-gold shadow-lg shadow-academic-navy/5' 
                  : 'bg-white border-slate-50 hover:border-academic-gold/30'
                }`}
              >
                {/* Small Thumb */}
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
                  {news.image_url ? (
                    <img src={news.image_url} alt="" className={`w-full h-full object-cover transition-transform duration-500 ${activeIndex === idx ? 'scale-110' : 'group-hover:scale-110'}`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl opacity-20">📅</div>
                  )}
                  {activeIndex === idx && (
                    <div className="absolute inset-0 bg-academic-navy/20 flex items-center justify-center">
                       <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      activeIndex === idx ? 'bg-academic-gold text-academic-navy' : 'bg-academic-gold/5 text-academic-gold'
                    }`}>
                      {news.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h5 className={`font-bold text-lg leading-tight transition-colors truncate ${
                    activeIndex === idx ? 'text-academic-navy' : 'text-slate-700 group-hover:text-academic-navy'
                  }`}>
                    {news.title}
                  </h5>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-medium">
                    {news.description}
                  </p>
                </div>
                
                <div className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  activeIndex === idx ? 'bg-academic-gold text-academic-navy' : 'bg-slate-50 text-slate-400 group-hover:bg-academic-gold group-hover:text-academic-navy'
                }`}>
                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
