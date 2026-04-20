"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { News } from '@/lib/types';
import { 
  ArrowLeft, 
  Calendar, 
  Share2, 
  Download, 
  FileText, 
  Loader2, 
  Tag,
  Clock,
  User,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsDetail() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentNews, setRecentNews] = useState<News[]>([]);

  const fetchNewsDetail = React.useCallback(async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (!error && data) {
      setNews(data);
    } else {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  }, [params.id]);

  const fetchRecentNews = React.useCallback(async () => {
    const { data } = await supabase
      .from('news')
      .select('*')
      .neq('id', params.id)
      .order('date', { ascending: false })
      .limit(3);
    
    if (data) {
      setRecentNews(data);
    }
  }, [params.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (params.id) {
        fetchNewsDetail();
        fetchRecentNews();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [params.id, fetchNewsDetail, fetchRecentNews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-academic-navy" size={60} />
        <p className="text-slate-400 font-black uppercase tracking-widest animate-pulse">Loading Story Details...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
          <FileText size={40} className="text-red-200" />
        </div>
        <h1 className="text-3xl font-black text-academic-navy mb-4">Story Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">The news story you are looking for may have been moved or removed.</p>
        <button 
          onClick={() => router.push('/news')}
          className="px-8 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-academic-gold hover:text-academic-navy transition-all shadow-xl"
        >
          Back to News Archive
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-academic-gold">Home</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-academic-gold">News</Link>
            <ChevronRight size={12} />
            <span className="text-academic-navy truncate max-w-[200px]">{news.title}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <article className="lg:col-span-8 space-y-8">
              {/* Post Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="px-3 py-1 bg-academic-gold/20 text-academic-navy text-[9px] font-black uppercase tracking-widest rounded-full border border-academic-gold/30">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                    <Calendar size={12} className="text-academic-gold" />
                    {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-academic-navy leading-tight tracking-tight">
                  {news.title}
                </h1>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video w-full max-w-3xl rounded-3xl overflow-hidden shadow-xl border border-white">
                <Image 
                  src={news.image_url || news.image} 
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Published By</p>
                    <p className="text-sm font-black text-academic-navy">Academic Media Cell</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reading Time</p>
                    <p className="text-sm font-black text-academic-navy">3-5 Minutes</p>
                  </div>
                </div>

                <div className="ml-auto flex gap-3">
                  <button className="p-4 bg-white text-slate-400 hover:text-academic-gold rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <Share2 size={20} />
                  </button>
                  {news.pdf_url && (
                    <a 
                      href={news.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-6 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                    >
                      <Download size={20} />
                      Download Report
                    </a>
                  )}
                </div>
              </div>

              {/* Story Content */}
              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {news.description}
                </p>
                
                {/* Placeholder for long content if needed */}
                <div className="mt-8 space-y-6 text-slate-600 leading-relaxed text-base">
                  <p>
                    The management and faculty of S.K. Degree & P.G. College continue to prioritize student success and campus innovation. This latest update reflects our ongoing commitment to excellence in higher education and community engagement.
                  </p>
                  <div className="bg-slate-100 p-6 rounded-2xl border-l-4 border-academic-gold">
                    <p className="text-base font-bold text-academic-navy italic">
                      &quot;Excellence is not an act, but a habit. Our latest achievements are a testament to the collective effort of our dedicated students and staff.&quot;
                    </p>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-500">— Principal&apos;s Office</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100">
                <h3 className="text-lg font-black text-academic-navy mb-6 flex items-center gap-3">
                  <Tag className="text-academic-gold" size={20} />
                  Recent Stories
                </h3>
                
                <div className="space-y-6">
                  {recentNews.map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`} className="flex gap-4 group">
                      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden">
                        <Image 
                          src={item.image_url || item.image} 
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[8px] font-black text-academic-gold uppercase tracking-widest mb-1">{item.category}</span>
                        <h4 className="text-xs font-bold text-academic-navy leading-tight group-hover:text-academic-gold transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link 
                  href="/news"
                  className="mt-10 flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-500 font-black rounded-2xl hover:bg-academic-navy hover:text-white transition-all group"
                >
                  View All Archives
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* PDF Widget */}
              {news.pdf_url && (
                <div className="bg-academic-navy p-8 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl shadow-academic-navy/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-academic-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" />
                  <FileText className="text-academic-gold mb-6" size={40} />
                  <h3 className="text-xl font-black mb-2 leading-tight">Official Document Available</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">This announcement is accompanied by a formal document or circular.</p>
                  <a 
                    href={news.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-academic-gold text-academic-navy font-black rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    <Download size={20} />
                    Download PDF
                  </a>
                </div>
              )}
            </aside>

          </div>
        </div>
      </main>

    </div>
  );
}
