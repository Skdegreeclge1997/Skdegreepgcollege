"use client";
import { motion } from 'framer-motion';
 
import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { Loader2 } from 'lucide-react';
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
    <div className="relative overflow-hidden py-4 -mx-4 px-4">
      <motion.div 
        animate={{ 
          x: [0, -1200],
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex gap-8 hover:[animation-play-state:paused] w-max"
      >
        {/* Triple the items for a truly seamless loop */}
        {[...newsItems, ...newsItems, ...newsItems].map((news, index) => (
          <div key={`${news.id}-${index}`} className="w-[380px] shrink-0">
            <NewsCard news={news} />
          </div>
        ))}
      </motion.div>

      {/* Edge Gradients for smoothness */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
