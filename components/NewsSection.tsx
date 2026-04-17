"use client";
 
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {newsItems.map((news) => (
        <div key={news.id} className="animate-reveal">
          <NewsCard news={news} />
        </div>
      ))}
    </div>
  );
}
