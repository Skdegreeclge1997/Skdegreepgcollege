"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { Loader2, Calendar, Tag } from 'lucide-react';
import initialNews from '@/lib/data/news.json';

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(10);
      
      if (!error && data && data.length > 0) {
        setNewsItems(data);
      } else {
        setNewsItems((initialNews as News[]).slice(0, 10));
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  // Auto-cycle logic (4 seconds)
  useEffect(() => {
    if (!isInView || isPaused || newsItems.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPaused, newsItems.length]);

  // Click handler (8-second pause)
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-academic-navy" size={40} />
      </div>
    );
  }

  if (newsItems.length === 0) return null;

  // Edge Case: 1 item
  if (newsItems.length === 1) {
    return (
      <div className="max-w-4xl mx-auto">
        <SpotlightCard event={newsItems[0]} activeIndex={0} total={1} isPaused={true} />
      </div>
    );
  }

  // Determine list items (next items after active, up to 4)
  const listIndices = [];
  const itemsToShow = Math.min(newsItems.length - 1, 4);
  for (let i = 1; i <= itemsToShow; i++) {
    listIndices.push((activeIndex + i) % newsItems.length);
  }

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* 1. Spotlight Card (Left) */}
      <div className="lg:col-span-5 flex flex-col h-full min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={newsItems[activeIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <SpotlightCard 
              event={newsItems[activeIndex]} 
              activeIndex={activeIndex} 
              total={newsItems.length}
              isPaused={isPaused || !isInView || newsItems.length <= 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Recent Activities Ticker (Right) */}
      <div className="lg:col-span-7 flex flex-col pt-2">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h4 className="font-display font-bold text-xl text-academic-navy tracking-tight">Recent Activities</h4>
          <div className="flex gap-1">
             {Array.from({ length: Math.min(newsItems.length, 10) }).map((_, i) => (
               <div 
                 key={i} 
                 className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-academic-gold w-4' : 'bg-slate-200'}`} 
               />
             ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="relative space-y-3">
             <AnimatePresence mode="popLayout" initial={false}>
                {listIndices.map((idx, order) => (
                  <motion.div
                    key={newsItems[idx].id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <button
                      onClick={() => handleItemClick(idx)}
                      className={`w-full text-left flex items-center gap-6 p-5 rounded-2xl border-2 transition-all group overflow-hidden ${
                        activeIndex === idx 
                        ? 'bg-academic-gold/5 border-academic-gold shadow-md' 
                        : 'bg-white border-transparent hover:border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {/* Left Indicator */}
                      <div className={`w-1 self-stretch rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-academic-gold h-full' : 'bg-transparent h-0 group-hover:h-4 group-hover:bg-slate-300'}`} />
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-4 mb-1.5">
                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-academic-gold">
                               <Tag size={10} />
                               {newsItems[idx].category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                               {new Date(newsItems[idx].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                         </div>
                         <h5 className={`font-bold text-lg transition-colors truncate ${
                           activeIndex === idx ? 'text-academic-navy' : 'text-slate-700 group-hover:text-academic-navy'
                         }`}>
                           {newsItems[idx].title}
                         </h5>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeIndex === idx ? 'bg-academic-gold text-academic-navy' : 'bg-slate-100 text-slate-300 group-hover:bg-slate-200'
                      }`}>
                         <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                    </button>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
          
          {newsItems.length >= 5 && (
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {listIndices.length} items · {newsItems.length} Total News
               </p>
               <Link href="/news" className="text-[10px] font-bold text-academic-navy uppercase tracking-widest hover:text-academic-gold transition-colors underline underline-offset-4">
                  View Full Archive
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpotlightCard({ event, activeIndex, total, isPaused }: { event: News, activeIndex: number, total: number, isPaused: boolean }) {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 h-full flex flex-col group relative">
      {/* Hero Image */}
      <div className="relative h-72 bg-academic-navy overflow-hidden">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl opacity-10">🎓</div>
        )}
        
        {/* Progress Bar (4s) */}
        {!isPaused && (
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
            <motion.div
              key={`bar-${activeIndex}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="h-full bg-academic-gold"
            />
          </div>
        )}

        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <span className="px-4 py-1.5 bg-academic-gold text-academic-navy text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
            Featured Spotlight
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
           <div className="flex items-center gap-1.5 text-academic-gold font-bold text-[10px] uppercase tracking-widest">
              <Calendar size={12} />
              {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
           </div>
           <div className="w-1 h-1 rounded-full bg-slate-200" />
           <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{event.category}</div>
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-bold text-academic-navy mb-4 leading-[1.1] tracking-tight group-hover:text-academic-navy/80 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
          {event.description}
        </p>

        <div className="mt-auto">
          <Link href="/news" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-academic-navy text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-academic-gold hover:text-academic-navy transition-all shadow-xl active:translate-y-0.5">
            Read Full Story
          </Link>
        </div>
      </div>

      {/* Subtle index indicator */}
      <div className="absolute bottom-8 right-8 text-[4rem] font-bold text-slate-50 pointer-events-none select-none leading-none opacity-50 italic">
        #{activeIndex + 1}
      </div>
    </div>
  );
}
