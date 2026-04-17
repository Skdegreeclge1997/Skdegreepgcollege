"use client";
 
import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { ArrowRight, Newspaper, Loader2 } from 'lucide-react';
import Link from 'next/link';
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
        .limit(3);
      
      if (!error && data && data.length > 0) {
        setNewsItems(data);
      } else {
        // Fallback to initial data if DB is empty or error
        setNewsItems((initialNews as News[]).slice(0, 3));
      }
      setLoading(false);
    };
 
    fetchNews();
  }, []);
 
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-0 rounded-l-[100px] hidden lg:block" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-academic-gold/10 text-academic-gold rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Newspaper size={18} />
              <span>Campus Buzz</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-academic-navy leading-tight">
              Latest News & <span className="text-academic-gold">Updates</span>
            </h2>
            <p className="mt-6 text-lg text-slate-500 font-medium">
              Stay informed with the latest happenings, achievements, and events from our vibrant campus community.
            </p>
          </div>
          
          <Link 
            href="/news" 
            className="group flex items-center gap-3 px-8 py-4 bg-academic-navy text-white font-bold rounded-2xl hover:bg-academic-gold hover:text-academic-navy transition-all duration-300 shadow-xl shadow-academic-navy/10 active:scale-95"
          >
            Explore News Archive
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-academic-navy" size={40} />
          </div>
        ) : (
          <div className="relative group/scroller">
            {/* Scroll Container */}
            <div className="flex overflow-x-hidden py-10">
              <div className="flex gap-10 animate-slow-scroll hover:[animation-play-state:paused]">
                {/* Double the items for seamless loop */}
                {[...newsItems, ...newsItems].map((news, index) => (
                  <div key={`${news.id}-${index}`} className="w-[400px] shrink-0">
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slow-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-440px * ${newsItems.length})); }
        }
        .animate-slow-scroll {
          animation: slow-scroll ${newsItems.length * 10}s linear infinite;
        }
      `}</style>
    </section>
  );
}
