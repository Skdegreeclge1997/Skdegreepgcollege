"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import NewsCard from '@/components/NewsCard';
import { Newspaper, Loader2, Search, Calendar, Filter } from 'lucide-react';

export default function NewsArchive() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    
    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  const categories = ['All', ...new Set(news.map(item => item.category))];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <div className="bg-academic-navy py-20 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-academic-gold/5 -skew-x-12 translate-x-1/4" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-academic-gold/20 text-academic-gold rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-academic-gold/30">
                <Newspaper size={18} />
                <span>Media & Press</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Campus <span className="text-academic-gold">News</span> Archive
              </h1>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">
                A comprehensive record of all announcements, events, and milestones at S.K. Degree & P.G. College.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Filters Bar */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-12 flex flex-col lg:flex-row gap-6 items-center border border-slate-100">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search news stories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-academic-gold/50 font-bold text-academic-navy outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <Filter size={20} className="text-academic-gold shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                    ? 'bg-academic-navy text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="animate-spin text-academic-navy" size={60} />
              <p className="text-slate-400 font-black uppercase tracking-widest animate-pulse">Loading Archives...</p>
            </div>
          ) : (
            <>
              {filteredNews.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Search size={40} className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-academic-navy mb-4">No stories found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your search terms or category filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredNews.map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
